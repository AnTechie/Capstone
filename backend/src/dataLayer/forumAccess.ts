import * as AWS  from 'aws-sdk'
import * as AWSXRAY from 'aws-xray-sdk'
import { PostItem } from '../models/PostItem'
import {UpdatePostRequest} from '../requests/UpdatePostRequest'
import { createLogger } from '../utils/logger'

const logger = createLogger('Create')
const XAWS= AWSXRAY.captureAWS(AWS)
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION
export class ForumAccess{

    private readonly postsTable = process.env.POSTS_TABLE
  
    private readonly postIdIndex = process.env.POST_ID_INDEX  
    private readonly docClient = new XAWS.DynamoDB.DocumentClient()
  
    async createPost(postItem:PostItem):Promise<PostItem>
    {
        logger.info("Entered Create Todo DAO")

        await this.docClient.put({
            TableName: this.postsTable,
            Item: postItem
        }).promise()
        
        return postItem
    }

    
    async getAllTodos(userId:string):Promise<PostItem[]>
    {
       logger.info("getAllTodos before dynamodb query start")
        console.log(userId)
        const toDos= await this.docClient.query({
            TableName : this.postsTable,
            IndexName : this.postIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()
        logger.info("getAllTodos before dynamodb query completed")

        const items=toDos.Items 
        return items as PostItem[]
    }

    async deletePost(userId:string,postId:string):Promise<void>
    {
        try
        {
        logger.info("deleteTodo dal")
        console.log(postId)
        console.log(userId)
        console.log("deleteTodo dal")
        var params = {
            TableName:this.postsTable,
            Key:{
                'postId': postId,
                'userId': userId
            },
        
        };
      await this.docClient.delete(params).promise()
    }
    catch(err)
    {
        console.log(err)
    }
    
    
      return
    }
    async updatePost(updatePost:UpdatePostRequest,userId:string,postId:string):Promise<UpdatePostRequest>
    {
        logger.info("update dal")
        var params = {
            TableName:this.postsTable,
            Key:{
                'postId': postId,
                'userId': userId
            },

              ExpressionAttributeValues: {
                ':sharePost': updatePost.sharePost
              },
              UpdateExpression: 'SET   sharePost = :sharePost',
              ReturnValues: 'ALL_NEW',
        };
     await this.docClient.update(params).promise()
     return updatePost
    }
    async getUploadUrl(imageId:string,userId:string):Promise<string>
    {
      console.log("imageId"+imageId)
      var attachmentUrl='https://serverless-udagram-postss-dev.s3-us-west-2.amazonaws.com/'+imageId

      var params = {
        TableName:this.postsTable,
        Key:{
            'postId': imageId,
            'userId': userId
        },

          ExpressionAttributeValues: {
            ':attachmentUrl': attachmentUrl,
          },
          UpdateExpression: 'SET  attachmentUrl = :attachmentUrl',
          ReturnValues: 'ALL_NEW',
    };
 await this.docClient.update(params).promise()

        return s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: imageId,
            Expires: urlExpiration
          })
        }     
}

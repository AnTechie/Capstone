import * as AWS  from 'aws-sdk'
import * as AWSXRAY from 'aws-xray-sdk'
import { PostItem } from '../models/PostItem'

const XAWS= AWSXRAY.captureAWS(AWS)
export class ForumAccess{

    private readonly postsTable = process.env.POSTS_TABLE
    private readonly docClient = new XAWS.DynamoDB.DocumentClient()
   // private readonly postIdIndex = process.env.POST_ID_INDEX    
    async createPost(postItem:PostItem):Promise<PostItem>
    {
        //logger.info("Entered Create Todo DAO")

        await this.docClient.put({
            TableName: this.postsTable,
            Item: postItem
        }).promise()
        
        return postItem
    }

    
    async getAllTodos(userId:string):Promise<PostItem[]>
    {
      //  logger.info("getAllTodos before dynamodb query start")
console.log(userId)
        const posts= await this.docClient.query({
            TableName : this.postsTable,
            IndexName : "PostIdIndex",
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()
        //logger.info("getAllTodos before dynamodb query completed")

        const items=posts.Items 
        return items as PostItem[]
    }

}
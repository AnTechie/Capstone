import * as uuid from 'uuid'
import {PostItem} from '../models/PostItem'
import {ForumAccess} from '../dataLayer/forumAccess'

import {CreatePostRequest} from '../requests/CreatePostRequest'
import { UpdatePostRequest } from '../requests/UpdatePostRequest'
import {PostUpdate} from '../models/PostUpdate'
import { getUserId } from '../auth/utils';

const forumAccess=new ForumAccess()

export async function CreatePostItem(createTodoRequest:CreatePostRequest,jwtToken:string):Promise<PostItem>
{
    console.log(jwtToken)
   // logger.info("Entered Create Todo business")
    //logger.info(createTodoRequest)
   const postId=uuid.v4()
   const userId=getUserId(jwtToken)
   const postItem={
    userId:userId,
    postId:postId,
    postedAt: new Date().toISOString(),
    postTitle:createTodoRequest.postTitle,
    postDetails:createTodoRequest.postDetails,
    sharePost:false
   }
    return await forumAccess.createPost(postItem)
} 
export async function getAllposts(jwtToken:string):Promise<PostItem[]>
{   
    //logger.info("getAllTodos business layer invoked")
    console.log(jwtToken)

    return await forumAccess.getAllTodos(getUserId(jwtToken));
   // return await forumAccess.getAllTodos("Anjani");
}
export async function deletePost( jwtToken: string,postId: string):Promise<void>
{   
   // logger.info("getAllTodos business layer invoked")
    console.log(jwtToken);
   //getUserId(jwtToken)
    await forumAccess.deletePost(getUserId(jwtToken),postId);
     return
}
export async function updatePost(updateTodo:UpdatePostRequest,jwtToken:string,postId:string):Promise<PostUpdate>
{
   // logger.info("Entered Create Todo business")
   // logger.info(updateTodo)
    console.log(jwtToken)
    const userId=getUserId(jwtToken)
    //logger.info(userId)
  
    return await forumAccess.updatePost(updateTodo,userId,postId)
}
export async function getUploadUrl(imageID:string):Promise<string>
{
    return await forumAccess.getUploadUrl(imageID)
}


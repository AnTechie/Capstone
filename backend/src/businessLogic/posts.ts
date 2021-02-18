import * as uuid from 'uuid'
import {PostItem} from '../models/PostItem'
import {ForumAccess} from '../dataLayer/forumAccess'

import {CreatePostRequest} from '../requests/CreatePostRequest'

const forumAccess=new ForumAccess()

export async function CreatePostItem(createTodoRequest:CreatePostRequest,jwtToken:string):Promise<PostItem>
{
    console.log(jwtToken)
   // logger.info("Entered Create Todo business")
    //logger.info(createTodoRequest)
   const postId=uuid.v4()
   //const userId=getUserId(jwtToken)
   const userId='Anjani'
   //logger.info(userId)

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

    //return todoAccess.getAllTodos(getUserId(jwtToken));
    return forumAccess.getAllTodos("Anjani");
}

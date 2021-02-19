import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {updatePost} from '../../businessLogic/posts'
import {UpdatePostRequest} from '../../requests/UpdatePostRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
console.log(event);
const postId = event.pathParameters.postId

const updatedTodo: UpdatePostRequest = JSON.parse(event.body)
const authorization=event.headers.Authorization
    const split=authorization.split(' ')
    const jwtToken=split[1]
await updatePost(updatedTodo,jwtToken,postId)
  
  //logger.info("todo updated ${todoId}")
  console.log(event);
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body:JSON.stringify(updatedTodo)
  }
}
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {deletePost} from '../../businessLogic/posts'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const postId = event.pathParameters.postId
    const authorization=event.headers.Authorization
    const split=authorization.split(' ')
    const jwtToken=split[1]
  try{
   await deletePost(jwtToken,postId)
   return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body:"post deleted"
  }
}
catch(error)
{
  console.log(error)
}

}
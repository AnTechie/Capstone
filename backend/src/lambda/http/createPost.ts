import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreatePostRequest } from '../../requests/CreatePostRequest'
import {CreatePostItem} from '../../businessLogic/posts'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const newPost:CreatePostRequest = JSON.parse(event.body)
    const newItem=await CreatePostItem(newPost,"jwtToken")
    //logger.info("todo created")
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        newItem
      })
    }
}
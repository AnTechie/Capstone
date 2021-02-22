import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreatePostRequest } from '../../requests/CreatePostRequest'
import {CreatePostItem} from '../../businessLogic/posts'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Create')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const newPost:CreatePostRequest = JSON.parse(event.body)
    const authorization=event.headers.Authorization
    const split=authorization.split(' ')
    const jwtToken=split[1]
    const newItem=await CreatePostItem(newPost,jwtToken)
    logger.info("todo created")

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
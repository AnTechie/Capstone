import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {getAllposts} from '../../businessLogic/posts'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Create')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const authorization=event.headers.Authorization
    const split=authorization.split(' ')
    const jwtToken=split[1]
  const result=await getAllposts(jwtToken)
 logger.info("get posts")
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: result
    })
  }
  
}
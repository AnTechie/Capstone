import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUploadUrl } from '../../businessLogic/posts'
//import { createLogger } from '../../utils/logger'

//const logger = createLogger('Create')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

//logger.info("generateuploadurl lambda called")
 const attachment = event.pathParameters.postId
 const authorization=event.headers.Authorization
    const split=authorization.split(' ')
    const jwtToken=split[1]
 const url =await getUploadUrl(attachment,jwtToken)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: url
    })
 
}

}

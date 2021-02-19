import { apiEndpoint } from '../config'
import { Post } from '../types/Todo';
import { CreatePostRequest } from '../types/CreateTodoRequest';
import Axios from 'axios'
import { UpdatePostRequest } from '../types/UpdateTodoRequest';

export async function getTodos(idToken: string): Promise<Post[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/getPosts/chaitra`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    method: 'GET',
  })
  console.log('Todos:', response.data)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newTodo: CreatePostRequest
): Promise<Post> {
  const response = await Axios.post(`${apiEndpoint}/posts`,  JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log( JSON.stringify(newTodo))
  console.log('creaate post')
  console.log(response)
  return response.data.newItem
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdatePostRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/posts/${todoId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  postId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  postId: string
): Promise<string> {
  console.log('upload url');
  const response = await Axios.post(`${apiEndpoint}/todos/${postId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}

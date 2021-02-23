export interface Post {
  userId:string,
  postId:string,
  postTitle:string,
  postDetails:string,
  postedAt:string,
  sharePost:boolean,
  attachmentUrl?: string
}

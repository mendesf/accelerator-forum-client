import { Injectable } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';

import { ParentService } from '../parent.service';
import { AuthService, User } from '../auth/auth.service';

export interface Comment {
  _id: string;
  text: string;
  post: string;
  owner: User;
}

@Injectable()
export class CommentService extends ParentService {

  addComment(commentText: string, postId: string): Promise<Response> {
    const user = AuthService.getUser();
    return this.post('api/comments', {
      text: commentText,
      post: postId,
      owner: user._id
    });
  }

  editComment(commentId: string, commentText: string): Promise<Response> {
    return this.put(`api/comments/${commentId}`, { text: commentText });
  }
}

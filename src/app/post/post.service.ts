import { Injectable } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';

import { ParentService } from '../parent.service';
import { AuthService, User } from '../auth/auth.service';
import { Comment } from '../comment/comment.service';

export interface Post {
  _id: string;
  text: string;
  comments: Comment[];
  owner: User;
}

@Injectable()
export class PostService extends ParentService {

  private url = 'api/posts';

  async getPosts(ownerId?: string): Promise<Post[]> {
    const url = ownerId ? encodeURI(`${this.url}?owner=${ownerId}`) : this.url;
    const res = await this.get(url);
    return res.json();
  }

  async search(searchText: string): Promise<Post[]> {
    let url = encodeURI(`${this.url}?search=${searchText}`);
    url = url.replace(/#/g, '%23');
    const res = await this.get(url);
    return res.json();
  }

  addPost(postText: string): Promise<Response> {
    const user = AuthService.getUser();
    return this.post(this.url, {
      text: postText,
      owner: user._id
    });
  }

  editPost(postId: string, postText: string): Promise<Response> {
    console.log(postId);
    console.log(postText);
    return this.put(`${this.url}/${postId}`, { text: postText });
  }
}

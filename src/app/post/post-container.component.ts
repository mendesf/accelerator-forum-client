import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { AuthService, User } from '../auth/auth.service';
import { PostService, Post } from './post.service';
import { CommentService } from '../comment';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {

  user = AuthService.getUser();
  posts: Post[] = [];
  message = '';
  postText = '';
  activeLink = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
  ) { }

  async addPost(): Promise<void> {
    if (this.postText) {
      await this.postService.addPost(this.postText);
      this.postText = '';
    }
  }

  async getPosts(ownerId?: string): Promise<void> {
    try {
      if (ownerId) {
        if (this.user._id === ownerId) {
          this.activeLink = 'userPosts';
        } else {
          this.activeLink = '';
        }
      } else {
        this.activeLink = 'home';
      }

      this.posts = await this.postService.getPosts(ownerId);
    } catch (err) {
      console.log(err);
    }
  }

  async search(event: Event | string): Promise<void> {
    if (event instanceof Event) {
      event.preventDefault();
    } else {
      this.posts = await this.postService.search(event);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPosts(params['userId']);
    });
  }
}

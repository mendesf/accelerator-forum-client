import { Component, Input, Output, EventEmitter } from '@angular/core';
import { connect } from 'socket.io-client';

import { PostService, Post } from './post.service';
import { CommentService, Comment } from '../comment';
import { AuthService, User } from '../auth';
import { ScrollService } from '../scroll/scroll.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './post-list.component.html'
})

export class PostListComponent {

  @Input() posts: Post[] = [];
  @Output() search = new EventEmitter();
  user = AuthService.getUser();
  postExpanded: string;
  commentText = '';
  private socket = connect('/');

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private scrollService: ScrollService
  ) {
    this.socket.on('new post', (post: Post) => {
      this.addPost(post);
    });

    this.socket.on('post updated', (post: Post) => {
      this.replacePost(post);
    });

    this.socket.on('new comment', (comment: Comment) => {
      this.addComment(comment);
    });

    this.socket.on('comment updated', (comment: Comment) => {
      this.replaceComment(comment);
    });
  }

  addPost(post: Post): void {
    this.posts.unshift(post);
    this.posts = [].concat(this.posts);
    if (post.owner._id === this.user._id) {
      this.scrollService.scrollTo(`#${post._id}`);
    }
  }

  replacePost(post: Post) {
    const index = this.posts.findIndex(p => p._id === post._id);
    const posts = this.posts.splice(0);
    posts.splice(index, 1, post);
    this.posts = posts;
  }

  addComment(comment: Comment): void {
    const postIndex = this.posts.findIndex(p => p._id === comment.post);
    const post = this.posts[postIndex];
    post.comments.push(comment);
    this.replacePost(post);
    if (post.owner._id === this.user._id) {
      this.scrollService.scrollTo(`#${comment._id}`);
    }
  }

  replaceComment(comment: Comment) {
    const postIndex = this.posts.findIndex(p => p._id === comment.post);
    const post = this.posts[postIndex];
    const commentIndex = post.comments.findIndex(c => c._id === comment._id);
    post.comments.splice(commentIndex, 1, comment);
    this.replacePost(post);
  }

  onHashtagClick(hashtag: string): void {
    this.search.emit(hashtag);
  }

  async onCommentClick(post: Post): Promise<void> {
    if (this.commentText) {
      await this.commentService.addComment(this.commentText, post._id);
      this.commentText = '';
    }
  }

  async editPost(post: Post, postText: string): Promise<void> {
    console.log(post);
    console.log(postText);
    if (postText) {
      await this.postService.editPost(post._id, postText);
    }
  }

  showComments(post: Post) {
    this.commentText = '';
    post._id !== this.postExpanded ? this.postExpanded = post._id : this.postExpanded = '';
    this.scrollService.scrollTo(`#post_${post._id}_comments`);
  }
}

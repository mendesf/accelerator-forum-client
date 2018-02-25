import { Component, Input } from '@angular/core';

import { AuthService, User } from '../auth';
import { CommentService, Comment } from './comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {

  constructor(private commentService: CommentService) { }

  @Input() comments: Comment[] = [];
  user = AuthService.getUser();

  async editComment(comment: Comment, commentText: string): Promise<void> {
    if (commentText) {
      await this.commentService.editComment(comment._id, commentText);
    }
  }
}

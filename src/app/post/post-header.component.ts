import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Post } from './post.service';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html'
})
export class PostHeaderComponent implements OnChanges {

  hashtags: string[];
  @Input() ownerId: string;
  @Input() nickname: string;
  @Input() text: string;
  @Output() hashtagClick = new EventEmitter();

  ngOnChanges() {
    const re = /#\w{1,}/g;
    this.hashtags = this.text.match(re) || [];
    this.hashtags.forEach(hashtag => {
      this.text = this.text.replace(hashtag, '');
    });
    this.text = this.text.replace(/\s{2,}/, ' ').trim();
  }

  onClick(hashtag: string): void {
    this.hashtagClick.emit(hashtag);
  }
}

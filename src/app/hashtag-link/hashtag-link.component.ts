import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hashtag-link',
  template: `<a href="javascript:void(0)" (click)="onClick(hashtag)">{{hashtag}}</a> `,
})
export class HashtagLinkComponent {

  @Input() hashtag: string;
  @Output() click = new EventEmitter();

  onClick(hashtag: string): void {
    this.click.emit(hashtag);
  }
}

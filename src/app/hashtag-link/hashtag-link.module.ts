import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HashtagLinkComponent } from './hashtag-link.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HashtagLinkComponent],
  exports: [HashtagLinkComponent]
})
export class HashtagLinkModule { }

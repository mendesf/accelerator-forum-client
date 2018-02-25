import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2PageScrollModule, PageScrollService } from 'ng2-page-scroll';

import { ScrollService } from './scroll.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2PageScrollModule
  ],
  declarations: [],
  providers: [ScrollService, PageScrollService]
})
export class ScrollModule { }

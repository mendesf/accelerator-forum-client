import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Injectable()
export class ScrollService {

  constructor(
    @Inject(DOCUMENT) private document: any,
    private pageScrollService: PageScrollService
  ) { }

  scrollTo(selector: string): void {
    setTimeout(() => {
      const pageScrollInstance = PageScrollInstance.simpleInstance(this.document, selector);
      this.pageScrollService.start(pageScrollInstance);
    }, 100);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditModalContentComponent, EditModalComponent } from './edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [EditModalContentComponent, EditModalComponent],
  entryComponents: [EditModalContentComponent],
  exports: [EditModalComponent]
})
export class EditModalModule { }

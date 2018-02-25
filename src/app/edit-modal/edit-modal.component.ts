import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal-content',
  templateUrl: './edit-modal.component.html'
})
export class EditModalContentComponent {
  @Input() text: string;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-edit-modal',
  template: `<button type="button" class="btn {{btnClass}}" (click)="open()">Edit</button>`
})
export class EditModalComponent {
  @Input() text: string;
  @Output() done = new EventEmitter();
  @Input() btnClass: string;

  constructor(private modalService: NgbModal) { }

  open(): void {
    const modalRef = this.modalService.open(EditModalContentComponent);
    modalRef.componentInstance.text = this.text;

    modalRef.result.then(
      (editedText: string) => { this.done.emit(editedText); },
      () => { });
  }
}

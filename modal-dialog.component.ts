import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() confirmation = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() isAlert: boolean = false;
  @Input() infoMessage = "";
  @Input() divId = "";
  @Input() title = "";
  @Input() cnfBtnNames: [] = [];

  constructor() {

  }

  ngOnInit() {
  }

  closePopUp() {
    this.close.emit();
  }
  confirm() {
    this.confirmation.emit();
  }

}

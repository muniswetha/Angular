import { Component, OnInit, NgZone } from '@angular/core';
import { AdminService } from './admin.service';
import { Reason } from './reason.model';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ReasonCodeDialogComponent } from '../reason-code-dialog/reason-code-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public reasons: Reason[];
  private reasonsCopyFromServer: Reason[];
  public selectedReason = new Reason();
  isreadonly: boolean = true;
  constructor(private adminService: AdminService, public dialog: ConfirmationDialogService,
    private zone: NgZone) {

  }

  ngOnInit() {
    this.resonCodeList();
  }

  resonCodeList() {
    this.adminService.reasonCodeList().subscribe((data) => {
      this.reasons = data;
      this.reasonsCopyFromServer = JSON.parse(JSON.stringify(this.reasons));
    }, (err) => {
      console.log(err.message);
    });
  }

  public changeSuit(event) {
    var selReason = this.reasons.find(x => x.reasoncode == event.target.value);
    this.selectedReason = selReason ? selReason : new Reason();
    this.isreadonly = this.selectedReason.reasoncode == '';
  }

  public onsubmit() {
    this.adminService.updateReason(this.selectedReason)
      .subscribe((data) => {
        this.reasons = data;
        this.reasonsCopyFromServer = JSON.parse(JSON.stringify(this.reasons));
      }, (err) => {
        console.log(err.message);
      });

  }

  public onReset(close) {
    {
      this.reasons = JSON.parse(JSON.stringify(this.reasonsCopyFromServer));
      this.selectedReason = this.reasons.find(x => x.reasoncode == this.selectedReason.reasoncode);

    }

  }

  confirmAlert(confirmation) {
    this.adminService.updateReason(this.selectedReason)
      .subscribe((data) => {
        this.NavigateToPage();
      }, (err) => {
        console.log(err.message);
      });

  }

  cancelConfirm(close) {

    this.NavigateToPage();
  }

  NavigateToPage() {
    this.zone.runOutsideAngular(() => {
      window.location.href = '/modal';
    });
  }

}

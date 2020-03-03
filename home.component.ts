import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { Reason } from './reason.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public reasons: Reason[];
  private reasonsCopyFromServer: Reason[];
  public selectedReason = new Reason();
  constructor(private adminService: AdminService,public dialogService: DialogService) { }

  ngOnInit() {
    this.resonCodeList();
  }
 canDeactivate(): Observable<boolean> | boolean {
    debugger;
    var selectedReasonFromServer=this.reasonsCopyFromServer.find(x=>x.reasoncode==this.selectedReason.reasoncode);   

    if (selectedReasonFromServer && this.selectedReason.carrier== selectedReasonFromServer.carrier) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
  resonCodeList() {
  this.adminService.reasonCodeList().subscribe((data) => {
      this.reasons = data;
    this.reasonsCopyFromServer=  JSON.parse(JSON.stringify(this.reasons));
    }, (err) => {
      console.log(err.message);
    });
  }

  public changeSuit(event) {
    var selReason = this.reasons.find(x => x.reasoncode == event.target.value);
    this.selectedReason =selReason ? selReason: new Reason();
  }

  public onsubmit() {
    this.adminService.updateReason(this.selectedReason)
      .subscribe((data) => {
        this.reasons = data;
        this.reasonsCopyFromServer=  JSON.parse(JSON.stringify(this.reasons));
      }, (err) => {
        console.log(err.message);
      });

  }
  
  public onReset() {
    {
      this.reasons=  JSON.parse(JSON.stringify(this.reasonsCopyFromServer));
            this.selectedReason = this.reasons.find(x => x.reasoncode == this.selectedReason.reasoncode);
    }
}
}

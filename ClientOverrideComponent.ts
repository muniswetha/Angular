import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TableRadioButton, Table } from 'primeng/table/table';
import { ClientOverrideLogoAssign } from 'src/app/Models/client-override-logo-assign.model';


@Component({
  selector: 'app-client-override',
  templateUrl: './client-override.component.html',
  styleUrls: ['./client-override.component.css']
})
export class ClientOverrideComponent implements OnInit {

  @ViewChild("LogoAssignmentTable",{static: true})
  LogoAssignmentTable:Table;
  logoAssignList:ClientOverrideLogoAssign[];
  public shouldDisableAddRow: boolean;

  private overrideLevelConfig = {
    BenOptDDConfig: ["option3", "option4", "option5", "option6"],
    NetworkDDConfig: ["option5", "option6"],
    BranchDDConfig: ["option2", "option3", "option6"],
    MiscAcctConfig: [""],
    LogoAssignConfig: [""]
  };

  private overrideLevelDds = {
    Acc: { selectedValue: null, hierarchy: 1 },
    BenOpt: { selectedValue: null, hierarchy: 2 },
    Branch: { selectedValue: null, hierarchy: 3 },
    Network: { selectedValue: null, hierarchy: 4 },
  }



  public shouldDisplayBenOptDD: boolean;
  public shouldDisplayNetworkDD: boolean;
  public shouldDisplayBranchDD: boolean;
  public shouldDisplayMiscAcct: boolean;
  public shouldDisplayLogoAssign: boolean;

  constructor() { }

  ngOnInit() {
  }

  onOverrideChange(event) {
    
    this.shouldDisplayBenOptDD = this.overrideLevelConfig.BenOptDDConfig.indexOf(event.target.value) >= 0;
    this.shouldDisplayBranchDD = this.overrideLevelConfig.BranchDDConfig.indexOf(event.target.value) >= 0;
    this.shouldDisplayNetworkDD = this.overrideLevelConfig.NetworkDDConfig.indexOf(event.target.value) >= 0;
    this.resetOverrideLeveDropdowns(0);

  }

  resetOverrideLeveDropdowns(hierarchy) {
    var ddList = Object.keys(this.overrideLevelDds);
    for (var i = 0; i < ddList.length; i++) {
      if (this.overrideLevelDds[ddList[i]].hierarchy > hierarchy) {
        this.overrideLevelDds[ddList[i]].selectedValue = null;
      }
    }   
  }

//   onAddRow(event){

//  debugger;
//     var logoAssign = new ClientOverrideLogoAssign();    
//     var maxId=this.logoAssignList.map(x=>x.id);
//     logoAssign.id = Math.max(...maxId)+1;
//     logoAssign.isNewelyAdded = true;
//     var length = this.logoAssignList.push(logoAssign);
//     this.LogoAssignmentTable._totalRecords = this.logoAssignList.length;
//     this.checkAndToggleSaveAndResetButton();
//      this.shouldDisableAddRow = true;  
//      this.LogoAssignmentTable.initRowEdit(logoAssign);

//      //var vendorHoliday = new VendorHolidayList();
//      //var maxId=this.selectedYear.holidayList.map(x=>x.id); 
//     // vendorHoliday.id = Math.max(...maxId)+1;
//     // vendorHoliday.isNewelyAdded = true;
//     // var length = this.selectedYear.holidayList.push(vendorHoliday);
//     // this.holidayListTable._totalRecords = this.selectedYear.holidayList.length;
//     // this.checkAndToggleSaveAndResetButton();
//     // this.shouldDisableAddRow = true;  
//     // this.holidayListTable.initRowEdit(vendorHoliday);
//     // //pagination
//     // this.holidayListTable.first=Math.floor(this.holidayListTable.totalRecords/this.holidayListTable.rows)*this.holidayListTable.rows;
//     // this.holidayListTable.firstChange.emit(this.holidayListTable.first);
  


//   }

//   checkAndToggleSaveAndResetButton(){
//    // this.isHolidayListUpdated = this.selectedYear.holidayList.some(x=>x.isDeleted||x.isNewelyAdded||x.isUpdate);
//   }
}

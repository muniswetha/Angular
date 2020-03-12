import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/Shared/Service/admin.service';
import { VendorHolidayMaintenance } from 'src/app/Models/vendor-holiday-maintenance.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { VendorHolidayList } from 'src/app/Models/vendor-holiday-list.model';
import { Table } from 'primeng/table/table';
import { DeleteDialogBoxComponent } from 'src/app/Shared/delete-dialog-box/delete-dialog-box.component';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-vendor-holiday-maintenance',
  templateUrl: './vendor-holiday-maintenance.component.html',
  styleUrls: ['./vendor-holiday-maintenance.component.css']
})
export class VendorHolidayMaintenanceComponent implements OnInit {
  
  public pageNo:number=0;
  isAddYearBtnDisabled:boolean;
  previousRowDataInEditMode:any;
  public selectedYear:VendorHolidayMaintenance=new VendorHolidayMaintenance();
  public holidayMaintenanceList: VendorHolidayMaintenance[];
  private holidayMaintenanceListCopyFromServer: VendorHolidayMaintenance[]; 
  private holidayRowInEditMode:VendorHolidayList;
  isHolidayListUpdated: boolean;
  public shouldDisableAddRow: boolean;

  @ViewChild("holidayListTable",{static: true})
  holidayListTable:Table;
  
  @ViewChild("ModalPopUpForDelete",{static: true})
  modalPopUpForDelete:DeleteDialogBoxComponent;

  // @ViewChild("ModalPopUpForReset",{static: true})
  // modalPopUpForReset:DeleteDialogBoxComponent;
  
  constructor(private adminService: AdminService ) { 

  }

  ngOnInit() {
    this.getholidayList();
    //this.holidayListTable.alwaysShowPaginator=false;
  }
 
 

  getholidayList(){
    this.adminService.holidayList().subscribe((data)=>{ 
    this.holidayMaintenanceList=data;
    this.holidayMaintenanceListCopyFromServer = JSON.parse(JSON.stringify(this.holidayMaintenanceList));
    }, (err) => {
      console.log(err.message);
    });
  }

OnRowEdited(rowData)
{
  if(!rowData.isNewelyAdded){
    var holidayListCopyFromServer = this.holidayMaintenanceListCopyFromServer.find(x=>x.year == this.selectedYear.year);
    var holidayCopyFromServer = holidayListCopyFromServer.holidayList.find(x=>x.id == rowData.id);
    rowData.isUpdate = new Date(holidayCopyFromServer.date).toLocaleDateString() != new Date(rowData.date).toLocaleDateString() || holidayCopyFromServer.description != rowData.description;
  } else{
    debugger;
      this.shouldDisableAddRow = rowData.date == undefined || rowData.description == undefined || rowData.description.trim()=="";
  }
  this.checkAndToggleSaveAndResetButton();
}
  onAddYearClick(ddlyear:Dropdown){
   const arry= this.holidayMaintenanceList.filter(x=>x.year!=undefined).map(x=>x.year);    
   var yearToBeAdded: number= Math.max(...arry);
   var vendorMaintenance = new VendorHolidayMaintenance();
   vendorMaintenance.year = yearToBeAdded+1;
   vendorMaintenance.holidayList=[];
   this.holidayMaintenanceList.push(vendorMaintenance);
   this.isAddYearBtnDisabled= true;
   this.selectedYear = vendorMaintenance;  
   }


  onRowEditInit(rowData){
    this.holidayRowInEditMode = JSON.parse(JSON.stringify(rowData));
  }
  onRowEditCancel(rowData) {
    var index= this.selectedYear.holidayList.findIndex(x=>x.id == rowData.id);
    this.selectedYear.holidayList[index]=JSON.parse(JSON.stringify(this.holidayRowInEditMode));
    this.selectedYear.holidayList[index].date = new Date(this.selectedYear.holidayList[index].date);
    this.holidayRowInEditMode=null;
}
onRowEditSave(rowData, index: number) { 
  if(!rowData.isNewelyAdded){
    var holidayListCopyFromServer = this.holidayMaintenanceListCopyFromServer.find(x=>x.year == this.selectedYear.year);
    var holidayCopyFromServer = holidayListCopyFromServer.holidayList.find(x=>x.id == rowData.id);
    rowData.isUpdate = new Date(holidayCopyFromServer.date).toLocaleDateString() != new Date(rowData.date).toLocaleDateString() || holidayCopyFromServer.description != rowData.description;
  } else{
      this.shouldDisableAddRow = rowData.date == undefined || rowData.description == undefined || rowData.description.trim()=="";
  }
  this.checkAndToggleSaveAndResetButton();
} 

// onEditInit(event){
//   let inputElement = $(this.holidayListTable.editingCell).find('input'); 
//   const _this = this; 
//   inputElement.on('blur', function () { _this.onEditComplete(event); }); 
// }

// focusoutcell() { $(this.holidayListTable.editingCell).removeClass('ui-editing-cell'); 
// this.holidayListTable.editingCell = null; }

onRowDelete(rowData){
      $('#ModalPopUpForDelete').modal('show');
      return this.modalPopUpForDelete.confirmation.subscribe(() => {
        if(rowData.isNewelyAdded){
          this.selectedYear.holidayList = this.selectedYear.holidayList.filter(x=>x.id != rowData.id);
        } else{
          this.selectedYear.holidayList.find(x=>x.id == rowData.id).isDeleted = true;
        }
        this.checkAndToggleSaveAndResetButton();
      });
}


onDelete(rowData, index: number){
  if(rowData.isNewelyAdded){
    this.selectedYear.holidayList = this.selectedYear.holidayList.filter(x=>x.id != rowData.id);
  } else{
    this.selectedYear.holidayList.filter(x=>!x.isDeleted)[index].isDeleted = true;
  }
  this.checkAndToggleSaveAndResetButton();
}




  onAddRow(event){
 
    var vendorHoliday = new VendorHolidayList();
    var maxId=this.selectedYear.holidayList.map(x=>x.id); 
    vendorHoliday.id = Math.max(...maxId)+1;
    vendorHoliday.isNewelyAdded = true;
    var length = this.selectedYear.holidayList.push(vendorHoliday);
    this.holidayListTable._totalRecords = this.selectedYear.holidayList.length;
    this.checkAndToggleSaveAndResetButton();
    this.shouldDisableAddRow = true;  
    this.holidayListTable.initRowEdit(vendorHoliday);
    //pagination
    this.holidayListTable.first=Math.floor(this.holidayListTable.totalRecords/this.holidayListTable.rows)*this.holidayListTable.rows;
    this.holidayListTable.firstChange.emit(this.holidayListTable.first);
  


  }

  getHolidayListByYear() {
  return this.selectedYear.holidayList && this.selectedYear.holidayList.filter(x=>!x.isDeleted)
  }

  onYearSelected(event){  
    var selYear = this.holidayMaintenanceList.find(x => x.year == event.target.value);
    this.selectedYear = selYear ? selYear : new VendorHolidayMaintenance();
    
  }


onEditComplete(event){
  if(!event.data.isNewelyAdded){
    var holidayListCopyFromServer = this.holidayMaintenanceListCopyFromServer.find(x=>x.year == this.selectedYear.year);
    var holidayCopyFromServer = holidayListCopyFromServer.holidayList.find(x=>x.id == event.data.id);
    event.data.isUpdate = new Date(holidayCopyFromServer.date).toLocaleDateString() != new Date(event.data.date).toLocaleDateString() || holidayCopyFromServer.description != event.data.description;
  } else{
      this.shouldDisableAddRow = event.data.date == undefined || event.data.description == undefined || event.data.description.trim()=="";
  }
  this.checkAndToggleSaveAndResetButton();
  }


checkAndToggleSaveAndResetButton(){
  this.isHolidayListUpdated = this.selectedYear.holidayList.some(x=>x.isDeleted||x.isNewelyAdded||x.isUpdate);
}
 onSaveClick() {
   this.adminService.saveVendorHolidayMaintenance(this.selectedYear);
   this.getholidayList();
   this.checkAndToggleSaveAndResetButton();
   this.selectedYear = new VendorHolidayMaintenance();
 }

//  onResetClick() {
//   $('#ModalPopUpForReset').modal('show');
//  }

resetHolidayList() {
  if(this.selectedYear.id){
  var holidayListCopyFromServer = this.holidayMaintenanceListCopyFromServer.find(x=>x.year == this.selectedYear.year);
  this.selectedYear.holidayList = JSON.parse(JSON.stringify(holidayListCopyFromServer.holidayList));
  this.selectedYear.holidayList.forEach(x=>{
    x.date = new Date(x.date);
  });
}else{
  this.selectedYear.holidayList=[];
}
  this.checkAndToggleSaveAndResetButton();
}



// canDeactivate(): Observable<boolean> | boolean {
 

//   if ( !this.selectedYear.id || !this.isHolidayListUpdated)  {
//     return true;
//   }
    
// }


}


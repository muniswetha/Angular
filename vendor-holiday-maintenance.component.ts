import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from 'src/app/Shared/Service/admin.service';
import { VendorHolidayMaintenance } from 'src/app/Models/vendor-holiday-maintenance.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { VendorHolidayList } from 'src/app/Models/vendor-holiday-list.model';
import { Table } from 'primeng/table/table';



@Component({
  selector: 'app-vendor-holiday-maintenance',
  templateUrl: './vendor-holiday-maintenance.component.html',
  styleUrls: ['./vendor-holiday-maintenance.component.css']
})
export class VendorHolidayMaintenanceComponent implements OnInit,AfterViewInit {
  
 
  public selectedYear:VendorHolidayMaintenance=new VendorHolidayMaintenance();
  public holidayMaintenanceList: VendorHolidayMaintenance[];
  private holidayMaintenanceListCopyFromServer: VendorHolidayMaintenance[]; 
  private holidayRowInEditMode:VendorHolidayList;

  @ViewChild("holidayListTable",{static: true})
  holidayListTable:Table;
  
  constructor(private adminService: AdminService ) { 

  }

  ngOnInit() {
    this.getholidayList();
    this.holidayListTable.alwaysShowPaginator=false;
  }
  ngAfterViewInit(): void {
   
  }
 

  getholidayList(){
    this.adminService.holidayList().subscribe((data)=>{
      data.splice(0, 0, new VendorHolidayMaintenance());
      this.holidayMaintenanceList=data;

      // this.holidayMaintenanceList.push(new VendorHolidayMaintenance());
      // data.forEach(x=>{
      //   this.holidayMaintenanceList.push(x);
      // })   
    this.holidayMaintenanceListCopyFromServer = JSON.parse(JSON.stringify(this.holidayMaintenanceList));
    }, (err) => {
      console.log(err.message);
    });
  }

  onAddYearClick(ddlyear:Dropdown){
   const arry= this.holidayMaintenanceList.filter(x=>x.year!=undefined).map(x=>x.year);    
   var yearToBeAdded: number= Math.max(...arry);
   var vendorMaintenance = new VendorHolidayMaintenance();
   vendorMaintenance.year = yearToBeAdded+1;
   vendorMaintenance.holidayList=[];
   this.holidayMaintenanceList.push(vendorMaintenance);
   ddlyear.options = this.holidayMaintenanceList;
   ddlyear.optionsChanged = true;
   ddlyear._options = this.holidayMaintenanceList;
   //this.selectedYear = vendorMaintenance;  
  }
  onRowEditInit(rowData){
    this.holidayRowInEditMode = JSON.parse(JSON.stringify(rowData));

  }
  onRowEditCancel(rowData) {
    var index= this.selectedYear.holidayList.findIndex(x=>x.id == rowData.id);
    this.selectedYear.holidayList[index]=JSON.parse(JSON.stringify(this.holidayRowInEditMode));
    this.holidayRowInEditMode=null;
}
onRowEditSave(rowData, index: number) {
  var index= this.selectedYear.holidayList.findIndex(x=>x.id == rowData.id);
  this.selectedYear.holidayList[index].isUpdate = true;
  this.holidayRowInEditMode=null;
     // this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
     // this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
  
} 
onRowDelete(rowData, index: number){
  this.selectedYear.holidayList.filter(x=>!x.isDeleted)[index].isDeleted = true;
}

  onAddRow(){
    debugger
    var vendorHoliday = new VendorHolidayList();
    var maxId=this.selectedYear.holidayList.map(x=>x.id); 
    vendorHoliday.id = Math.max(...maxId)+1;
    vendorHoliday.isNewelyAdded = true;
    this.selectedYear.holidayList.push(vendorHoliday);
    this.holidayListTable._totalRecords = this.selectedYear.holidayList.length;
    this.holidayListTable.initRowEdit(vendorHoliday);
    
  }

  getHolidayListByYear() {
  return this.selectedYear.holidayList && this.selectedYear.holidayList.filter(x=>!x.isDeleted)
  }


}

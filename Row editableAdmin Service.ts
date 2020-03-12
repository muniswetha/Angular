import { Injectable } from '@angular/core';
import { VendorHolidayMaintenance } from 'src/app/Models/vendor-holiday-maintenance.model';
import { Observable } from 'rxjs';
import { Cars } from 'src/app/Models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public holidayMaintenanceList: VendorHolidayMaintenance[];
  public carslist:Cars[]
  
  constructor() { 
    this.holidayMaintenanceList = [
      { id:1, 
        year: 2001,
        holidayList:[
                      {id:1,date: new Date('01/01/2001'),description:'Newyear'},
                      {id:2,date: new Date('12/25/2001'),description:'christmas'},
                      {id:3,date: new Date('01/15/2001'),description:'sankranthi'},
                      {id:4,date: new Date('01/16/2001'),description:'sankranthi1'},
                      {id:5,date: new Date('01/17/2001'),description:'sankranthi2'},
                      {id:6,date: new Date('01/18/2001'),description:'sankranthi3'},
                      {id:7,date: new Date('01/19/2001'),description:'sankranthi4'},
                      {id:8,date: new Date('01/20/2001'),description:'sankranthi5'}
                    ]
      },
      { id:2, 
        year: 2002,
        holidayList:[
                      {id:4,date: new Date('01/01/2002'),description:'Newyear2'},
                      {id:5,date: new Date('12/25/2002'),description:'christmas2'},
                      {id:6,date: new Date('01/15/2002'),description:'sankranthi2'}
                    ]
      }      
    
    ];
  }

  holidayList(): Observable<VendorHolidayMaintenance[]> {
    this.holidayMaintenanceList.forEach(x=>{
      x.holidayList = x.holidayList.filter(y=>!y.isDeleted);
    })
    return this.createObservable(this.holidayMaintenanceList);
  }

  saveVendorHolidayMaintenance(vendorHolidayMaintenance: VendorHolidayMaintenance){
    var existingHolidayMaintenanceYear = this.holidayMaintenanceList.find(x=>x.id == vendorHolidayMaintenance.id);
    vendorHolidayMaintenance.holidayList.forEach(x=>{
      x.isNewelyAdded = false;
      x.isUpdate = false;
    });
    if(existingHolidayMaintenanceYear){
      this.holidayMaintenanceList.find(x=>x.id == vendorHolidayMaintenance.id).holidayList = vendorHolidayMaintenance.holidayList;
    } else{
      vendorHolidayMaintenance.id == this.holidayMaintenanceList.length;
      this.holidayMaintenanceList.push(vendorHolidayMaintenance);
    }
  }

  createObservable(data: any): Observable<any> {
    return new Observable(
      observer => { 
        observer.next(data);
      }
    )
  }

}

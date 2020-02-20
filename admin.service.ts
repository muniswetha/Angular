import { Injectable } from '@angular/core';
import { Reason } from './reason.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public reasoncodes: Reason[];
  constructor() { }

  reasonCodeList(): Observable<Reason[]> {
    this.reasoncodes = [
      { reasoncode: 'AB', type: 'Type1', description: 'Description one', carrier: 'maintenance one' },
      { reasoncode: 'BC', type: 'Type2', description: 'Description TWO', carrier: 'maintenance two' },
      { reasoncode: 'CD', type: 'Type3', description: 'Description three', carrier: 'maintenance three' }
    ];
    return this.createObservable(this.reasoncodes);
  }


  updateReason(reason: Reason): Observable<Reason[]> {
    var reasonToBeUpdated = this.reasoncodes.find(x => x.reasoncode == reason.reasoncode);
    if (reasonToBeUpdated) {
      reasonToBeUpdated.carrier = reason.carrier;
    }
    return this.createObservable(this.reasoncodes);
    //return this.http.post("")
  }

  createObservable(data: any): Observable<any> {
    return new Observable(
      observer => {
        observer.next(data);
      }
    )
  }
}

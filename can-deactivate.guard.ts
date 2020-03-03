import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from './home/home.component';

export interface CanComponentDeactivate {
  canDeactivate(component: CanComponentDeactivate, currentRoute: import("@angular/router").ActivatedRouteSnapshot, currentState: import("@angular/router").RouterStateSnapshot, nextState?: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree>; }

@Injectable({
  providedIn: 'root'
}) 
export class CanDeactivateGuard implements CanDeactivate<HomeComponent> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: import("@angular/router").ActivatedRouteSnapshot, currentState: import("@angular/router").RouterStateSnapshot, nextState?: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    debugger;
    return true;
  }
  // canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
  //   debugger;
  //   return true;
  //   //throw new Error("Method not implemented.");
  // }
  // canActivate() {
  //   // debugger;
  //   // return component.canDeactivate ? component.canDeactivate() : true;
  // }
  
} 

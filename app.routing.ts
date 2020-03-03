import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { DialogService } from './dialog.service';


const routes: Routes = [
{ 
path:'home',
component:HomeComponent,
canDeactivate: [CanDeactivateGuard]

},
{path:'modal',component:ModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [CanDeactivateGuard, DialogService],
  exports: [RouterModule]
})
export class AppRoutingModule { }

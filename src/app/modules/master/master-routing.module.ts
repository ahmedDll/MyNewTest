import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';


import { MainModalComponent } from 'src/app/_eladle/partials/layout/modals/main-modal/main-modal.component';
import { StationsComponent } from './stations/stations.component';
import { EventsComponent } from './events/events.component';
import { UsersComponent } from './users/users.component';
import { StationsClassesComponent } from './stations-classes/stations-classes.component';
import { CustomerComponent } from './Customer/Customer.component';
import { PromotionEventReportsComponent } from './promotion-event-reports/promotion-event-reports.component';
import { TransactionReportsComponent } from './transaction-reports/transaction-reports.component';
import { EmployeeComponent } from './employee/employee.component';
import { MembershipComponent } from './membership/membership.component';
import { MainSubComponent } from './main-sub/main-sub.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [

      {
        path: 'Stations',
        component: StationsComponent
      }, {
        path: 'StationsClasses',
        component: StationsClassesComponent
      },
      {
        path: 'Events',
        component: EventsComponent
      },
      {
        path: 'PromotionsSummaryDashboard',
        component: PromotionEventReportsComponent
      },
      {
        path: 'PromotionsDetailedDashboard',
        component: TransactionReportsComponent
      },
      {
        path: 'Customer',
        component: CustomerComponent
      },



      {
        path: 'Users',
        component: UsersComponent
      },
      {
        path: 'Employee',
        component: EmployeeComponent
      },
      {
        path: 'MemberShip',
        component: MembershipComponent
      },
      {
        path: 'MainSub',
        component: MainSubComponent
      },
      { path: '', redirectTo: '404', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

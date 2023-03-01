import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
@NgModule({
  declarations: [
    MasterComponent,
    StationsComponent,
    EventsComponent,
    UsersComponent,
    StationsClassesComponent,
    CustomerComponent,
    PromotionEventReportsComponent,
    TransactionReportsComponent,
    EmployeeComponent,
    MembershipComponent,
    MainSubComponent


  ],
  imports: [
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MasterRoutingModule,
    AgGridModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg';

// Other
import { DropdownMenusModule } from '../dropdown-menus/dropdown-menus.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MixedWidget2Component } from './mixed/mixed-widget2/mixed-widget2.component';
@NgModule({
  declarations: [
    MixedWidget2Component,
  ],
  imports: [
    CommonModule,
    DropdownMenusModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
  ],
  exports: [
    MixedWidget2Component,
  ],
})
export class WidgetsModule {}

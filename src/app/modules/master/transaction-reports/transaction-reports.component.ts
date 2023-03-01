import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPromotionEvents } from 'src/app/_interface/master/ipromotionEvents';
import { IStation } from 'src/app/_interface/master/istation';
import { IStationClass } from 'src/app/_interface/master/iStationClass';
import { EventsService } from 'src/app/_service/master/events.service';
import { StationsService } from 'src/app/_service/master/stations.service';
import { StationsClassesService } from 'src/app/_service/master/stationsClasses.service';

@Component({
  selector: 'app-transaction-reports',
  templateUrl: './transaction-reports.component.html',
  styleUrls: ['./transaction-reports.component.scss']
})
export class TransactionReportsComponent implements OnInit {
  from: string;
  to: string;
  api: any;
  eventCode: number = 0;
  stationsClasses: IStationClass[] = [];
  allstation:IStation[]=[];
  selectedstation:IStation[]=[];
  selectedStationsClasses: IStationClass[] = [];
  dropdownSettings: IDropdownSettings = {};
  rowSelection = 'single';
  ipromoEvents: IPromotionEvents[] = [];
  selectedPromoEvents: IPromotionEvents[] = [];
  columnDefs: any = [
    {
      field: 'promotionSerial',
      headerName: "Promo Serial",
      floatingFilter: true,
      sortable: true, filter: true, width: 200

    },
    {
      field: 'eventTopic',
      headerName: "Promotion  Topic",
      sortable: true, filter: true, width: 200
    },
    {
      field: 'startDate',
      headerName: "Start Date",
      sortable: true, filter: true, width: 200
    },
    {
      field: 'endDate',
      headerName: "End Date",
      sortable: true, filter: true, width: 200
    },

    , {
      field: 'stationSerial',
      headerName: "Station Serial",
      sortable: true, filter: true, width: 200
    },
    {
      field: 'stationArabicName',
      headerName: "Station Arabic Name",
      sortable: true, filter: true, width: 200
    }, 
    {
      field: 'stationName',
      headerName: "Station Name",
      sortable: true, filter: true, width: 200
    },{
      field: 'classificationArabicName',
      headerName: "Class Arabic Name",
      sortable: true, filter: true, width: 200
    }, {
      field: 'classificationName',
      headerName: "Class Name",
      sortable: true, filter: true, width: 200
    }, 
    {
      field: 'name',
      headerName: "Cust name",
      sortable: true, filter: true, width: 200, cellRenderer: 'agGroupCellRenderer'
    }, {
      field: 'phoneNumber',
      headerName: "Phone Number",
      floatingFilter: true,
      sortable: true, filter: true, width: 250
    }, {
      field: 'birthDate',
      headerName: "Birth Date",
      floatingFilter: true,
      sortable: true, filter: true, width: 250
    }
 ,
    {
      field: 'useQRYN',
      headerName: "Used QR",
      sortable: true, filter: true, width: 200
    },
    {
      field: 'userName',
      headerName: "Cashier",
      sortable: true, filter: true, width: 200
    },
    {
      field: 'createdDate',
      headerName: "Date using",
      sortable: true, filter: true, width: 200
    },

    
  ];
  dropdownSettings1: { singleSelection: boolean; idField: string; textField: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  dropdownSettings2: { singleSelection: boolean; idField: string; textField: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  constructor(
    private cd: ChangeDetectorRef,
    public stationsClassesServices: StationsClassesService,
    public eventServices: EventsService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    public _StationsService:StationsService
  ) {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'serial',
      textField: this.translate.instant("StationClasses.StationClassColName"),
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'serial',
      textField: "eventTopic",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'serial',
      textField: "stationName",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.eventServices.getAll().subscribe(res => {
      // this.api.setRowData(res);
      this.cd.detectChanges();
  
      this.ipromoEvents = res;
    })
    this._StationsService.getAll().subscribe(res=>{
      this.allstation=res
    })
  }
  onItemSelect1(item) {
   
      this.eventCode = item.promotionCode;
    
  }
  onItemDeselect1(item) {
    if (this.selectedPromoEvents.length == 0)
      this.eventCode = 0;
  }
  ngOnInit(): void {
    this.reset();
    this.stationsClassesServices.getAll().subscribe(res => {
      this.stationsClasses = res;
      this.cd.detectChanges();
    })
  }
  export()
  {
    this.api.exportDataAsExcel({fileName: ' Promotions Detailed Dashboard.xlsx'})
  }
  reset() {
    this.eventServices.itransactionReport = {
      from: '',
      to: '',
      classifcationCode:0,
      phone:'',
      promoCode:0,
      stationCode:0
    }
  }
  onGridReady(params) {
    this.api = params.api;
    this.api.setRowData([]);
    // this.spinner.show();
    // this.getAll();
  }
  fillGrid() {
if(this.selectedPromoEvents!=null&&this.selectedPromoEvents.length>0)
{
  this.eventServices.itransactionReport.promoCode=this.selectedPromoEvents[0].serial
}
else
this.eventServices.itransactionReport.promoCode=0;
if(this.selectedStationsClasses!=null&&this.selectedStationsClasses.length>0)
{
  this.eventServices.itransactionReport.classifcationCode=this.selectedStationsClasses[0].serial
}
else
this.eventServices.itransactionReport.classifcationCode=0;

if(this.selectedstation!=null&&this.selectedstation.length>0)
{
  this.eventServices.itransactionReport.stationCode=this.selectedstation[0].serial
}
else
this.eventServices.itransactionReport.stationCode=0;
    this.api.setRowData([]);
    this.spinner.show();
    this.eventServices.transactionReport().subscribe(res => {
      this.api.setRowData(res);
      this.spinner.hide();
    });
  }

  onItemSelect(item) {
    this.eventServices.itransactionReport.classifcationCode = item.serial;
  }
  onItemDeselect(item) {
    this.eventServices.itransactionReport.classifcationCode = null;

  }
  phoneChanged(ele) {
    var val = ele.currentTarget.value;
    if (val.trim() == "") {
      this.eventServices.itransactionReport.phone = null;
    }
  }
}

import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStationClass } from 'src/app/_interface/master/iStationClass';
import { IreportService } from 'src/app/_service/master/Ireport';
import { StationsService } from 'src/app/_service/master/stations.service';
import { StationsClassesService } from 'src/app/_service/master/stationsClasses.service';
@Component({
  selector: 'app-Customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.scss']
})
export class CustomerComponent implements OnInit {
  title = "";
  edit = false;
  showError = false;
  modalRef: BsModalRef;
  istationClasses: IStationClass[] = [];
  columnDefs: any = [
    {
      field: 'name',
      headerName: this.translate.instant("Customer.Name"),
      sortable: true, filter: true, width: 400,
      floatingFilter: true,
    },
    {
      field: 'phoneNumber',
      headerName: this.translate.instant("Customer.phoneNumber"),
      sortable: true, filter: true, width: 200,
      floatingFilter: true,
    },
    {
      field: 'birthDate',
      headerName: this.translate.instant("Customer.BirthDay"),
      sortable: true, filter: true, width: 200,
      floatingFilter: true,
      valueFormatter: function (params) {
        return params.value.substring(0, 10);
      },

    },
    {
      field: 'email',
      headerName: this.translate.instant("Customer.Email"),
      sortable: true, filter: true, width: 250,
      floatingFilter: true,

    },
    {
      field: 'gender',
      headerName: this.translate.instant("Customer.Gender"),
      sortable: true, filter: true, width: 230,
      floatingFilter: true,

    }
    // ,
    // {
    //   field: 'stationAdress',
    //   headerName: this.translate.instant("Station.Address"),
    //   sortable: true, filter: true, width: 200
    // }, {
    //   field: 'stationManager',
    //   headerName: this.translate.instant("Station.Manager"),
    //   sortable: true, filter: true, width: 200
    // }
  ];
  rowData: any;
  api: any;
  rowSelection = 'single';
  constructor(
    private cd: ChangeDetectorRef,

    public translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private _report: IreportService
  ) { }

  ngOnInit(): void {
    this.reset();


    this.getAll();

  }


  reset() {

  }

  onGridReady(params) {

    this.api = params.api;
   

  }
  export()
  {
    this.api.exportDataAsExcel({fileName: 'Customer.xlsx'})
  }
  onrowDoubleClicked(params) {

  }

  getAll() {
    this.spinner.show();
    this._report.getAll().subscribe(res => {
      this.api.setRowData(res);
      this.cd.detectChanges();
      this.spinner.hide();
    })
  }
  onFilterTextBoxChanged() {
    this.api.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  hide() {
    this.modalRef.hide();
    this.reset();
  }


}

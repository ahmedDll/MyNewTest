import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStationClass } from 'src/app/_interface/master/iStationClass';
import { StationsService } from 'src/app/_service/master/stations.service';
import { StationsClassesService } from 'src/app/_service/master/stationsClasses.service';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  title = "";
  edit = false;
  showError = false;
  modalRef: BsModalRef;
  istationClasses: IStationClass[] = [];
  columnDefs: any = [
    {
      field: 'stationCode',
      headerName: this.translate.instant("Station.Code"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'stationName',
      headerName: this.translate.instant("Station.EnName"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'stationArabicName',
      headerName: this.translate.instant("Station.ArName"),
      sortable: true, filter: true, width: 200

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
    public stationServices: StationsService,
    public stationClassesServices: StationsClassesService,
    public translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.reset();
    this.stationClassesServices.getAll().subscribe(res => {
      this.istationClasses = res;
    })
  }
  @ViewChild('upsertForm') template: TemplateRef<any>;

  reset() {
    this.stationServices.istation = {
      serial: 0,
      stationCode: '0',
      stationAdress: null,
      stationName: null,
      classifficationCode: 0,
      stationArabicName: null,
      stationManager: null,
      activeYN: false
    }
  }

  onGridReady(params) {
    this.api = params.api;
    this.api.setRowData([]);
    this.spinner.show();
    this.getAll();
  }

  onrowDoubleClicked(params) {
    this.reset();
    this.edit = true;
    this.title = "edit station"
    this.modalRef = this.modalService.show(this.template);
    this.stationServices.istation = params.data;
  }

  getAll() {
    this.stationServices.getAll().subscribe(res => {
      this.api.setRowData(res);
      this.cd.detectChanges();
      this.spinner.hide();

    })
  }
  show() {
    /*   if(!this._IPrgPer.insert)
      {
        alert('ليس من حقك الاضافه');
        return;
      } */

    this.reset();
    this.edit = false;
    this.title = "add station"
    this.modalRef = this.modalService.show(this.template);

  }
  hide() {
    this.modalRef.hide();
    this.reset();
  }

  onSubmit(StationF) {
    var isInvalid = StationF.invalid
    if (!isInvalid) {
      if (!this.stationServices.istation.classifficationCode || this.stationServices.istation.classifficationCode == 0) {
        this.showError = true;
        return;
      }
      this.stationServices.istation.classifficationCode = + this.stationServices.istation.classifficationCode;
      if (!this.edit) {
        this.stationServices.insert().subscribe(res => {
          this.getAll();
          this.hide();
        })
      } else {
        this.stationServices.update().subscribe(res => {
          this.getAll();
        })
      }
    }
  }

  deleteStation() {
    if (confirm("Are you sure you want to delete station?")) {
      this.stationServices.delete().subscribe(res => {
        this.getAll();
      });
    }
  }
}

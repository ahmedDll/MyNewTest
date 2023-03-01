import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { StationsClassesService } from 'src/app/_service/master/stationsClasses.service';

@Component({
  selector: 'app-stations-classes',
  templateUrl: './stations-classes.component.html',
  styleUrls: ['./stations-classes.component.scss']
})
export class StationsClassesComponent implements OnInit {
  title = "";
  edit = false;
  modalRef: BsModalRef;
  columnDefs: any = [
    {
      field: 'serial',
      headerName: this.translate.instant("StationClasses.StationClassCode"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'stationClassArabicName',
      headerName: this.translate.instant("StationClasses.StationClassArabicName"),
      sortable: true, filter: true, width: 300
    },
    {
      field: 'stationClassEnglishName',
      headerName: this.translate.instant("StationClasses.StationClassEnglishName"),
      sortable: true, filter: true, width: 300

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
    public stationsClassesServices: StationsClassesService,
    public translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.reset();
  }
  @ViewChild('upsertForm') template: TemplateRef<any>;

  reset() {
    this.stationsClassesServices.istationClass = {
      serial: 0,
      stationClassArabicName: null,
      stationClassEnglishName: null

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
    this.title = "edit station class"
    this.modalRef = this.modalService.show(this.template);
    this.stationsClassesServices.istationClass = params.data;
  }

  getAll() {
    this.stationsClassesServices.getAll().subscribe(res => {
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
    this.title = "add station class"
    this.modalRef = this.modalService.show(this.template);

  }
  hide() {
    this.modalRef.hide();
    this.reset();
  }

  onSubmit(StationF) {
    var isInvalid = StationF.invalid
    if (!isInvalid) {
      if (!this.edit) {
        this.stationsClassesServices.insert().subscribe(res => {
          this.getAll();
          this.hide();
        })
      } else {
        this.stationsClassesServices.update().subscribe(res => {
          this.getAll();
        })
      }
    }
  }

  deleteStation() {
    if (confirm("Are you sure you want to delete Station Class?")) {
      this.stationsClassesServices.delete().subscribe(res => {
        this.getAll();
      });
    }
  }
}

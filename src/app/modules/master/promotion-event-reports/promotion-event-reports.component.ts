import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IDetailCellRendererParams } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPromotionEvents } from 'src/app/_interface/master/ipromotionEvents';
import { IStation } from 'src/app/_interface/master/istation';
import { IStationClass } from 'src/app/_interface/master/iStationClass';
import { EventsService } from 'src/app/_service/master/events.service';
import { StationsService } from 'src/app/_service/master/stations.service';
import { StationsClassesService } from 'src/app/_service/master/stationsClasses.service';

@Component({
  selector: 'app-promotion-event-reports',
  templateUrl: './promotion-event-reports.component.html',
  styleUrls: ['./promotion-event-reports.component.scss']
})
export class PromotionEventReportsComponent implements OnInit {
  startDate: string;
  endDate: string;
  eventCode: number = 0;
  title = "";
  detailsTitle = "";
  edit = false;
  editDetails = false;
  selectedDetailsIndex: any;
  modalRef: BsModalRef;
  detailsModalRef: BsModalRef;
  columnDefs: any = [
    {
      field: 'promoCode',
      headerName: this.translate.instant("Event.PromotionEventSerial"),
      sortable: true, filter: true, width: 200, cellRenderer: 'agGroupCellRenderer'
    }, {
      field: 'promoEnglishName',
      headerName: this.translate.instant("Event.Topic"),
      floatingFilter: true,
      sortable: true, filter: true, width: 250
    }, {
      field: 'promoArabicName',
      headerName: this.translate.instant("Event.TopicAR"),
      floatingFilter: true,
      sortable: true, filter: true, width: 250
    },
    {
      field: 'startDate',
      headerName: this.translate.instant("Event.StartDate"),
      floatingFilter: true,
      sortable: true, filter: true, width: 200
    },
    {
      field: 'endDate',
      headerName: this.translate.instant("Event.EndDate"),
      floatingFilter: true,
      sortable: true, filter: true, width: 200

    },
    {
      field: 'maxParticipants',
      headerName: this.translate.instant("Event.MaxParticipants"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'actualPaticipants',
      headerName: this.translate.instant("Event.ActualPaticipants"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'remainingParticipants',
      headerName: this.translate.instant("Event.RemainingParticipants"),
      sortable: true, filter: true, width: 200
    },
    {
      headerName: "branches",
      sortable: true, filter: true, width: 200,
      valueGetter: params => {
        var stations = params.data.stations;
        var stationsText = '';
        for (let st in stations) {
          if (stationsText.trim() == '') {
            stationsText += stations[st].stationName
          } else {
            stationsText += ' ,' + stations[st].stationName
          }
        }
        stationsText += '.';
        return stationsText;
      }
    }
  ];

  public groupDefaultExpanded = 0;
  public detailCellRendererParams: any = {
    // level 2 grid options
    detailGridOptions: {
      columnDefs: [
        {
          field: 'stationCode',
          headerName: this.translate.instant("Station.Code"),
          flex: 1
        },
        {
          field: 'stationName',
          headerName: this.translate.instant("Station.EnName"),
          flex: 1
        },
        {
          field: 'stationArabicName',
          headerName: this.translate.instant("Station.ArName"),
          flex: 1
        },

      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.stations);
    },
  } as IDetailCellRendererParams;
  istationClasses: IStationClass[] = [];
  ifilteredStationClasses: IStationClass[] = [];

  rowData: any;
  detailsRowData: any;
  api: any;
  detailsApi: any;
  rowSelection = 'single';
  stations: IStation[] = [];
  selectedStations: IStation[] = [];
  dropdownSettings: IDropdownSettings = {};
  ipromoEvents: IPromotionEvents[] = [];
  selectedPromoEvents: IPromotionEvents[] = [];
  constructor(
    private cd: ChangeDetectorRef,
    public eventServices: EventsService,
    public stationServices: StationsService,
    public translate: TranslateService,
    public stationClassesServices: StationsClassesService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) {

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'serial',
      textField: "eventTopic",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.reset();
    this.resetDetails();
    this.stationServices.getAll().subscribe(res => {
      this.stations = res;
    })
    this.stationClassesServices.getAll().subscribe(res => {
      this.istationClasses = this.ifilteredStationClasses = res;
    })
    this.getAll();
  }
  @ViewChild('upsertForm') template: TemplateRef<any>;
  @ViewChild('detailsUpsertForm') template2: TemplateRef<any>;
  reset() {
    this.eventServices.ipromotionEvents = {
      serial: 0,
      eventTopic: null,
      startDate: null,
      endDate: null,
      eventDescription: null,
      imagePath: null,
      maxParticipants: 0,
      stations: [],
      promotionDetails: []
    }
    this.selectedStations = []
  }
  resetDetails() {
    this.eventServices.ipromotionEventsDetails = {
      serial: 0,
      promotionEventSerial: 0,
      promotionCode: '',
      description: '',
      descriptionArabic: ''
    }
  }
  export()
  {
    this.api.exportDataAsExcel({fileName: 'Promotions_Summary_Dashboard.xlsx'})
  }

  filteredStations(stationClassCode) {
    return this.stations.filter(st => st.classifficationCode == stationClassCode);
  }
  onGridReady(params) {
    this.api = params.api;
    this.api.setRowData([]);
    this.spinner.show();
    // this.getAll();
  }
  fillGrid() {
    this.eventServices.promotionReport(this.startDate.replace("/", "-"), this.endDate.replace("/", "-"), this.eventCode).subscribe(res => {
      this.api.setRowData(res);

    })
  }
  // onrowDoubleClicked(params) {
  //   this.reset();
  //   this.edit = true;
  //   this.title = "edit event"
  //   this.modalRef = this.modalService.show(this.template);
  //   this.eventServices.ipromotionEvents = params.data;
  //   this.selectedStations = [];
  //   for (var i in this.eventServices.ipromotionEvents.stations) {
  //     this.selectedStations.push(this.stations.find(st => st.serial == this.eventServices.ipromotionEvents.stations[i]));
  //   }
  //   this.cd.detectChanges();
  // }
  onItemSelect(item) {
    if (!this.eventServices.ipromotionEvents.stations.includes(item.serial)) {
      this.eventCode = item.serial;
    }
  }
  onItemDeselect(item) {
    if (this.selectedPromoEvents.length == 0)
      this.eventCode = 0;
  }
  // onSelectAll(items) {
  //   for (var i in items) {
  //     if (!this.eventServices.ipromotionEvents.stations.includes(items[i].serial)) {
  //       this.eventServices.ipromotionEvents.stations.push(items[i].serial);
  //     }
  //   }
  // }
  // onDeselectAll(items) {
  //   this.eventServices.ipromotionEvents.stations = [];
  // }
  getAll() {
    this.eventServices.getAll().subscribe(res => {
      // this.api.setRowData(res);
      this.cd.detectChanges();
      this.spinner.hide();
      this.ipromoEvents = res;
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
    this.title = "add event"
    this.modalRef = this.modalService.show(this.template);

  }
  showDetails() {
    /*   if(!this._IPrgPer.insert)
      {
        alert('ليس من حقك الاضافه');
        return;
      } */

    this.resetDetails();
    this.editDetails = false;
    this.detailsTitle = "add event detail"
    this.detailsModalRef = this.modalService.show(this.template2);

  }
  hide() {
    this.modalRef.hide();
    this.reset();
  }
  hideDetails() {
    this.detailsModalRef.hide();
    this.resetDetails();
  }



  classSelected(checkbox, classserial) {
    var selectedStations = this.stations.filter(st => st.classifficationCode == classserial);
    for (var sst in selectedStations) {
      var stCkBox = document.getElementById("station_" + selectedStations[sst].serial) as HTMLInputElement;
      stCkBox.checked = checkbox.currentTarget.checked;
      if (checkbox.currentTarget.checked) {
        if (!this.eventServices.ipromotionEvents.stations.includes(selectedStations[sst].serial)) {
          this.eventServices.ipromotionEvents.stations.push(selectedStations[sst].serial);
        }
      } else {
        var ind = this.eventServices.ipromotionEvents.stations.findIndex(se => se == selectedStations[sst].serial)
        this.eventServices.ipromotionEvents.stations.splice(ind, 1);
      }

    }
  }
  filterClasses(value) {
    this.ifilteredStationClasses = this.istationClasses.filter(stcl => stcl.stationClassEnglishName.includes(value) || stcl.stationClassArabicName.includes(value));
    this.cd.detectChanges();
  }

  stationSelected(stationSerial, checkbox) {
    if (checkbox.currentTarget.checked) {
      if (!this.eventServices.ipromotionEvents.stations.includes(stationSerial)) {

        this.eventServices.ipromotionEvents.stations.push(stationSerial);
      }
    } else {
      var ind = this.eventServices.ipromotionEvents.stations.findIndex(se => se == stationSerial)
      this.eventServices.ipromotionEvents.stations.splice(ind, 1);
    }
  }

  isChecked(serial) {
    return this.eventServices.ipromotionEvents.stations.find(st => st == serial) != null
  }
  onDetailsrowDoubleClicked(params) {
    this.resetDetails();
    this.detailsModalRef = this.modalService.show(this.template2);
    this.eventServices.ipromotionEventsDetails = params.data;
    this.selectedDetailsIndex = params.rowIndex;
    this.editDetails = true;
  }

  ondetailsGridReady(params) {
    this.detailsApi = params.api;
    this.detailsApi.setRowData(this.eventServices.ipromotionEvents.promotionDetails);

  }

  copyToClipboard() {
    navigator.clipboard.writeText(`https://www.besttopsystems.net:59990/Details/${this.eventServices.ipromotionEvents.serial}`);
    const textArea = document.createElement("textarea");
    textArea.value = `https://www.besttopsystems.net:59990/Details/${this.eventServices.ipromotionEvents.serial}`;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy', false, `https://www.besttopsystems.net:59990/Details/${this.eventServices.ipromotionEvents.serial}`);
    } catch (err) {
      console.error('Unable to copy to clipboard', err)
    }
    document.body.removeChild(textArea)
    alert("copied link.");
  }
}

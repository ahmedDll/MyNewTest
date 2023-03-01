import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStation } from 'src/app/_interface/master/istation';
import { EventsService } from 'src/app/_service/master/events.service';
import { StationsService } from 'src/app/_service/master/stations.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StationsClassesService } from 'src/app/_service/master/stationsClasses.service';
import { IStationClass } from 'src/app/_interface/master/iStationClass';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  title = "";
  detailsTitle = "";
  edit = false;
  editDetails = false;
  selectedDetailsIndex: any;
  modalRef: BsModalRef;
  detailsModalRef: BsModalRef;
  columnDefs: any = [
    {
      field: 'serial',
      headerName: this.translate.instant("Event.PromotionEventSerial"),
      sortable: true, filter: true, width: 200
    }, {
      field: 'eventTopic',
      headerName: this.translate.instant("Event.Topic"),
      sortable: true, filter: true, width: 250
    },
    {
      field: 'startDate',
      headerName: this.translate.instant("Event.StartDate"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'endDate',
      headerName: this.translate.instant("Event.EndDate"),
      sortable: true, filter: true, width: 200

    },
    {
      field: 'maxParticipants',
      headerName: this.translate.instant("Event.MaxParticipants"),
      sortable: true, filter: true, width: 200
    }
  ];
  detailsColumnDefs: any = [
    {
      field: 'promotionEventSerial',
      headerName: this.translate.instant("Event.PromotionEventSerial"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'promotionCode',
      headerName: this.translate.instant("Event.PromotionCode"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'description',
      headerName: this.translate.instant("Description"),
      sortable: true, filter: true, width: 200

    },
    {
      field: 'descriptionArabic',
      headerName: this.translate.instant("DescriptionAra"),
      sortable: true, filter: true, width: 200
    }
  ];
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
      singleSelection: false,
      idField: 'serial',
      textField: this.translate.instant("Station.StationName"),
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
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

  filteredStations(stationClassCode) {
    return this.stations.filter(st => st.classifficationCode == stationClassCode);
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
    this.title = "edit event"
    this.modalRef = this.modalService.show(this.template);
    this.eventServices.ipromotionEvents = params.data;
    this.selectedStations = [];
    for (var i in this.eventServices.ipromotionEvents.stations) {
      this.selectedStations.push(this.stations.find(st => st.serial == this.eventServices.ipromotionEvents.stations[i]));
    }
    this.cd.detectChanges();
  }
  onItemSelect(item) {
    if (!this.eventServices.ipromotionEvents.stations.includes(item.serial)) {
      this.eventServices.ipromotionEvents.stations.push(item.serial);
    }
  }
  onItemDeselect(item) {
    if (this.eventServices.ipromotionEvents.stations.includes(item.serial)) {
      var index = this.eventServices.ipromotionEvents.stations.findIndex(i => i == item.serial);
      this.eventServices.ipromotionEvents.stations.splice(index, 1);
    }
  }
  onSelectAll(items) {
    for (var i in items) {
      if (!this.eventServices.ipromotionEvents.stations.includes(items[i].serial)) {
        this.eventServices.ipromotionEvents.stations.push(items[i].serial);
      }
    }
  }
  onDeselectAll(items) {
    this.eventServices.ipromotionEvents.stations = [];
  }
  getAll() {
    this.eventServices.getAll().subscribe(res => {
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

  deleteEventDetail() {

    this.eventServices.ipromotionEvents.promotionDetails.splice(this.selectedDetailsIndex, 1);
    this.detailsApi.setRowData(this.eventServices.ipromotionEvents.promotionDetails);
    this.hideDetails();
  }

  onSubmit(StationF, image) {
    console.log(this.selectedStations);
    console.log(this.eventServices.ipromotionEvents);
    var isInvalid = StationF.invalid
    if (!isInvalid) {
      var formData: FormData = new FormData();
      formData.append("serial", this.eventServices.ipromotionEvents.serial.toString());
      formData.append("eventTopic", this.eventServices.ipromotionEvents.eventTopic);
      formData.append("eventDescription", this.eventServices.ipromotionEvents.eventDescription);
      formData.append("startDate", this.eventServices.ipromotionEvents.startDate);
      formData.append("endDate", this.eventServices.ipromotionEvents.endDate);
      formData.append("imagePath", this.eventServices.ipromotionEvents.imagePath);
      if (this.eventServices.ipromotionEvents.stations.length <= 0) {
        alert("يجب تحديد المحطات.");
        return;

      }
      for (var i = 0; i < this.eventServices.ipromotionEvents.stations.length; i++) {
        formData.append(`stations[${i}]`, this.eventServices.ipromotionEvents.stations[i].toString());
      }
      formData.append("maxParticipants", this.eventServices.ipromotionEvents.maxParticipants.toString());
      // if (this.eventServices.ipromotionEvents.promotionDetails.length <= 0) {
      //   alert("يجب ادخال تفاصيل المناسبة.");
      //   return;
      // }
      // for (var i = 0; i < this.eventServices.ipromotionEvents.promotionDetails.length; i++) {
      //   formData.append(`promotionDetails[${i}].description`, this.eventServices.ipromotionEvents.promotionDetails[i].description);
      //   formData.append(`promotionDetails[${i}].descriptionArabic`, this.eventServices.ipromotionEvents.promotionDetails[i].descriptionArabic);
      //   formData.append(`promotionDetails[${i}].promotionCode`, this.eventServices.ipromotionEvents.promotionDetails[i].promotionCode);
      //   formData.append(`promotionDetails[${i}].promotionEventSerial`, this.eventServices.ipromotionEvents.promotionDetails[i].promotionEventSerial.toString());
      //   formData.append(`promotionDetails[${i}].serial`, this.eventServices.ipromotionEvents.promotionDetails[i].serial.toString());
      // }
      formData.append("file.file", image.files[0]);
      formData.append("file.EventCode", this.eventServices.ipromotionEvents.serial.toString());
      if (!this.edit) {
        this.eventServices.insert(formData).subscribe(res => {
          this.getAll();
          this.eventServices.ipromotionEvents = res;
          alert("event saved successfully.");
          // this.reset();
          // this.hide();
        })
      } else {
        this.eventServices.update(formData).subscribe(res => {
          this.getAll();
          alert("event saved successfully.");

        }, err => {
          alert("the max participants  shouldn't be less than current customers.");
        });
      }
    }
  }
  onSubmitDetails(eventDF) {
    var isInvalid = eventDF.invalid
    if (!isInvalid) {
      if (!this.editDetails) {
        this.eventServices.ipromotionEvents.promotionDetails.push(this.eventServices.ipromotionEventsDetails);
        this.detailsApi.setRowData(this.eventServices.ipromotionEvents.promotionDetails);
        this.hideDetails();
      } else {
        this.eventServices.ipromotionEvents.promotionDetails[this.selectedDetailsIndex] = this.eventServices.ipromotionEventsDetails;
        this.detailsApi.setRowData(this.eventServices.ipromotionEvents.promotionDetails);
        this.hideDetails();

      }
    }
  }
  deleteEvent() {
    if (confirm("Are you sure you want to delete Event?")) {
      this.eventServices.delete().subscribe(res => {
        this.getAll();
        this.hide();
      });
    }
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
    // navigator.clipboard.writeText(`https://www.besttopsystems.net:59990/Details/${this.eventServices.ipromotionEvents.serial}`);
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

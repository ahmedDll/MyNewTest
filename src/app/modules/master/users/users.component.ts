import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStation } from 'src/app/_interface/master/istation';
import { StationsService } from 'src/app/_service/master/stations.service';
import { UserService } from 'src/app/_service/master/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = "";
  edit = false;
  modalRef: BsModalRef;
  stations: IStation[] = [];
  columnDefs: any = [

    {
      field: 'userName',
      headerName: 'User Name',
      sortable: true, filter: true, width: 200
    },
    {
      field: 'type',
      headerName: 'User Group Permission',
      sortable: true, filter: true, width: 200

    },
    {
      field: 'email',
      headerName: 'email',
      sortable: true, filter: true, width: 200
    },
    {
      field: 'phone',
      headerName: 'phone',
      sortable: true, filter: true, width: 200
    }
  ];
  rowSelection = 'single';
  api: any;
  confirmedPassword: string;
  @ViewChild('upsertForm') template: TemplateRef<any>;
  constructor(
    public cd: ChangeDetectorRef,
    public stationServices: StationsService,
    public translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.reset();
    this.stationServices.getAll().subscribe(res => {
      this.stations = res;
      this.cd.detectChanges();
    })
  }
  onGridReady(params) {
    this.api = params.api;
    this.api.setRowData([]);
    this.spinner.show();
    this.getAll();
  }

  getAll() {
    this.userService.getall().subscribe(res => {
      this.api.setRowData(res);
      this.cd.detectChanges();
      this.spinner.hide();

    })
  }
  reset() {
    this.userService.iUser = {
      serial: 0,
      userCode: null,
      userName: null,
      stationSerial: null,
      type: null,
      email: null,
      phone: null,
      nationalId: null,
      password: null
    }
  }
  onrowDoubleClicked(params) {
    this.reset();
    this.edit = true;
    this.title = "edit user"
    this.modalRef = this.modalService.show(this.template);
    this.userService.iUser = params.data;
    this.userService.iUser.password = null;
    this.cd.detectChanges();
  }

  show() {
    /*   if(!this._IPrgPer.insert)
      {
        alert('ليس من حقك الاضافه');
        return;
      } */

    this.reset();
    this.edit = false;
    this.title = "add user"
    this.modalRef = this.modalService.show(this.template);

  }

  hide() {
    this.modalRef.hide();
    this.reset();
  }

  onSubmit(userF) {
    var isInvalid = userF.invalid

    if (!isInvalid) {
      if (this.userService.iUser.type == "C" && !this.userService.iUser.stationSerial) {
        alert("يجب اختيار المحطة")
        return;

      }
      // if (! /^[0-9]{11}$/.test(this.userService.iUser.phone)) {
      //   alert("يجب ادخال 11 رقم فقط لرقم الهاتف.");
      //   return;
      // }
      if (this.userService.iUser.stationSerial) {
        this.userService.iUser.stationSerial = +this.userService.iUser.stationSerial;
      }
      if (!this.edit) {
        this.userService.save().subscribe(res => {
          this.getAll();
          this.reset();
          this.hide();
        })
      } else {
        this.userService.update().subscribe(res => {
          this.getAll();
          this.reset();
          this.hide();
        })
      }
    }
  }
  deleteEvent() {
    if (confirm("Are you sure you want to delete User?")) {
      this.userService.delete().subscribe(res => {
        this.getAll();
        this.hide();
      });
    }
  }

  groupChanged() {
    if (this.userService.iUser.type == "A") {
      this.userService.iUser.stationSerial = null;
    }
  }
}

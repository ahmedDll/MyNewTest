import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmpService } from 'src/app/_service/master/emp.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

 
  title = "";
  edit = false;
  modalRef: BsModalRef;
  columnDefs: any = [
    {
      field: 'employeeCode',
      headerName: this.translate.instant("كود الموظف"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'employeeAraName',
      headerName: this.translate.instant("الاسم العربي"),
      sortable: true, filter: true, width: 300
    },
    {
      field: 'employeeEngName',
      headerName: this.translate.instant("الاسم اللاتيني"),
      sortable: true, filter: true, width: 300

    },
  
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
    public empServices: EmpService,
  
    public translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.reset();
  }
  @ViewChild('upsertForm') template: TemplateRef<any>;

  reset() {
    this.empServices.iempClass = {
      employeeCode: 0,
      employeeAraName: null,
      employeeEngName: null,
      notActive:null,
      userId:null,
      dateAndTime:null,
      createDateAndTime:null,
      createUserId:null

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
    this.title = "edit emp class"
    this.modalRef = this.modalService.show(this.template);
    this.empServices.iempClass = params.data;
  }

  getAll() {
    this.empServices.getAll().subscribe(res => {
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
    this.title = "add emp class"
    this.modalRef = this.modalService.show(this.template);

  }
  hide() {
    this.modalRef.hide();
    this.reset();
  }

  onSubmit(empF) {
    var isInvalid = empF.invalid
    if (!isInvalid) {
      if (!this.edit) {
        this.empServices.insert().subscribe(res => {
          this.getAll();
          this.hide();
        })
      } else {
        this.empServices.update().subscribe(res => {
          this.getAll();
        })
      }
    }
  }

  deleteStation() {
    if (confirm("Are you sure you want to delete employee?")) {
      this.empServices.delete(this.empServices.iempClass.employeeCode).subscribe(res => {
        this.getAll();
      });
    }
  }
}

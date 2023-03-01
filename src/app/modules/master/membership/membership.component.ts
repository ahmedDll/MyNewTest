import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImemberShip } from 'src/app/_interface/master/imember-ship';
import { MembershipserviceService } from 'src/app/_service/master/membershipservice.service';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {


  title = "";
  edit = false;
  modalRef: BsModalRef;
  columnDefs: any = [
    {
      field: 'membershipCode',
      headerName: this.translate.instant("كود العضويه"),
      sortable: true, filter: true, width: 200
    },
    {
      field: 'membershipAraName',
      headerName: this.translate.instant("الاسم العربي"),
      sortable: true, filter: true, width: 300
    },
    {
      field: 'membershipEngName',
      headerName: this.translate.instant("الاسم اللاتيني"),
      sortable: true, filter: true, width: 300

    },
    {
      field: 'notActive',
      headerName: this.translate.instant("غير نشط "),
      sortable: true, filter: true, width: 300

    },
  
  ];
  rowData: any;
  api: any;
  rowSelection = 'single';
        constructor(
    private cd: ChangeDetectorRef,
    public MemberShipservices: MembershipserviceService,
  
    public translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.reset();
  }
  @ViewChild('upsertForm') template: TemplateRef<any>;

  reset() {
    this.MemberShipservices.MemberShipModel = {
      membershipCode: 0,
      membershipAraName: null,
      membershipEngName: null,
      notActive:false,
     
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
    this.MemberShipservices.MemberShipModel = params.data;
  }

  getAll() {
    this.MemberShipservices.getAll().subscribe(res => {

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

  onSubmit(MemberShipF) {
    var isInvalid = MemberShipF.invalid
    if (!isInvalid) {
      if (!this.edit) {
        
        this.MemberShipservices.insert().subscribe(res => {
          this.getAll();
          this.hide();
        })
      } else {
        this.MemberShipservices.update().subscribe(res => {
          this.getAll();
        })
      }
    }
  }

  deleteStation() {
    if (confirm("Are you sure you want to delete employee?")) {
      this.MemberShipservices.delete(this.MemberShipservices.MemberShipModel.membershipCode).subscribe(res => {
        this.getAll();
      });
    }
  }
}

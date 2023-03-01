import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { LayoutService } from 'src/app/_eladle/layout';
import { PeriodServ } from 'src/app/_service/General_Accounting/PeriodServ';
import { BranchServ } from 'src/app/_service/master/BranchServ';
type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer';

@Component({
  selector: 'app-change-year',
  templateUrl: './change-year.component.html',
  styleUrls: ['./change-year.component.scss']
})
export class ChangeYearComponent implements OnInit {
  activeTab: Tabs = 'Header';
  model: any;
  getYears:any
  BranchCode:any
  YEars:any
  getBranch:any
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  loginForm = new FormGroup({

    Year:new FormControl(''),
    branchCode: new FormControl(''),

  })
  constructor(private layout: LayoutService,public _PeriodServ:PeriodServ,public _BranchServ:BranchServ,   private cd: ChangeDetectorRef
    ) {
    this._PeriodServ.getYears().subscribe(x=>{
      this.getYears=x
      this.cd.detectChanges()
      this._BranchServ.GetPer().subscribe(x=>{
        this.getBranch=x;
        this.cd.detectChanges()
      })

      console.log(x)
    })
  }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
  }
  ChangeYear(){
   localStorage.setItem('Year',this.YEars)
   alert('تم تغيير السنة المالية ')
   this.cd.detectChanges()
   location.reload()

  }
  ChangeBranchCode(){
    localStorage.setItem('branchCode',this.BranchCode);
    var bran=    this.getBranch.filter(k=>k.branchCode==this.BranchCode);

          localStorage.setItem('BranchName', bran[0].branchAraName );

    alert('تم تغيير الفرع  ')
   
    
    this.cd.detectChanges()
   location.reload() 
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.configLoading = true;
    this.layout.setConfig(this.model);
    location.reload();
  }
}

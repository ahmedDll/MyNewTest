import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  Year:any
  BranchCode:any
  currentDateStr: string = new Date().getFullYear().toString();
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.Year=localStorage.getItem('Year')
    this.BranchCode=localStorage.getItem('branchCode')
    this.footerContainerCssClasses =
      this.layout.getStringCSSClasses('footerContainer');
  }
}

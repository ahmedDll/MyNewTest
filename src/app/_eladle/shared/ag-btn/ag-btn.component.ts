import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-btn',
  templateUrl: './ag-btn.component.html',
  styleUrls: ['./ag-btn.component.scss']
})
export class AgBtnComponent implements OnInit {
  classValue:String;
  btnText:String;
  color:String;

  constructor() { 
  
  }

  ngOnInit(): void {
  } 
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  private params: any;
  agInit(params: any): void {
      this.params = params;
      this.btnClicked =params.clicked;
      this.classValue = params.classValue;
      this.btnText = params.btnText;
      this.color = params.color;    
    }

  btnClicked = ()=> {
    
  }
  btnClickedreject() {
    this.params.clicked();
  }
  btnClickedview() {
    this.params.clicked();
  }

}

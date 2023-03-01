import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.scss']
})
export class CheckboxRendererComponent implements OnInit {

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

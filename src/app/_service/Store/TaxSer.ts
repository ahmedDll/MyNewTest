import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITax } from 'src/app/_interface/Store/Ltax';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class TaxServ {

  public ITaxobj:ITax;

  localUrl=this._Global.baseUrl+'Tax/'

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,) { }

  getall(){
    console.log(this.localUrl + 'Getall');
    return this._http.get<ITax[]>(this.localUrl + 'Getall',this._Global.httpOptions);

  }
  update(){
    return this._http.put(`${this.localUrl}update`,this.ITaxobj,this._Global.httpOptions)
  }
  save(){
    return this._http.post(`${this.localUrl}save`,this.ITaxobj,this._Global.httpOptions)
  }
  delete(code:any):Observable<any>{
    return this._http.delete(`${this.localUrl}delete/`+code,this._Global.httpOptions)
  }
  find(code:any){
    return this._http.get<ITax>(`${this.localUrl}find/`+code,this._Global.httpOptions)
  }
}

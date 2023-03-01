import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICatPrice } from 'src/app/_interface/Store/ICatPrice';

import { ITax } from 'src/app/_interface/Store/Ltax';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class CatPriceser {

  public _ICatPrice:ICatPrice;

  localUrl=this._Global.baseUrl+'CatPrice/'

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,) { }

  getall(){
    console.log(this.localUrl + 'Getall');
    return this._http.get<ICatPrice[]>(this.localUrl + 'Getall',this._Global.httpOptions);

  }
  update(){
    return this._http.put(`${this.localUrl}update`,this._ICatPrice,this._Global.httpOptions)
  }
  save(){
    return this._http.post(`${this.localUrl}save`,this._ICatPrice,this._Global.httpOptions)
  }
  delete(code:any):Observable<any>{
    return this._http.delete(`${this.localUrl}delete/`+code,this._Global.httpOptions)
  }
  find(code:any){
    return this._http.get<ICatPrice>(`${this.localUrl}find/`+code,this._Global.httpOptions)
  }
}

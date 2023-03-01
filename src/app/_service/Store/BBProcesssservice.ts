import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BBProcessD } from 'src/app/_interface/Store/BBProcessD';
import { BBProcesssV } from 'src/app/_interface/Store/BBProcesssV';
import { IStoreGenSetup } from 'src/app/_interface/Store/IStoreGenSetup';
import { IUomConvert } from 'src/app/_interface/Store/IUomConvert';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class BBProcesssservice {

  public IBBProcesssV:BBProcesssV;
  public IBBProcessD:BBProcessD;
  localUrl=this._Global.baseUrl+'BBProcesss/'

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,) { }

  getall(){
    console.log(this.localUrl + 'Getall');
    return this._http.get(this.localUrl + 'Getall',this._Global.httpOptions);

  }
  update(){
    return this._http.put(`${this.localUrl}update`,this.IBBProcesssV,this._Global.httpOptions)
  }
  save(){
    return this._http.post(`${this.localUrl}save`,this.IBBProcesssV,this._Global.httpOptions)
  }
  delete(Bbprocessid):Observable<any>{
    return this._http.delete(`${this.localUrl}delete/`+Bbprocessid,this._Global.httpOptions)
  }
  find(Bbprocessid:any){
    return this._http.get<BBProcesssV>(`${this.localUrl}find/`+Bbprocessid,this._Global.httpOptions)
  }
}

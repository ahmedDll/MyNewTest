import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStoreGenSetup } from 'src/app/_interface/Store/IStoreGenSetup';
import { IUomConvert } from 'src/app/_interface/Store/IUomConvert';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class UomConvertServ {

  public IUmoConvert:IUomConvert;

  localUrl=this._Global.baseUrl+'UomConvert/'

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,) { }

  getall(x){
    console.log(this.localUrl + 'Getall');
    return this._http.get(this.localUrl + 'Getall/'+x,this._Global.httpOptions);

  }
  update(){
    return this._http.put(`${this.localUrl}update`,this.IUmoConvert,this._Global.httpOptions)
  }
  save(){
    return this._http.post(`${this.localUrl}save`,this.IUmoConvert,this._Global.httpOptions)
  }
  delete(code:any,code2):Observable<any>{
    return this._http.delete(`${this.localUrl}delete/`+code+'/'+code2,this._Global.httpOptions)
  }
  find(code:any){
    return this._http.get(`${this.localUrl}find/`+code,this._Global.httpOptions)
  }
}

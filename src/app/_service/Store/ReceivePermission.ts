import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStr } from 'src/app/_interface/IStr';
import { AviableLot } from 'src/app/_interface/Store/AviableLot';
import { ITrxTypee } from 'src/app/_interface/Store/ITrxTypee';

import { ReceivePermissionD } from 'src/app/_interface/Store/ReceivePermissionD';
import { ReceivePermissionView } from 'src/app/_interface/Store/ReceivePermissionView';

import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class ReceivePermission {
  localUrl=this._Global.baseUrl+'ReceivingPermission/'

public ReceivePermissionH:ReceivePermissionView
public _ReceivePermissionD:ReceivePermissionD




  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,

  ) { }
  GetAllQC(x){
    return this._http.get(`${this.localUrl}GetAllQC/`+x,this._Global.httpOptions)

  }
  PostingCost(x,y){
    return this._http.get<IStr>(`${this.localUrl}PostingCost/`+x+'/'+y,this._Global.httpOptions)

  }
 
  Save(){
    return this._http.post<IStr>(`${this.localUrl}Save/`,this.ReceivePermissionH,this._Global.httpOptions)

  }
  getall(x,y,z){
    return this._http.get(`${this.localUrl}getAll/`+x+'/'+y+'/'+z,this._Global.httpOptions)

  }
  GetCustBlance(x){
    return this._http.get(`${this.localUrl}GetCustBlance/`+x,this._Global.httpOptions)

  }
  GetReturnInvoice(type,targetcode,year,BranchCode){
    return this._http.get(`${this.localUrl}GetReturnInvoice/`+type+'/'+targetcode+'/'+year+'/'+BranchCode,this._Global.httpOptions)

  }
  GetReceivingPermissionDetails(x,y,z){
    return this._http.get(`${this.localUrl}GetReceivingPermissionDetails/`+x+'/'+y+'/'+z,this._Global.httpOptions)

  }
  Update(){
    return this._http.put(`${this.localUrl}Update`,this.ReceivePermissionH,this._Global.httpOptions)

  }
  Delete(x,y,x3,x4){
    return this._http.delete<IStr>(`${this.localUrl}Delete/`+x+'/'+y+'/'+x3+'/'+x4,this._Global.httpOptions)

  }
  GetDetail(x,y,z,t){
    return this._http.get<ReceivePermissionView>(`${this.localUrl}GetDetail/`+x+'/'+y+'/'+z+'/'+t,this._Global.httpOptions)

  }

  GetTrxDDetils(x,y,z,t){
    return this._http.get(`${this.localUrl}GetTrxDDetils/`+x+'/'+y+'/'+z+'/'+t,this._Global.httpOptions)

  }

  GetItemBlance(x,y){
    return this._http.get<IStr>(`${this.localUrl}GetItemBlance/`+x+'/'+y,this._Global.httpOptions)

  }
  GetTrxType(x){
    return this._http.get<ITrxTypee>(`${this.localUrl}GetTrxType/`+x,this._Global.httpOptions)

  }
  
    GetAviableLot(x,y){
    return this._http.get<AviableLot[]>(`${this.localUrl}GetAviableLot/`+x+'/'+y,this._Global.httpOptions)

  }


  }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrderH } from 'src/app/_interface/master/PurchaseOrderH';
import { TempPurchaseOrderD } from 'src/app/_interface/master/TempPurchaseOrderD';
import { POList } from 'src/app/_interface/Store/POList';
import { POSOrderHView } from 'src/app/_interface/Store/POSOrderHView';
import { POView } from 'src/app/_interface/Store/POView';
import { PurchasingOrderD } from 'src/app/_interface/Store/PurchasingOrderD';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPosServ {
  localUrl=this._Global.baseUrl+'PO/'
  localUrl2=this._Global.baseUrl+'Receipt/'

  public pOView:POView
  public pOList:POList


  public objPOSOrderHView:POSOrderHView;
 public purchasingOrderD:PurchasingOrderD;
  public purchasingOrderH:PurchaseOrderH;


  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,

  ) { }


  GetallPO(x,y){
    return this._http.get<POSOrderHView[]>(`${this.localUrl}GetallPOClosedHeaders/`+x+'/'+y,this._Global.httpOptions)
  }
  UpdatePO(){
    return this._http.put<PurchaseOrderH>(`${this.localUrl}UpdatePO`,this.pOView,this._Global.httpOptions)
  }
  SavePO(){
    console.log(this.pOView)
    return this._http.post(`${this.localUrl}SavePO`,this.pOView,this._Global.httpOptions)
  }

  PrintOrder(BranchCode,  Year,  Type,  Serial): Observable<Blob>{
    var url = this.localUrl +'PrintOrder/'+BranchCode+'/'+Year+'/'+Type+'/'+Serial;
   

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.get<Blob>(url, { headers : headers,responseType : 
    'blob' as 'json'});
   
  }

  Delete(Serial,year,Branchcode){
    return this._http.delete(`${this.localUrl}Delete/`+Serial+'/'+year+'/'+Branchcode,this._Global.httpOptions)
  }
  GetPODetails(Serial,year,code){
    return this._http.get<POList[]>(`${this.localUrl}GetPODetails/`+Serial+'/'+year+'/'+code,this._Global.httpOptions)
  }
  GetPODetails3(Serial,year,code,type){
    return this._http.get<POList[]>(`${this.localUrl}GetPODetails3/`+Serial+'/'+year+'/'+code+'/'+type,this._Global.httpOptions)
  }
  getall(Serial,year,BranchCode){
    return this._http.get<POList[]>(`${this.localUrl}getall/`+Serial+'/'+year+'/'+BranchCode,this._Global.httpOptions)
  }


  GetAllNotApproved():Observable<any>{
    return this._http.get<TempPurchaseOrderD[]>(`${this.localUrl}GetAllNotApprovedOrder/`,this._Global.httpOptions)
  }

   GetHeaderNote(x)
  {
    return this._http.get<any[]>(`${this.localUrl}GetHeaderNote/`+x,this._Global.httpOptions)
  }
  /* getall(Serial,year){
    console.log('lllllllllll')
    return this._http.get<PurchasingOrderD[]>(`${this.localUrl}getall/`+Serial+'/'+year)

  } */
/*   POHeaders(){
    return this._http.get<PurchaseOrderH[]>(`${this.localUrl2}POHeaders2/`)

  }
  Save(){
    return this._http.post(`${this.localUrl2}Save`,this.PurchasePermisssion)

  }
  UpdateReceipt(){
    return this._http.put(`${this.localUrl2}Update`,this.PurchasePermisssion)

  }
  GetReceiptHeader(){
    return this._http.get(`${this.localUrl2}GetReceiptHeader/`)

  }
  Delete2(Serial,year){
    return this._http.delete(`${this.localUrl2}Delete/`+Serial+'/'+year)

  }
  GetReceiptHeaderFirstAccept(){
    return this._http.get(`${this.localUrl2}GetReceiptHeaderFirstAccept/`)

  }
  GetReceiptHeaderSecondAccept(){
    return this._http.get(`${this.localUrl2}GetReceiptHeaderSecondAccept/`)

  }
  UpdateAccept(Serial,year){
    return this._http.put(`${this.localUrl2}UpdateAccept/`+Serial+'/'+year,this.PurchasePermisssion)

  } */

}

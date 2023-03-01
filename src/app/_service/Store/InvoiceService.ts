import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStr } from 'src/app/_interface/IStr';
import { PurchaseOrderH } from 'src/app/_interface/master/PurchaseOrderH';
import { TempPurchaseOrderD } from 'src/app/_interface/master/TempPurchaseOrderD';
import { Iinvoice } from 'src/app/_interface/Store/Iinvoice';
import { InvoiceView } from 'src/app/_interface/Store/InvoiceView';
import { POList } from 'src/app/_interface/Store/POList';
import { POSOrderHView } from 'src/app/_interface/Store/POSOrderHView';
import { POView } from 'src/app/_interface/Store/POView';
import { PurchasingOrderD } from 'src/app/_interface/Store/PurchasingOrderD';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  localUrl=this._Global.baseUrl+'invoice/'

public Invoice:Iinvoice
public InvoiceList:InvoiceView

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,

  ) { }


  PrintInvoice(x,x1,x2,x3,x4): Observable<Blob>{
    var url = this.localUrl +'PrintInvoice/'+x+'/'+x1+'/'+x2+'/'+x3+'/'+x4;
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.get<Blob>(url, { headers : headers,responseType :
    'blob' as 'json'});

  }
  SendInvoiceEmail(x,x1,x2,x3,x4,x5): Observable<Blob>{
    var url = this.localUrl +'SendInvoiceEmail/'+x+'/'+x1+'/'+x2+'/'+x3+'/'+x4+'/'+x5;
    return this._http.get<any>(url,this._Global.httpOptions);

  }

  GetallPO(x){
    return this._http.get(`${this.localUrl}GetallPOClosedHeaders/`+x,this._Global.httpOptions)
  }
  UpdatePO(){
    return this._http.put<any>(`${this.localUrl}UpdatePO`,this.Invoice,this._Global.httpOptions)
  }
  Save(){
    console.log(this.InvoiceList)
    return this._http.post<IStr>(`${this.localUrl}Save`,this.InvoiceList,this._Global.httpOptions)
  }
  Update(){
    console.log(this.InvoiceList)
    return this._http.put<IStr>(`${this.localUrl}Update`,this.InvoiceList,this._Global.httpOptions)
  }
  Delete(x,y,z,l){
    return this._http.delete(`${this.localUrl}Delete/`+x+'/'+y+'/'+z+'/'+l,this._Global.httpOptions)
  }
  GetallAvTrx(x,y,z,l){
    return this._http.get(`${this.localUrl}GetallAvTrx/`+x+'/'+y+'/'+z+'/'+l,this._Global.httpOptions)
  }
  Find(x,y,z,l){
    return this._http.get<InvoiceView>(`${this.localUrl}Find/`+x+'/'+y+'/'+z+'/'+l,this._Global.httpOptions)

  }
  FindTrxd(x,y,z,l){
    return this._http.get(`${this.localUrl}FindTrxd/`+x+'/'+y+'/'+z+'/'+l,this._Global.httpOptions)

  }
  GetPODetails3(Serial,year,code){
    return this._http.get(`${this.localUrl}GetPODetails3/`+Serial+'/'+year+'/'+code,this._Global.httpOptions)
  }
  getall(Serial,year,BranchCode){
    return this._http.get(`${this.localUrl}getall/`+Serial+'/'+year+'/'+BranchCode,this._Global.httpOptions)
  }


  GetAllNotApproved():Observable<any>{
    return this._http.get(`${this.localUrl}GetAllNotApprovedOrder/`,this._Global.httpOptions)
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

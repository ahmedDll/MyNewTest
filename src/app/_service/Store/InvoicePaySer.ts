import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStr } from 'src/app/_interface/IStr';
import { PurchaseOrderH } from 'src/app/_interface/master/PurchaseOrderH';
import { TempPurchaseOrderD } from 'src/app/_interface/master/TempPurchaseOrderD';
import { Iinvoice } from 'src/app/_interface/Store/Iinvoice';
import { IInvoicePay } from 'src/app/_interface/Store/IInvoicePay';
import { InvoiceView } from 'src/app/_interface/Store/InvoiceView';
import { POList } from 'src/app/_interface/Store/POList';
import { POSOrderHView } from 'src/app/_interface/Store/POSOrderHView';
import { POView } from 'src/app/_interface/Store/POView';
import { PurchasingOrderD } from 'src/app/_interface/Store/PurchasingOrderD';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicePaySer {
  localUrl=this._Global.baseUrl+'InvoicePay/'

public ObjInvoicePay:IInvoicePay


  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,

  ) {
this.ObjInvoicePay={
custCode:0,
diffAmont:0,
invoiceAmont:0,
invoiceBranchCode:0,
invoiceSerial:0,
invoiceType:0,
invoiceYear:0,
name:'',
payAmont:0,
payDate:null,
safeCode:0,
safeSerial:0,
safeTrxTypeCode:0,
safeYear:0,
serial:0,
bankCode:0,
payType:0
}

  }


  Find(x,y,z,t){
    return this._http.get(`${this.localUrl}Find/`+x+'/'+y+'/'+z+'/'+t,this._Global.httpOptions)
  }
  FindInvoice(x,y,t){
    return this._http.get(`${this.localUrl}FindInvoice/`+x+'/'+y+'/'+t,this._Global.httpOptions)
  }
  Getall(x,y,t){
    return this._http.get(`${this.localUrl}Getall/`+x+'/'+y+'/'+t,this._Global.httpOptions)
  }


  GetByCust(x,t){
    return this._http.get(`${this.localUrl}GetByCust/`+x+'/'+t,this._Global.httpOptions)
  }


  Save(){
    return this._http.post<IStr>(`${this.localUrl}Save`,this.ObjInvoicePay,this._Global.httpOptions)
  }
  SaveandPrint(type:Number){
    var model = {"obj":this.ObjInvoicePay,"type":type}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    responseType : 'blob',
    Authorization: `Bearer ` + localStorage.getItem('token')});
    return this._http.post<Blob>(`${this.localUrl}Save`,model,{ headers : headers,responseType :
      'blob' as 'json'})

  }

}

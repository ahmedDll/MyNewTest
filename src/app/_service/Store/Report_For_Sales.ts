import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iitemcard } from 'src/app/_interface/IitemCard';
import { IitemSupp } from 'src/app/_interface/IitemSupp';
import { IStr } from 'src/app/_interface/IStr';
import { IItem } from 'src/app/_interface/master/i-item';
import { ItemSve } from 'src/app/_interface/Store/ItemSve';
import { VItemSales } from 'src/app/_interface/Store/VItemSales';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class Report_For_Sales {
  localUrl=this._Global.baseUrl+'Report_For_Sales/'

public iItem : IItem;
public iItemCard : Iitemcard;
public iItemSupp : IitemSupp;


  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,
  ) { }


  RptTaxdeclaration(): Observable<Blob>{
    var url = this.localUrl +'Taxdeclaration';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }

  RptItemGrainPerItem(): Observable<Blob>{
    var url = this.localUrl +'RptItemGrainPerItem';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  RptStoresBalance(): Observable<Blob>{
    var url = this.localUrl +'RptStoresBalance';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }

  SalesTaxout(): Observable<Blob>{
    var url = this.localUrl +'SalesTaxout';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});
  }
  SalesTaxInvoiceout(): Observable<Blob>{
    var url = this.localUrl +'SalesTaxInvoiceout';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  SalesTaxInvoicein(): Observable<Blob>{
    var url = this.localUrl +'SalesTaxInvoicein';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  SalesTaxin(): Observable<Blob>{
    var url = this.localUrl +'SalesTaxin';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  CustomerFollowUp(): Observable<Blob>{
    var url = this.localUrl +'CustomerFollowUp';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});
  }

  ExcleSalesTaxout(): Observable<Blob>{
    var url = this.localUrl +'ExcleSalesTaxout';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});
  }
  ExcleSalesTaxInvoiceout(): Observable<Blob>{
    var url = this.localUrl +'ExcleSalesTaxInvoiceout';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  Salesrepfollowup(): Observable<Blob>{
    var url = this.localUrl +'Salesrepfollowup';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});
  }
  ExcleSalesTaxInvoicein(): Observable<Blob>{
    var url = this.localUrl +'ExcleSalesTaxInvoicein';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  ExcleSalesTaxin(): Observable<Blob>{
    var url = this.localUrl +'ExcleSalesTaxin';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
}



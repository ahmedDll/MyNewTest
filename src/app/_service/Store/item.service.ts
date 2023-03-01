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
import { IitemCustomers } from '../../_interface/iitem-customers';
import { IItemDailyRpt } from '../../_interface/iitem-daily-rpt';
import { IMostSalesStore } from 'src/app/_interface/imost-sales-store';
import { ISalesInventory } from './isales-inventory';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  localUrl=this._Global.baseUrl+'item/'
  localUrl2=this._Global.baseUrl+'StoreReport/'
  localUrl5=this._Global.baseUrl+'ItemSales/'
public iItem : IItem;
public iItemCard : Iitemcard;
public iItemSupp : IitemSupp;
public iItemDailyRpt :IItemDailyRpt;
public iItemMostSales :IMostSalesStore;
public iItemSalesInventory :ISalesInventory;
public iItemCust : IitemCustomers;
public _VItemSales : VItemSales[];
public objs:ItemSve;

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,
  ) { }
  getall(){
    return this._http.get<IItem[]>(`${this.localUrl}getall`,this._Global.httpOptions)
  }
  ShowMostSalesStoreReport(){
    return this._http.post<any>(`${this.localUrl2}RptMostStoreSales`,this.iItemMostSales,this._Global.httpOptions)
  }
  RptSalesInventory(){
    return this._http.post<any>(`${this.localUrl2}RptSalesInventory`,this.iItemSalesInventory,this._Global.httpOptions)
  }
  ShowItemDailyReport(){
    return this._http.post<any>(`${this.localUrl2}RptDailyNoteBook`,this.iItemDailyRpt,this._Global.httpOptions)
  }
  ShowItemGeneralLedgerReport(){
    return this._http.post<any>(`${this.localUrl2}RptGeneralLedger`,this.iItemDailyRpt,this._Global.httpOptions)
  }
  ShowJournalStatusReport(){
    return this._http.post<any>(`${this.localUrl2}RptAllSubldgCode`,this.iItemDailyRpt,this._Global.httpOptions)
  }
  update(){
    return this._http.put<any>(`${this.localUrl}update`,this.objs,this._Global.httpOptions)
  }
  save(){
    console.log(this.iItem)
    return this._http.post<IStr>(`${this.localUrl}save`,this.objs,this._Global.httpOptions)
  }
  delete(code:any){
    return this._http.delete(`${this.localUrl}delete/`+code,this._Global.httpOptions)
  }
  find(code:any){
    return this._http.get<IItem>(`${this.localUrl}find/`+code,this._Global.httpOptions)
  }
  FindPriceperCust(code:any,Code2:any){
    return this._http.get<VItemSales>(`${this.localUrl}FindPriceperCust/`+code+'/'+Code2,this._Global.httpOptions)
  }
  FindCost(code:any){
    return this._http.get<IItem>(`${this.localUrl}FindCost/`+code,this._Global.httpOptions)
  }
  GetByClassification(x){
    return this._http.get<IItem[]>(`${this.localUrl}GetByClassification/`+x,this._Global.httpOptions)

  }
  ShowItemCard(){
    return this._http.post<any>(`${this.localUrl2}ItemCard`,this.iItemCard,this._Global.httpOptions)
  }
  ShowItemSupp(){
    return this._http.post<any>(`${this.localUrl2}ItemSupp`,this.iItemSupp,this._Global.httpOptions)
  }
  custaccount(){
    return this._http.post<any>(`${this.localUrl2}custaccount`,this.iItemSupp,this._Global.httpOptions)
  }
  ItemCardPdf(): Observable<Blob>{
    var url = this.localUrl2 +'ItemCardPdf';
    var authorization = 'Bearer '+sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemCard, { headers : headers,responseType :
    'blob' as 'json'});

  }
  custaccountPdf(): Observable<Blob>{
    var url = this.localUrl2 +'custaccountPdf';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  custBalanceaccountPdf(): Observable<Blob>{
    var url = this.localUrl2 +'CustomerBalancePdf';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  SuppliersBalancePdf(): Observable<Blob>{
    var url = this.localUrl2 +'SuppliersBalancePdf';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  RptSalesPerRep(): Observable<Blob>{
    var url = this.localUrl2 +'RptSalesPerRep';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  RptPurchaseReport(): Observable<Blob>{
    var url = this.localUrl2 +'PurchaseReport';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  RptSalesReport(): Observable<Blob>{
    var url = this.localUrl2 +'SalesReport';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  Rptdemandlimit(): Observable<Blob>{
    var url = this.localUrl2 +'Rptdemandlimit';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  CustomerBalancesaccountPdf(): Observable<Blob>{
    var url = this.localUrl2 +'CustomerBalancePdf';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  SuppliersaccountPdf(): Observable<Blob>{
    var url = this.localUrl2 +'SuppliersaccountPdf';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     responseType : 'blob',
     Authorization: `Bearer ` + localStorage.getItem('token')});

    return this._http.post<Blob>(url,this.iItemSupp, { headers : headers,responseType :
    'blob' as 'json'});

  }
  Suppliersaccount(){
    return this._http.post<any>(`${this.localUrl2}Suppliersaccount`,this.iItemSupp,this._Global.httpOptions)
  }
  findItemSales(code:any){
    return this._http.get<VItemSales>(`${this.localUrl5}find/`+code,this._Global.httpOptions)
  }
  findAllItemSales(code:any){
    return this._http.get<VItemSales[]>(`${this.localUrl5}FindAll/`+code,this._Global.httpOptions)
  }
  saveSales(){

    return this._http.post(`${this.localUrl5}save`,this._VItemSales,this._Global.httpOptions)
  }
}

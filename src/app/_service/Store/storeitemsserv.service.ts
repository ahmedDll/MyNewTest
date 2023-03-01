import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { Istoreitem } from 'src/app/_interface/Store/istoreitem';
@Injectable({
  providedIn: 'root'
})
export class StoreitemsservService {

  localUrl=this._GlobalService.baseUrl+'ItemStore/';
  public Istoreitem : Istoreitem;
  public IstoreitemList : Istoreitem[];


  constructor(private _GlobalService:GlobalService , private _http :HttpClient ) {
    this.reset();
   }

  reset() {
      this.Istoreitem={
        itemCode  : 0 ,
        itemName  : '' ,
        storeCode : 0 ,
        storeName : '' ,
        activeYN  : true
      }
    }

    Getall(storeId:number){
    console.log(`${this.localUrl}Getall/`+storeId);
    return this._http.get<Istoreitem>(`${this.localUrl}Getall/`+storeId,this._GlobalService.httpOptions);
  }

  save(){
   return this._http.put<Istoreitem>(`${this.localUrl}update`,this.IstoreitemList,this._GlobalService.httpOptions);
  }

}

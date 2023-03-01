import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IitemsClassification } from 'src/app/_interface/Store/iitems-classification';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsClassificationService {

  public IitemsClassification:IitemsClassification;

  localUrl=this._Global.baseUrl+'itemsClassification/'

  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,) { }

  getall(){
    console.log(this.localUrl + 'Getall');
    return this._http.get<IitemsClassification[]>(this.localUrl + 'Getall',this._Global.httpOptions);

  }
  update(){
    return this._http.put<IitemsClassification>(`${this.localUrl}update`,this.IitemsClassification,this._Global.httpOptions)
  }
  save(){
    return this._http.post<IitemsClassification>(`${this.localUrl}save`,this.IitemsClassification,this._Global.httpOptions)
  }
  delete(code:any):Observable<any>{
    return this._http.delete(`${this.localUrl}delete/`+code,this._Global.httpOptions)
  }
  find(code:any){
    return this._http.get<IitemsClassification[]>(`${this.localUrl}find/`+code,this._Global.httpOptions)
  }
}

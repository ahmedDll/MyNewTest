import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsubCode } from 'src/app/_interface/master/IsubCode';
import { IsubCodeD } from 'src/app/_interface/master/IsubCodeD';
import { GlobalService } from '../global.service';
@Injectable({
    providedIn: 'root'
  })
  export class SubCodeServ {


  localUrl=this._Global.baseUrl+ 'MainSubGroup/'
  public ISubCode:IsubCode
  public ISubCodeD:IsubCodeD
  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,
    
  ) { }
  Find(x){
    return this._http.get<IsubCodeD[]>(`${this.localUrl}FindSub`+'/'+x)

  }
  Update(){
    return this._http.put(`${this.localUrl}Update`,this.ISubCode)
  }

  
  Save(){
    return this._http.post(`${this.localUrl}Save`,this.ISubCode)

  }
  Getall(){
    return this._http.get<IsubCode[]>(`${this.localUrl}Getall`)

  }
  DeleteSub(x,y){
    return this._http.delete(`${this.localUrl}DeleteSub/`+x+'/'+y)

  }
  DeleteMain(x){
    return this._http.delete(`${this.localUrl}DeleteMain/`+x)

  }

  }
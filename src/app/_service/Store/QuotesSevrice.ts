import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesSevrice {
  
  localUrl2=this._Global.baseUrl+'UploadDocuments/'


  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,
    
  ) { }


 
  GetAllDocument(Serial,year,type,BranchCode,trxtype, trxPeriod=0){
    return this._http.get(`${this.localUrl2}GetAllDocument/`+Serial+'/'+year+'/'+type+'/'+BranchCode+'/'+trxtype+'/'+trxPeriod,this._Global.httpOptions)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranchPermission } from 'src/app/_interface/security/IBranchPerPermission';
import { IProgram } from 'src/app/_interface/security/iprogram';
import { GlobalService } from '../global.service';
@Injectable({
  providedIn: 'root'
})
export class BranchPermissionServ {


  localUrl = this._GlobalService.baseUrl+'BranchesPer/';
  IBranchPermission:IBranchPermission
public IBranchPermissionList :IBranchPermission[]
  constructor(
    private http: HttpClient,
    private _GlobalService: GlobalService
  ) { }

  GetallView(userid):Observable<any>{
      console.log(this.localUrl+'GetallView/'+userid)
      return this.http.get(this.localUrl+'GetallView/'+userid ,this._GlobalService.httpOptions)
    }

    Save(list):Observable<any>{
      return this.http.post(this.localUrl+'Save',list,this._GlobalService.httpOptions)
    }
}

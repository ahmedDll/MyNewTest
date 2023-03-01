import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProgram } from 'src/app/_interface/security/iprogram';
import { GlobalService } from '../global.service';
@Injectable({
  providedIn: 'root'
})
export class UserpermissionService {


  localUrl = this._GlobalService.baseUrl+'PrgPer/';
  GroupProgram:IProgram
  public GroupProgramList : IProgram[];

  constructor(
    private http: HttpClient,
    private _GlobalService: GlobalService
  ) { }

    showGroupPermission(userid):Observable<any>{
      console.log(this.localUrl+'showGroupPermission/'+userid)
      return this.http.get(this.localUrl+'showGroupPermission/'+userid ,this._GlobalService.httpOptions)
    }

    SaveGroupPermission(listx):Observable<any>{
      return this.http.post(this.localUrl+'SaveGroupPermission',listx,this._GlobalService.httpOptions)
    }
}

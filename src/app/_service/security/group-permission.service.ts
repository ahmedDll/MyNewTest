import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IgroupPermission } from 'src/app/_interface/security/igroup-permission';
import { IPrgPer } from 'src/app/_interface/security/IPrgPer';
import { Ipro2 } from 'src/app/_interface/security/Ipro2';
import { IProgram } from 'src/app/_interface/security/iprogram';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class GroupPermissionService {

  public IgroupPermission: IgroupPermission;

  constructor(
    private http: HttpClient ,
    private master: GlobalService
    ) { }

  localUrl = this.master.baseUrl + 'Programs/';

  getuserpermission(groupId):Observable<any>
  {
    return this.http.get<IgroupPermission[]>(this.localUrl + 'GetProgramsDetailByGroupId' + '/' + groupId);
  }
  GetProgpermissionperuser(ProgID,id):Observable<any>
  {
    return this.http.get<IPrgPer>(this.localUrl + 'GetProgpermissionperuser' + '/' + ProgID+'/'+id,this.master.httpOptions);
  }
  GetProg(ProgID):Observable<any>
  {
    return this.http.get<Ipro2>(this.localUrl + 'GetProg' + '/' + ProgID,this.master.httpOptions);
  }
}

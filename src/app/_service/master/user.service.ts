import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/_interface/master/i-user';
import { IUserSave } from 'src/app/_interface/security/UserSave';
import { GlobalService } from '../global.service';
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IProgram } from 'src/app/_interface/security/iprogram';
import { Vuser } from 'src/app/_interface/security/Vuser';
import { Idashboard } from 'src/app/_interface/Store/Idashboard';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public iUser: IUser;
  public Vuser: Vuser;

  public IProgram: IProgram;
  public currentUser: any = new BehaviorSubject(null);
  public isAuthed = false;

  localUrl = this._Global.baseUrl + 'user/';
  localUrl1 = this._Global.baseUrl + 'Auth/';
  localUrl2 = this._Global.baseUrl + 'Report_For_Sales/';
  _Idashboard: Idashboard;
  constructor(
    private _http: HttpClient,
    private _Global: GlobalService,
    private _Router: Router,
  ) {

    this._Idashboard = {
      demandlimit: 0,
      pinvoice: 0,
      sinvoice: 0,
      slateCsales: 0,
      sNotCsales: 0
    }
  }

  getall() {
    return this._http.get<any[]>(`${this.localUrl}getall`, this._Global.httpOptions)
  }
  Dashboard(x) {
    return this._http.get<Idashboard>(`${this.localUrl2}Dashboard/` + x, this._Global.httpOptions)
  }
  Dashboard2(x, y) {
    return this._http.get<any[]>(`${this.localUrl2}Dashboard2/` + x + '/' + y, this._Global.httpOptions)
  }
  update() {
    return this._http.put<any>(`${this.localUrl}update`, this.iUser, this._Global.httpOptions)
  }
  save() {
    return this._http.post<any>(`${this.localUrl}Insert`, this.iUser, this._Global.httpOptions)
  }
  LoginP() {
    return this._http.post<any>(`${this._Global.baseUrl}User/Login`, this.Vuser)
  }
  delete() {
    return this._http.delete(`${this.localUrl}delete`, { body: this.iUser })
  }
  find(code: any): Observable<any> {
    return this._http.get<any[]>(`${this.localUrl}find/` + code, this._Global.httpOptions)
  }
  login(User: any, Pass: any): Observable<any> {
    return this._http.get<IUserSave>(`${this.localUrl1}loginuser/` + User + "/" + Pass)
  }
  GetPrograms(User: any, lang): Observable<any> {
    return this._http.get<IProgram[]>(`${this.localUrl}GetPrograms/` + User + '/' + lang, this._Global.httpOptions)
  }
  logOut() {
    this.currentUser.next(null);
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("userName")
    localStorage.removeItem("email")
    this._Router.navigate(['/auth/login'])
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem('token');
    this.currentUser.next(jwt_decode(token));
    //  console.log("currentUser", this.currentUser)
  }
}

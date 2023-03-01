import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImemberShip } from 'src/app/_interface/master/imember-ship';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipserviceService {

  MemberShipModel: ImemberShip;
  //url = this.globalServ.baseUrl + "StationClassification"
  url = "http://localhost:62960/Api/M100_memberships";
  constructor(
    private http: HttpClient,
    private globalServ: GlobalService) { }

  insert() {
    return this.http.post<ImemberShip>(`${this.url}/save`, this.MemberShipModel);
  }

  getAll() {
    return this.http.get<ImemberShip[]>(`${this.url}/Get`);
  }
  getOneMember(id:number) {
    return this.http.get<ImemberShip>(`${this.url}/Get/${id}`);
  }

  update() {
    return this.http.put<ImemberShip>(`${this.url}/update`, this.MemberShipModel);
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}

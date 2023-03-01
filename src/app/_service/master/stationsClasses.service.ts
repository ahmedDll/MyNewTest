import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStationClass } from 'src/app/_interface/master/iStationClass';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class StationsClassesService {
  istationClass: IStationClass;
  url = this.globalServ.baseUrl + "StationClassification"
  constructor(
    private http: HttpClient,
    private globalServ: GlobalService) { }

  insert() {
    return this.http.post<IStationClass>(`${this.url}/Insert`, this.istationClass);
  }

  getAll() {
    return this.http.get<IStationClass[]>(`${this.url}/GetAll`);
  }

  update() {
    return this.http.put<IStationClass>(`${this.url}/Update`, this.istationClass);
  }
  delete() {
    return this.http.delete(`${this.url}/Delete`, { body: this.istationClass });
  }
}

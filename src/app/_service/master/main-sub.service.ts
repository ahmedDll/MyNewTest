import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMain } from 'src/app/_eladle/layout/core/default-layout.config';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class MainSubService {

  iMain: IMain;
  //url = this.globalServ.baseUrl + "StationClassification"
  url = "http://localhost:62960/Api/M100_mainBodies";
  constructor(
    private http: HttpClient,
    private globalServ: GlobalService) { }

  insert() {
    return this.http.post<IMain>(`${this.url}/save`, this.iMain);
  }

  getAll() {
    return this.http.get<IMain[]>(`${this.url}/Get`);
  }
  getEmp(id:number) {
    return this.http.get<IMain[]>(`${this.url}/Get/${id}`);
  }

  update() {
    return this.http.put<IMain>(`${this.url}/update`, this.iMain);
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}

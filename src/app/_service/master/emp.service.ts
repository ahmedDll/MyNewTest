import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from 'src/app/_interface/master/iemployee';

import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  iempClass: IEmployee;
  //url = this.globalServ.baseUrl + "StationClassification"
  url = "http://localhost:62960/Api/M100_employees";
  constructor(
    private http: HttpClient,
    private globalServ: GlobalService) { }

  insert() {
    return this.http.post<IEmployee>(`${this.url}/save`, this.iempClass);
  }

  getAll() {
    return this.http.get<IEmployee[]>(`${this.url}/Get`);
  }
  getEmp(id:number) {
    return this.http.get<IEmployee[]>(`${this.url}/Get/${id}`);
  }

  update() {
    return this.http.put<IEmployee>(`${this.url}/update`, this.iempClass);
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}

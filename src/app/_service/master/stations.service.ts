import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStation } from 'src/app/_interface/master/istation';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  istation: IStation;
  url = this.globalServ.baseUrl + "Station"
  constructor(
    private http: HttpClient,
    private globalServ: GlobalService) { }

  insert() {
    return this.http.post<IStation>(`${this.url}/Insert`, this.istation);
  }

  getAll() {
    return this.http.get<IStation[]>(`${this.url}/GetAll`);
  }

  update() {
    return this.http.put<IStation>(`${this.url}/Update`, this.istation);
  }
  delete() {
    return this.http.delete(`${this.url}/Delete`, { body: this.istation });
  }
}

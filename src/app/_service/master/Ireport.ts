import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStation } from 'src/app/_interface/master/istation';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class IreportService {

  url = this.globalServ.baseUrl + "Customer"
  constructor(
    private http: HttpClient,
    private globalServ: GlobalService) { }


  getAll() {
    return this.http.get<any[]>(`${this.url}/GetAll`);
  }

}

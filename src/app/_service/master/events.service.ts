import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { IPromotionEvents } from 'src/app/_interface/master/ipromotionEvents';
import { IEventDetails } from 'src/app/_interface/master/ieventDetails';
import { ITransactionReport } from 'src/app/_interface/master/iTransactionReport';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  ipromotionEvents: IPromotionEvents;
  ipromotionEventsDetails: IEventDetails;
  itransactionReport: ITransactionReport;
  url = this.globalServ.baseUrl + "PromotionEvent"
  url2 = this.globalServ.baseUrl + "Customer"
  constructor(private http: HttpClient,
    private globalServ: GlobalService) { }
  insert(formData) {
    return this.http.post<IPromotionEvents>(`${this.url}/Insert`, formData);
  }

  getAll() {
    return this.http.get<IPromotionEvents[]>(`${this.url}/GetAllDetails`);
  }

  update(formData) {
    return this.http.put<IPromotionEvents>(`${this.url}/Update`, formData);
  }
  delete() {
    return this.http.delete(`${this.url}/Delete`, { body: this.ipromotionEvents });
  }
  promotionReport(start, end, eventCode) {
    return this.http.get(`${this.url}/PromotionReport/${start}/${end}/${eventCode}`);
  }
  transactionReport() {
    return this.http.post(`${this.url2}/TransactionReport`, this.itransactionReport);
  }
}

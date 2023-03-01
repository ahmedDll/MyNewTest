import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import configJson from '../../assets/config.json';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  //  baseUrl = "https://www.besttopsystems.net:449/api/";
  // baseUrl= "http://148.72.246.165:7073/api/"
  // baseUrl= "http://72.167.39.64:8081/api/"
  //baseUrl= "https://alhilalmedlabs.com:460/api/"
  //baseUrl= "http://72.167.39.64:8081/api/"
  //baseUrl= "https://alhilalmedlabs.com:460/api/"
  //baseUrl= "http://72.167.39.64:8081/api/"
  baseUrl = "https://www.besttopsystems.net:59991/api/"
//  baseUrl= "http://localhost:62976/api/"
  public httpOptions = {
    headers: new HttpHeaders(
      {
        Authorization: `Bearer ` + localStorage.getItem('token'),

      }
    )
  };//
  constructor(public http: HttpClient) {

    console.log(configJson.Url);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postData(userData: object): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {};
    data["data"] = userData["data"];
    data["action"] = "switch"; 
    return this.http.post(`/admin`, data, { headers: headers });

  }


  getData(): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {};
    data["action"] = "get"; 
    return this.http.post(`/admin`, data, { headers: headers });

  }
  processData(userData): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {};
    data["data"] = userData;
    data["action"] = "process"; 
    console.log(data);
    return this.http.post(`/admin`, data, { headers: headers });

  }

}

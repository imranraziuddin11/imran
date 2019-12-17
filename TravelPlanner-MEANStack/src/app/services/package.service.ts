import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }


  getData(): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {};
    data["action"] = "get"; 
    return this.http.post(`/package`, data, { headers: headers });

  }

  bookPackage(myPackage: object, userID: string): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {};
    data["package"] = myPackage;
    data["booking_user_id"] = userID;
    data["action"] = "book"; 
    console.log(data);
    return this.http.post(`/package`, data, { headers: headers });

  }


  removePackage(package_id: string): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {};
    data["package_id"] = package_id;
    data["action"] = "remove"; 
    console.log(data);
    return this.http.post(`/package`, data, { headers: headers });
  }
  

}
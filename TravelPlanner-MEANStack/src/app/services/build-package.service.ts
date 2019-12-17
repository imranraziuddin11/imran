import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildPackageService {
  

  constructor(private http: HttpClient) { }

  
  postData(myPackage: object): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    return this.http.post(`/package`, myPackage, { headers: headers });

  }


}

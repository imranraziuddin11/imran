import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsearchService {
  

  constructor(private http: HttpClient) { }

  
  getData(return_date: string, depart_date: string, destination: string,origin: string ): Observable<Object> {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json');
    var data = {
      "return_date": return_date,
      "depart_date": depart_date,
      "destination":destination,
      "origin": origin
    };
    console.log(data);
    return this.http.post(`/flightSearch`, data, { headers: headers });

  }


}

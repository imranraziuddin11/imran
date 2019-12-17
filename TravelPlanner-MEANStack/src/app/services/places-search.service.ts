import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesSearchService {  
  constructor(private http:HttpClient) { }

  getData(query:string):Observable<Object> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
     var data = {
       "query": query
     };
    return this.http.post(`/searchAPI`, JSON.stringify(data), {headers: headers});
    
  }


}

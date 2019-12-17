import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  dataObj: object;

  constructor() { }

  getData():Object{ 
    return this.dataObj;
  }

  updateData(data: object): void{
    this.dataObj = data
  }
}

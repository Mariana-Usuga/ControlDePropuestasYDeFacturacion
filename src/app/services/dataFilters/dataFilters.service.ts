import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface data {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class DataFiltersService {

  company: Array<String> = []
  customer: Array<String> = []
  customerReference: Array<String> = []
  yearP: Array<String> = ['2022', '2021', '2009']
  monthP: Array<String> = []
  typeOfService: Array<String> = []
  stateP: Array<String> = []
  currency: Array<String> = ['dolares']

  company$: Subject<data[]>
  
  constructor(private http: HttpClient) {
    this.company = []
    this.company$ = new Subject()
  }

  getAllCompany(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/data/getAllCompany')
  }

  getAllCustomer(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/data/getAllCustomer')
  }

  getAllCustomerReference(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/data/getAllCustomerReference')
  }
 
  getAllState(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/data/getAllState')
  }

  getAllTypeOfService(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/data/getAllTypeOfService')
  }

}

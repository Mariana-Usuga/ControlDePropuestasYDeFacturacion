import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface data {
  name: string
}
const URL = 'http://119.8.153.220:8080/proposalControlBackend-0.0.1'
//const URL = 'http://localhost:8080'
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
    return this.http.get(`${URL}/data/getAllCompany`)
  }

  getAllCustomer(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get(`${URL}/data/getAllCustomer`)
  }

  getAllCustomerReference(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get(`${URL}/data/getAllCustomerReference`)
  }

  getAllState(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get(`${URL}/data/getAllState`)
  }

  getAllTypeOfService(): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get(`${URL}/data/getAllTypeOfService`)
  }

  addCustomer(customer: any) {
    console.log('proposal', customer);
    return this.http.post(`${URL}/data/customer`, customer)
  }

  addCustomerReference(customer: any){
    console.log('proposal', customer);
    return this.http.post(`${URL}/data/customerReference`, customer)
  }

}

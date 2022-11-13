import { Injectable } from '@angular/core';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessProposalService {

  objectfiltros: commercialProposal = {
    company: null,
    customer: "",
  customerReference: null,
  yearP: null,
  monthP: null,
  servicioConcept: null,
  typeOfService: null,
  currency: null,
  stateP: null,
  baseAmount: null,
  totalAmount: null,
  warranty: null,
  version: null,
  dateVersion: null,
  proposalId: null,
  folder: null
  }
  objectfiltros$: Subject<commercialProposal>

  constructor(private http: HttpClient) {
    this.objectfiltros$ = new Subject()
  }

  putStateOfProposal(proposal: commercialProposal): Observable<any>{
    console.log('filter', proposal)
    return this.http.put('http://localhost:8080/proposal', proposal)
  }

  getBusinessProposal(filter: commercialProposal): Observable<any> {
    console.log('filter', filter)
    return this.http.post('http://localhost:8080/proposal/filter', filter)
  }

  addNewProposal(proposal: commercialProposal): Observable<any>{
    console.log('proposal', proposal);
    return this.http.post('http://localhost:8080/proposal', proposal)
  }

  getByVersionProposal(idProposal: number): Observable<any>{
    console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/proposal/getProposalByIdProposal/'+idProposal)
  }

  putProposal(data: commercialProposal): Observable<any>{
    console.log('entra en servicio PUT', data)
    return this.http.post('http://localhost:8080/proposal', data)
  }

  uploadFile(file: any): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append('upload', file);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    console.log('options', options);
    console.log('formData', formData)

    const req = new HttpRequest('POST', 'http://localhost:8080/proposal/upload',
    formData, options);
    return this.http.request(req);
  }

  /*upload(file: any):Observable<any> {
    console.log('file', file)
    const formData = new FormData();
    formData.append("file", file, file.name);
    console.log('formData', formData)
    return this.http.post('http://localhost:8080/proposal/upload', formData)
}*/

  deleteProposal(id: number): Observable<any>{

    return this.http.delete('http://localhost:8080/proposal/'+ id)
  }

  addFiltros(campos: commercialProposal){
    console.log('campos', campos)
    this.objectfiltros = campos
    this.objectfiltros$.next(this.objectfiltros)
  }

  getFiltros(): Observable<commercialProposal>{
    return this.objectfiltros$.asObservable()
  }

}

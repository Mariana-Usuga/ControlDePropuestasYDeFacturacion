import { Injectable } from '@angular/core';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { proposalContact } from '../models/interfaces/ProposalContact.interface';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spredsheetml-sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class BusinessProposalService {

  objectfiltros: commercialProposal = {
    code: null,
    company: null,
    customer: "",
  customerReference: null,
  servicioConcept: null,
  typeOfService: null,
  currency: null,
  stateP: null,
  baseAmount: null,
  totalAmount: null,
  version: null,
  dateVersion: null,
  proposalId: null,
  folder: null,
  wayToPay: null,
  wayToPayDays: null,
  creatorUser: null,
  }

  dates: any = {
    start: null,
    end: null,
  }

  objectfiltros$: Subject<commercialProposal>
  dates$: Subject<any>


  constructor(private http: HttpClient) {
    this.objectfiltros$ = new Subject()
    this.dates$ = new Subject()
  }

  exportToExcel(json:any[], excelFileName: string): void{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer:any, fileName:string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_'+ 'proposal' + EXCEL_EXT);
  }

  putStateOfProposal(proposal: any): Observable<any>{
    console.log('filter', proposal)
    return this.http.put('http://localhost:8080/proposal', proposal)
  }

  getBusinessProposal(filter: commercialProposal, dates: any): Observable<any> {
    console.log('filter', filter, 'dates')
    console.log('dates in service', dates)

    const u = `http://localhost:8080/proposal/filter?startDate=${dates.start}&endDate=${dates.end}`
    console.log('u', u)
    return this.http.post(u, filter);
  }

  addNewProposal(proposal: any): Observable<any>{
    console.log('proposal', proposal);
    return this.http.post('http://localhost:8080/proposal', proposal)
  }

  getByVersionProposal(idProposal: number): Observable<any>{
    console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/proposalVersion/getProposalByIdProposal/'+idProposal)
  }

  putProposal(data: any): Observable<any>{
    console.log('entra en servicio PUT', data)
    return this.http.put('http://localhost:8080/proposal', data)
  }
  addNewVersion(proposal: object): Observable<any>{
    console.log('proposal', proposal);
    return this.http.post('http://localhost:8080/proposal/version', proposal)
  }

  addApprovedProposal(proposal: object): Observable<any>{
    console.log('proposal', proposal);
    return this.http.post('http://localhost:8080/approvedProposal', proposal)
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

  addNewProposalContact(contact: any) {
    return this.http.post('http://localhost:8080/contact', contact)
  }

  getContact(id: number): Observable<any>{
    return this.http.get('http://localhost:8080/contact/'+ id)
  }

  putContact(contact: proposalContact): Observable<any>{
    return this.http.put('http://localhost:8080/contact', contact )
  }

  deleteProposal(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/proposal/'+ id)
  }

  addHito(id: number, data: any){
    return this.http.post('http://localhost:8080/hito/'+ id, data)
  }

  addFiltros(campos: commercialProposal){
    console.log('campos', campos)
    this.objectfiltros = campos
    this.objectfiltros$.next(this.objectfiltros)
  }

  addFiltrosDate(dates: any){
    console.log('dates', dates)
    this.dates = dates
    this.dates$.next(dates)
  }

  getFiltros(): Observable<commercialProposal>{
    return this.objectfiltros$.asObservable()
  }

  getFiltrosDate(): Observable<any>{
    return this.dates$.asObservable()
  }

}

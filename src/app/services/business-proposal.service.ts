import { Injectable } from '@angular/core';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';
import { Observable, Subject, toArray } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { proposalContact } from '../models/interfaces/ProposalContact.interface';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spredsheetml-sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

//const URL = 'http://119.8.153.220:8080/proposalControlBackend-0.0.1'
const URL = 'http://localhost:8080'
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

  proposals: any[] = []; 
  //proposal: any = {
    //start: null,
    //end: null,

  objectfiltros$: Subject<commercialProposal>
  dates$: Subject<any>
  proposals$: Subject<any>

  constructor(private http: HttpClient) {
    this.objectfiltros$ = new Subject()
    this.dates$ = new Subject()
    this.proposals$ = new Subject<any[]>()
  }

  exportToExcel(json:any[], excelFileName: string): void{
    console.log('JSON ', json)
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
    FileSaver.saveAs(data, fileName + '_' + EXCEL_EXT);
  }

  putStateOfProposal(proposal: any): Observable<any>{
    //console.log('filter', proposal)
    return this.http.put(`${URL}/proposal`, proposal)
  }

  getAllProposal(){
    return this.http.get(`${URL}/proposal`)
  }


  addNewProposal(proposal: any): Observable<any>{
    //console.log('proposal', proposal);
    return this.http.post(`${URL}/proposal`, proposal)
  }

  getByVersionProposal(idProposal: number): Observable<any>{
    //console.log('proposal', idProposal);
    return this.http.get(`${URL}/proposalVersion/getProposalByIdProposal/`+idProposal)
  }

  putProposal(data: any): Observable<any>{
    //console.log('entra en servicio PUT', data)
    return this.http.put(`${URL}/proposal`, data)
  }
  addNewVersion(proposal: object): Observable<any>{
    //console.log('proposal', proposal);
    return this.http.post(`${URL}/proposal/version`, proposal)
  }

  addApprovedProposal(proposal: object): Observable<any>{
    console.log('proposal', proposal);
    return this.http.post(`${URL}/approvedProposal`, proposal)
  }

  uploadFile(id: number, file: any): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append('upload', file);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    console.log('options', options);
    console.log('formData', formData)

    const req = new HttpRequest('POST', `${URL}/proposal/${id}/upload`,
    formData, options);
    return this.http.request(req);
  }

  addNewProposalContact(contact: any) {
    return this.http.post(`${URL}/contact`, contact)
  }

  getContact(id: number): Observable<any>{
    return this.http.get(`${URL}/contact/`+ id)
  }

  putContact(contact: proposalContact): Observable<any>{
    return this.http.put(`${URL}/contact`, contact )
  }

  deleteProposal(id: number): Observable<any>{
    return this.http.delete(`${URL}/proposal/`+ id)
  }

  deleteProposalVersion(code: string): Observable<any>{
    return this.http.delete(`${URL}/proposalVersion?code=${code}`)
  }

  addHito(id: number, data: any){
    return this.http.post(`${URL}/hito/`+ id, data)
  }

  getCurrency(){
    return this.http.get(`${URL}/hito/`)
  }

  getFilesProposal(code: string){
    return this.http.get(`${URL}/proposal/files/${code}`)
  }

  addFiltros(campos: commercialProposal){
    //console.log('ADD FILTROS', campos)
    this.objectfiltros = campos
    this.objectfiltros$.next(this.objectfiltros)
  }

  getFiltros(): Observable<commercialProposal>{
    //console.log('ENTRA EN GET FILTROS')
    return this.objectfiltros$.asObservable()
  }

  addFiltrosDate(dates: any){
    console.log('AD DATES', dates)
    this.dates = dates
    this.dates$.next(dates)
  }

  getFiltrosDate(): Observable<any>{
    return this.dates$.asObservable()
  }


  getBusinessProposal(filter: commercialProposal, dates: any): Observable<any> {
    const u = `${URL}/proposal/filter?startDate=${dates.start}&endDate=${dates.end}`
    return this.http.post(u, filter);
  }

  getProposals():Observable<any[]>{
    return this.proposals$.asObservable()
  }

  addProposals(proposals: any[]){
    this.proposals = proposals
    this.proposals$.next(this.proposals)
  }

}

import { Injectable } from '@angular/core';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessProposalService {

  objectfiltros: commercialProposal = {
    cliente: '',
    empresa: null,
    mes: null,
    clienteReferencia: null,
    year: null,
    conceptoServicio: null,
    tipoDeServicio: null,
    estado: null,
    garantia: null,
    moneda: null,
    montoBase: null,
    montoTotal: null,
    version: null,
    idVersionMismaPropuesta: null
  }
  objectfiltros$: Subject<commercialProposal>

  constructor(private http: HttpClient) {
    this.objectfiltros$ = new Subject()
  }

  putStateOfProposal(proposal: commercialProposal): Observable<any>{
    console.log('filter', proposal)
    return this.http.put('http://localhost:8080/propuestas', proposal)
  }

  getBusinessProposal(filter: commercialProposal): Observable<any> {
    console.log('filter', filter)
    return this.http.post('http://localhost:8080/propuestas/filtro', filter)
  }

  addNewProposal(proposal: commercialProposal): Observable<any>{
    console.log('proposal', proposal);
    return this.http.post('http://localhost:8080/propuestas', proposal)
  }

  getByVersionProposal(idProposal: number): Observable<any>{
    console.log('proposal', idProposal);
    return this.http.get('http://localhost:8080/propuestas/getUserById/'+idProposal)
  }

  putProposal(data: commercialProposal): Observable<any>{
    console.log('entra en servicio PUT', data)
    return this.http.post('http://localhost:8080/propuestas', data)
  }

  /*deleteProposal(id: number): Observable<any> | undefined{

    this.PRO = PROPOSAL.filter(pr => pr.id != id)
    console.log('editado', this.PRO)

    let observable: Observable<any> = new Observable(observer => {
      observer.next(true);
      observer.complete();
    })
    return observable
  }*/

  addFiltros(campos: commercialProposal){
    console.log('campos', campos)
    this.objectfiltros = campos
    this.objectfiltros$.next(this.objectfiltros)
  }

  getFiltros(): Observable<commercialProposal>{
    return this.objectfiltros$.asObservable()
  }

}

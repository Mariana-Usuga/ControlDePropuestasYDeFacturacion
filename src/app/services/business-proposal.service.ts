import { Injectable } from '@angular/core';
import { PROPOSAL } from '../mocks/commercialProposal.mocks';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessProposalService {

  objectfiltros: object = {}
  objectfiltros$: Subject<Object>

  constructor() {
    this.objectfiltros$ = new Subject()
  }

  getBusinessProposal(): commercialProposal[] {
    return PROPOSAL
  }

  addFiltros(campos: Object){
    this.objectfiltros = campos
    this.objectfiltros$.next(this.objectfiltros)
  }

  getFiltros(): Observable<Object>{
    return this.objectfiltros$.asObservable()
  }

}

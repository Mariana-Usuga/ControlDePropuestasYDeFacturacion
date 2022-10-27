import { Injectable } from '@angular/core';
import { PROPOSAL } from '../mocks/commercialProposal.mocks';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessProposalService {

  PRO: commercialProposal[] = [
    {
      id: 1,
      empresa: "e1",
      cliente: "C1",
      clienteReferencia: "R1",
      anio: '2022',
      mes: 'oct',
      conceptoDeServicio: "descarga documento",
      tipoDeServicio: "t1",
      estado: "aprobado",
      garantia: "30dias",
      moneda: "dolares",
      montoBase: '413',
      montoTotal: '344'
    },
    {
      id: 2,
      empresa: 'e1',
      cliente: "C1",
      clienteReferencia: "R1",
      anio: '2022',
      mes: 'oct',
      conceptoDeServicio: "descarga documento",
      tipoDeServicio: "t1",
      estado: "pendiente",
      garantia: "15dias",
      moneda: "dolares",
      montoBase: '413',
      montoTotal: '344'
    },
    {
      id: 3,
      empresa: 'e1',
      cliente: "C2",
      clienteReferencia: "R2",
      anio: '2020',
      mes: 'oct',
      conceptoDeServicio: "descarga documento",
      tipoDeServicio: "t1",
      estado: "pendiente",
      garantia: "30dias",
      moneda: "dolares",
      montoBase: '413',
      montoTotal: '344'
    }
  ]

  objectfiltros: object = {}
  objectfiltros$: Subject<Object>

  constructor() {
    this.objectfiltros$ = new Subject()
  }

  getBusinessProposal(): commercialProposal[] {
    return this.PRO
  }

  addNewProposal(proposal: commercialProposal): void{
    this.PRO.push(proposal)
  }

  putProposal(data: any, id: number){
    console.log('entra en servicio')
    this.PRO = PROPOSAL.map(p => p.id === id? data : p )
  }

  deleteProposal(id: number): Observable<any> | undefined{

    this.PRO = PROPOSAL.filter(pr => pr.id != id)
    console.log('editado', this.PRO)

    let observable: Observable<any> = new Observable(observer => {
      observer.next(true);
      observer.complete();
    })
    return observable
  }

  addFiltros(campos: Object){
    this.objectfiltros = campos
    this.objectfiltros$.next(this.objectfiltros)
  }

  getFiltros(): Observable<Object>{
    return this.objectfiltros$.asObservable()
  }

}

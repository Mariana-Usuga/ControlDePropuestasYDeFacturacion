import { Component, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';

@Component({
  selector: 'app-dialog-see-proposal',
  templateUrl: './dialog-see-proposal.component.html',
  styleUrls: ['./dialog-see-proposal.component.css']
})
export class DialogSeeProposalComponent implements OnInit {

  proposal: commercialProposal = {
    id: 0,
    cliente: 'CSTI',
    empresa: 'e1',
    mes: 'oct',
    clienteReferencia: 'JJC',
    anio: '2022',
    conceptoDeServicio: 'concepto1',
    tipoDeServicio: 'T1',
    estado: 'aprobado',
    garantia: 'g1',
    moneda: 'Dolares',
    montoBase: '202,0',
    montoTotal: '20,00'
  }

  constructor() { }

  ngOnInit(): void {
  }

}

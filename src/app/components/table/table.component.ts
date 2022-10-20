import { Component, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  nam: string;
  positio: number;
  weigh: number;
  symbo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['empresa', 'cliente referencia', 'anio', 'concepto de servicio', 
  'tipo de servicio', 'estado', 'garantia', 'moneda', 'monto base', 'monto total', 'ver', 'editar'];
  //dataSource = ELEMENT_DATA;

  dataSource: commercialProposal[] = [];
empresa: unknown;

  constructor(private businessProposalService: BusinessProposalService) { }

  ngOnInit(): void {
    this.dataSource = this.businessProposalService.getBusinessProposal()
    console.log('this.dataSource', this.dataSource)

  }

}

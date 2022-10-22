import { Component, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { MatTableDataSource } from '@angular/material/table';

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

  isplayedColumns: string[] = ['empresa', 'cliente referencia', 'anio', 'concepto de servicio', 
  'tipo de servicio', 'estado', 'garantia', 'moneda', 'monto base', 'monto total', 'ver', 'editar'];
  displayedColumns: string[] = ['empresa', 'anio'];
  //displayedColumns: string[] = ['empresa'];

  columns = [
    {
      columnDef: 'empresa',
      header: 'Empresa',
      cell: (element: commercialProposal) => `${element.empresa}`,
    },
    {
      columnDef: 'anio',
      header: 'Anio',
      cell: (element: commercialProposal) => `${element.anio}`,
    },
    /*{
      columnDef: '',
      header: 'Subjects',
      cell: (element: commercialProposal) => `${element.conceptoDeServicio}`,
    },
    {
      columnDef: 'marks',
      header: 'Marks',
      cell: (element: commercialProposal) => `${element.tipoDeServicio}`,
    },*/
  ];

  //dataSource: commercialProposal[] = [];
  dataSource: MatTableDataSource<commercialProposal> | any

  constructor(private businessProposalService: BusinessProposalService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.businessProposalService.getBusinessProposal());
  }
  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
}*/

}

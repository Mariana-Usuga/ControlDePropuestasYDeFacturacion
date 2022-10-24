import { Component, Input, OnInit } from '@angular/core';
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

export interface Fil {
  cliente: string;
  clienteReferencia: string;
  anio: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private businessProposalService: BusinessProposalService){}

  filtrosObject: any = {
    cliente: " ",
    clienteReferencia: "",
    anio: ""
  }

  isplayedColumns: string[] = ['empresa', 'cliente referencia', 'anio', 'concepto de servicio',
  'tipo de servicio', 'estado', 'garantia', 'moneda', 'monto base', 'monto total', 'ver', 'editar'];
  displayedColumns: string[] = ['empresa', 'anio'];

  cliente = ['C1', 'C2', 'C3']
  selected = ""
  dataSource: commercialProposal[] = [];


  ngOnInit(): void {
    //this.dataSource = this.businessProposalService.getBusinessProposal()
    this.businessProposalService.getFiltros().subscribe(obj => {
      this.filtrosObject = obj
    })
    console.log('filtro en table', this.filtrosObject)
  }

  ver(){
    this.dataSource = this.businessProposalService.getBusinessProposal()
  }
  //search(){
    //this.dataSource = this.businessProposalService.getBusinessProposal()
  //}

}

import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  empresa = [ 'CSTI', 'CS', 'CST']
  clienteReferencia = ['R1', 'R2', 'R3', 'R4']
  cliente = ['C1', 'C2', 'C3']
  anio = [2018, 2020, 2019, 2017]
  mes = ['oct', 'nov', 'dic', 'ene', 'feb', 'mar']
  tipoServicio = ['t1', 't2', 't3', 't4', 't5']
  estado = ['pendiente', 'rechazado', 'aprobado']
  moneda = ['dolar']

  filtersLabel = ['Cliente', 'Cliente referencia', 'Tipo de servicio', 'Empresa factura',
  'Año', 'Mes', 'Moneda', 'Estado']
  dataSource: MatTableDataSource<commercialProposal> | any

  fieldsSelected = {
    cliente: "",
    clienteReferencia: "",
    anio: "",
    /*conceptoDeServicio: "",
    tipoDeServicio: "",
    estado: "",
    garantia: "",
    moneda: "",
    montoBase: "",
    montoTotal: ""*/
  }

  constructor(private businessProposalService: BusinessProposalService) {}

  ngOnInit(): void {
    ///this.dataSource.filterPredicate = this.filterBySubject();
  }

  changeClient(event: any){
    console.log('event', event);
}
search(){
  console.log('filtro en form', this.fieldsSelected)
  this.businessProposalService.addFiltros(this.fieldsSelected)
  //this.dataSource = this.businessProposalService.getBusinessProposal()
}

}

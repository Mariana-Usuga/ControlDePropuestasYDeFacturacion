import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  empresa = [ 'e1', 'e2']
  clienteReferencia = ['R1', 'R2', 'R3', 'R4']
  cliente = ['c1', 'c2', 'c3', "c4"]
  year = ['2018', '2020', '2019', '2017', '2022']
  mes = ['oct', 'nov', 'dic', 'ene', 'feb', 'mar']
  tipoServicio = ['t1', 't2', 't3', 't4', 't5']
  estado = ['pendiente', 'rechazado', 'aprobado']
  moneda = ['dolares']

  filtersLabel = ['Cliente', 'Cliente referencia', 'Tipo de servicio', 'Empresa factura',
  'Year', 'Mes', 'Moneda', 'Estado']
  dataSource: MatTableDataSource<commercialProposal> | any

  fieldsSelected: commercialProposal = {
    empresa: null,
    cliente: "",
    clienteReferencia: null,
    year: null,
    mes: null,
    conceptoServicio: null,
    tipoDeServicio: null,
    moneda: null,
    montoBase: null,
    montoTotal: null,
    estado: null,
    garantia: null,
    version: null,
    idVersionMismaPropuesta: null
  }

  constructor(private businessProposalService: BusinessProposalService) {}

  ngOnInit(): void {
    this.dataSource = []
    ///this.dataSource.filterPredicate = this.filterBySubject();
  }

  search(){
    console.log('search', this.fieldsSelected)
  //console.log('filtro en form', this.fieldsSelected)
  this.businessProposalService.addFiltros(this.fieldsSelected)
  //this.dataSource = this.businessProposalService.getBusinessProposal()
}

}

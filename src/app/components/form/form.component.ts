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

  company = [ 'e1', 'e2']
  customerReference = ['COLSUBSIDIO', 'R2', 'R3', 'R4']
  customer = ['CSTI', 'C2', 'C3', "prueba1", 'CSTI 2']
  yearP = ['2018', '2020', '2019', '2017', '2022'] 
  monthP = ['oct', 'sep', 'dic', 'ene', 'feb', 'mar']
  typeOfService = ['t1', 't2', 't3', 't4', 't5']
  stateP = ['pendiente', 'rechazado', 'aprobado']
  currency = ['dolares']

  filtersLabel = ['Cliente', 'Cliente referencia', 'Tipo de servicio', 'Empresa factura',
  'Year', 'Mes', 'Moneda', 'Estado']
  dataSource: MatTableDataSource<commercialProposal> | any

  constructor(private businessProposalService: BusinessProposalService) {}

  ngOnInit(): void {
    this.dataSource = []
  }

  fieldsSelected: any = {
    company: null,
    customer: "",
  customerReference: null,
  monthP: null,
  yearP: null,
  servicioConcept: null,
  typeOfService: null,
  currency: null,
  stateP: null,
  baseAmount: null,
  totalAmount: null,
  warranty: null
  }

  search(){
    console.log('search', this.fieldsSelected)
  //console.log('filtro en form', this.fieldsSelected)
    console.log('entra add')
    this.businessProposalService.addFiltros(this.fieldsSelected)
}

}

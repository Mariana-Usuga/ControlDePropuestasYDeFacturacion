import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { DataFiltersService } from 'src/app/services/dataFilters/dataFilters.service';

export interface data {
  name: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  company: Array<String> = []
  //company: data[] | undefined;
  customer: Array<String> = []
  customerReference: Array<String> = []
  yearP: Array<String> = ['2022', '2021', '2009']
  monthP: Array<String> = []
  typeOfService: Array<String> = []
  stateP: Array<String> = []
  currency: Array<String> = ['dolares', 'soles']

  filtersLabel = ['Cliente', 'Cliente referencia', 'Tipo de servicio', 'Empresa factura',
  'Year', 'Mes', 'Moneda', 'Estado']
  dataSource: MatTableDataSource<commercialProposal> | any

  constructor(private businessProposalService: BusinessProposalService,
    private dataFiltersService: DataFiltersService) {}

  ngOnInit(): void {
    this.dataFiltersService.getAllCompany().subscribe((res) => {
        this.company = res.data.map((r: any) => r.name)
      })

    this.dataFiltersService.getAllCustomer().subscribe((res) => {
        this.customer = res.data.map((r: any) => r.name)
      })

    this.dataFiltersService.getAllCustomerReference().subscribe((res) => {
      this.customerReference = res.data.map((r: any) => r.name)
    })

    this.dataFiltersService.getAllTypeOfService().subscribe((res) => {
      this.typeOfService = res.data.map((r: any) => r.name)
    })

    this.dataFiltersService.getAllState().subscribe((res) => {
      this.stateP = res.data.map((r: any) => r.name)
    })
    this.dataSource = []
  }

  fieldsSelected: any = {
    code: null,
   company: null,
   customer: "",
   customerReference: null,
   typeOfService: null,
   currency: null,
   stateP: null,
   servicioConcept: null,
   baseAmount:  null,
   totalAmount: null,
   version: null,
   proposalId: null,
  folder:  null,
  wayToPay: null,
  wayToPayDays: null,
  creatorUser:  null
  }

  search(){
    console.log('search', this.fieldsSelected)
  //console.log('filtro en form', this.fieldsSelected)
    console.log('entra add')
    this.businessProposalService.addFiltros(this.fieldsSelected)
}

}

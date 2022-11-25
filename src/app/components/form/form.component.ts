import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { DataFiltersService } from 'src/app/services/dataFilters/dataFilters.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface data {
  name: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  rangeDate!: FormGroup;

  company: Array<String> = []
  customer: Array<String> = []
  customerReference: Array<String> = []
  typeOfService: Array<String> = []
  stateP: Array<String> = []
  currency: Array<String> = ['dolares', 'soles']

  filtersLabel = ['Cliente', 'Cliente referencia', 'Tipo de servicio', 'Empresa factura',
  'Year', 'Mes', 'Moneda', 'Estado']
  dataSource: MatTableDataSource<commercialProposal> | any


  dates: any = {
    start: null,
    end: null,
  }

  dates$: Subject<any>

  constructor(private businessProposalService: BusinessProposalService,
    private dataFiltersService: DataFiltersService, private formBuilder: FormBuilder) {
      this.dates$ = new Subject()
    }

  ngOnInit(): void {

    this.rangeDate = this.formBuilder.group({
      start: [''],
      end: [''],
    })

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
    creatorUser:  null,
    //removerUser: null,
  }

  search(){
    console.log('search', this.fieldsSelected)
  //console.log('filtro en form', this.fieldsSelected)
    console.log('entra add', this.rangeDate.value)
    this.businessProposalService.addFiltros(this.fieldsSelected)
    /*const inputDate = document.getElementById('#inputDate')
    inputDate?.click()*/
    //this.searchByDates()
  }

  nose(){
    if(this.rangeDate.value != ''){
      console.log('if')
      const inputDate = document.getElementById('#inputDate')
    inputDate?.click()
    }else{
      console.log('else')
    this.searchByDates()
    }
  }

  searchByDates(){
    console.log('entra datesss')

      this.businessProposalService.addFiltrosDate(this.rangeDate.value)
  }

}

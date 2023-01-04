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
  typeOfService: Array<String> = []
  stateP: Array<String> = []
  currency: Array<String> = ['PEN', 'USD', 'COP']

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
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    if(this.rangeDate.value.start === '' && this.rangeDate.value.end === ''){
      console.log('entra en if')
      //`${2023}-${01}-${01}`
      this.rangeDate.controls['start'].setValue('2000-01-01')
      this.rangeDate.controls['end'].setValue('2050-12-30')
      console.log('this.rangeDate.value.start',this.rangeDate.value.start)
      this.businessProposalService.addFiltrosDate(this.rangeDate.value)
    }
    console.log('search', this.fieldsSelected)
    console.log('entra add', this.rangeDate.value)
    this.businessProposalService.addFiltros(this.fieldsSelected)
    //this.businessProposalService.addFiltrosDate(this.rangeDate.value)
  }

  searchByDates(){
    console.log('entra datesss')
    const dd = String(this.rangeDate.value.start.getDate()).padStart(2, '0');
    const mm = String(this.rangeDate.value.start.getMonth() + 1).padStart(2, '0');
    const yyyy = this.rangeDate.value.start.getFullYear();

    console.log('START', `${yyyy}-${mm}-${dd}`)

    const ddEnd = String(this.rangeDate.value.end.getDate()).padStart(2, '0');
    const mmEnd = String(this.rangeDate.value.end.getMonth() + 1).padStart(2, '0');
    const yyyyEnd = this.rangeDate.value.end.getFullYear();

    console.log('END', `${yyyyEnd}-${mmEnd}-${ddEnd}`)

    //this.rangeDate.controls['start'].setValue(`${yyyy}-${mm}-${dd}`)
    //this.rangeDate.controls['end'].setValue(`${yyyyEnd}-${mmEnd}-${ddEnd}`)

    this.businessProposalService.addFiltrosDate(this.rangeDate.value)
    }
}

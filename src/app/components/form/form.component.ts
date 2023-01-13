import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { DataFiltersService } from 'src/app/services/dataFilters/dataFilters.service';
import {FormGroup,  FormBuilder} from '@angular/forms';
import {  Subject } from 'rxjs';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

export interface data {
  name: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
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
    private dataFiltersService: DataFiltersService, private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    ) {

      this.dates$ = new Subject()
    }

  ngOnInit(): void {
    this._adapter.setLocale('en-GB');

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

    this.dataFiltersService.getCutomers().subscribe((res) => {
      this.customer = res
    })
  }

  fieldsSelected: any = {
    code: null,
    company: null,
    customer: null,
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
    if(this.rangeDate.value.start === '' || this.rangeDate.value.end === ''){
        this.businessProposalService.addFiltrosDate({
          start: '2000-01-01', end: '2050-12-30'
        })
      }else{
        this.searchByDates()
      }
    this.businessProposalService.addFiltros(this.fieldsSelected)
  }

  searchByDates(){
    const dd = String(this.rangeDate.value.start.getDate()).padStart(2, '0');
    const mm = String(this.rangeDate.value.start.getMonth() + 1).padStart(2, '0');
    const yyyy = this.rangeDate.value.start.getFullYear();

    const ddEnd = String(this.rangeDate.value.end.getDate()).padStart(2, '0');
    const mmEnd = String(this.rangeDate.value.end.getMonth() + 1).padStart(2, '0');
    const yyyyEnd = this.rangeDate.value.end.getFullYear();

    this.businessProposalService.addFiltrosDate({
      start: `${yyyy}-${mm}-${dd}`, end: `${yyyyEnd}-${mmEnd}-${ddEnd}`
    })
    }

    /*french() {
      this._locale = 'fr';
      this._adapter.setLocale(this._locale);
    }

    getDateFormatString(): string {
      if (this._locale === 'ja-JP') {
        return 'YYYY/MM/DD';
      } else if (this._locale === 'fr') {
        return 'DD/MM/YYYY';
      }
      return '';
    }*/
}

import { NgIfContext } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { DataFiltersService } from 'src/app/services/dataFilters/dataFilters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-proposal',
  templateUrl: './dialog-add-proposal.component.html',
  styleUrls: ['./dialog-add-proposal.component.css']
})
export class DialogAddProposalComponent implements OnInit {

  wayToPayDaysNumber: Number = 0;
  totalAmount: Number = 0;
  base: Number = 0;
  
  action: String = 'Crear';
  years = [2022, 2019, 2018, 2017];
  company: Array<String> = []
  customer: Array<String> = []
  customerReference: Array<String> = []
  yearP: Array<String> = ['2022', '2021', '2009']
  monthP: Array<String> = []
  typeOfService: Array<String> = []
  stateP: Array<String> = []
  currency: Array<String> = ['dolares']

  newProposal!: FormGroup
  newProposalContact!: FormGroup
  idProposalContact: number = 0;
  accionBtn: string = "Guardar"
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  idNewProposal: number = 0;
  file = ""; // Variable to store file
  disabled: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogAddProposalComponent>,
    private http: HttpClient, private dataFiltersService: DataFiltersService) { }

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
    let v = null;

    if(this.editData != null){
      v = 1;
    }

    this.newProposal = this.formBuilder.group({
      code: ['', Validators.required],
      company: ['', Validators.required],
      customer: ['', Validators.required],
      customerReference: [''],
      servicioConcept: [''],
      typeOfService: ['', Validators.required],
      currency: [''],
      stateP: ['pendiente'],
      baseAmount: [''],
      totalAmount: [''],
      version: [v, Validators.required],
      dateVersion: [new Date(), Validators.required],
      folder: [''],
      wayToPay: ['', Validators.required],
      wayToPayDays: [''],
      creatorUser: ['', Validators.required],
      proposalContact: ['', Validators.required],
      telephoneContact: ['', Validators.required]
    })

    this.newProposalContact = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
      idProposal: ['']
    })

    if(this.editData){
      this.accionBtn = "Editar"
      this.newProposal.controls['company'].setValue(this.editData.company)
      this.newProposal.controls['customer'].setValue(this.editData.customer)
      this.newProposal.controls['customerReference'].setValue(this.editData.customerReference)
      this.newProposal.controls['servicioConcept'].setValue(this.editData.servicioConcept)
      this.newProposal.controls['typeOfService'].setValue(this.editData.typeOfService)
      this.newProposal.controls['wayToPay'].setValue(this.editData.wayToPay)
      this.newProposal.controls['wayToPayDays'].setValue(this.editData.wayToPayDays)
      this.newProposal.controls['baseAmount'].setValue(this.editData.baseAmount)
      this.newProposal.controls['totalAmount'].setValue(this.editData.totalAmount)
      this.newProposal.controls['currency'].setValue(this.editData.currency)
      this.newProposal.controls['folder'].setValue(this.editData.folder)
      this.newProposal.controls['code'].setValue(this.editData.code)
      this.getContacts()
      this.disabled = true
      //const company = document.querySelector('#companyOption')
      //company.disabled = true

    }
  }

  method_page(value: string){
    console.log('entra method')
    if(value === "contado"){
      this.newProposal.controls['wayToPayDays'].setValue(this.wayToPayDaysNumber)
    }else{
      this.newProposal.controls['wayToPayDays'].setValue(30)
    }
  }

  calcuteTotalAmount(){
    console.log('entra en calcute', this.newProposal.value.baseAmount)
    console.log('this.newProposal.value.moneda', this.newProposal.value.currency)
    let tax;
    if(this.newProposal.value.currency === "COP"){
      tax = 19
    }else if(this.newProposal.value.currency === "PEN"){
      tax = 18
    }else{
      tax = 12
    }
    console.log('tax', tax)
    this.totalAmount = (this.newProposal.value.baseAmount * tax) + this.newProposal.value.baseAmount 
    this.newProposal.controls['totalAmount'].setValue(this.totalAmount)
  }
  onFileSelect(event: any) {
    this.file = event.target.files;
}

getContacts(){
  console.log('this.editData.id', this.editData.id)
  this.businessProposalService.getContacts(this.editData.id).subscribe(
    (res) => {
      console.log('res', res)
      this.idProposalContact = res.id
      this.newProposalContact.controls['fullName'].setValue(res.fullName)
      this.newProposalContact.controls['email'].setValue(res.email)
      this.newProposalContact.controls['phoneNumber'].setValue(res.phoneNumber)
    },
    (err) => console.log('ha ocurrido un error', err),
    () => console.info('se ha completado la llamada')
  )
}

  addProposal(){
    this.action = 'Crear';
    if(this.file.length > 5){
      return alert('solo puedes subir maximo 5 archivos')
    }else{
      if(!this.editData){
        if (this.file) {
          console.log('this.file.length',this.file.length)

          const formData = new FormData();
          formData.append("file", this.file[0]);
          
            this.http.post<any>("http://localhost:8080/proposal/upload", formData).subscribe(
              (res) => {
                console.log('res', res)
                this.newProposal.get('folder')?.setValue(res.message)
                console.log('this.newProposal.value', this.newProposal.value)
                const data = {
                  code: this.newProposal.value.code,
                  company: this.newProposal.value.company,
                  customer: this.newProposal.value.customer,
                  customerReference: this.newProposal.value.customerReference,
                  yearP: this.newProposal.value.yearP,
                  monthP: this.newProposal.value.monthP,
                  servicioConcept: this.newProposal.value.servicioConcept,
                  typeOfService: this.newProposal.value.typeOfService,
                  currency: this.newProposal.value.currency,
                  stateP: this.newProposal.value.stateP,
                  baseAmount: this.newProposal.value.baseAmount,
                  totalAmount: this.newProposal.value.totalAmount,
                  wayToPay: this.newProposal.value.wayToPay,
                  wayToPayDays: this.newProposal.value.wayToPayDays,
                  creatorUser: this.newProposal.value.creatorUser,
                  version: 1,
                  dateVersion: this.newProposal.value.dateVersion,
                  folder: this.newProposal.value.folder
                }
                this.businessProposalService.addNewProposal(data).subscribe(
                  (res) => {
                    console.log('res', res)
                    //this.idNewProposal = res.data.id
                    this.newProposalContact.controls['idProposal'].setValue(res.data.id)
                    if(res.success){
                      this.newContact();
                    }
                  },
                  (err) => console.log('ha ocurrido un error', err),
                  () => console.info('se ha completado la llamada')
                )
                this.newProposal.reset()
                this.dialogRef.close('save')
              },
              (err) => {
                console.log('err', err)
              })}
  }else{
    console.log('entra en update')
    this.updateProposal();
  }

   }
}

newContact(){
  this.businessProposalService.addNewProposalContact(this.newProposalContact.value).subscribe(
    (res) => {
      console.log('res contact', res)
     if(res){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La propuesta se ha creado',
        showConfirmButton: false,
        timer: 2000
      })
     }
    },
    (err) => console.log('ha ocurrido un error', err),
        () => console.info('se ha completado la llamada')
    )
}

  updateProposal(){
    console.log('new', this.newProposal.value, 'update', this.editData)
    const contact = {
      id: this.idProposalContact,
      fullName: this.newProposalContact.value.fullName,
      email:  this.newProposalContact.value.email,
      phoneNumber:  this.newProposalContact.value.phoneNumber,
      idProposal: this.editData.id
    }
    this.businessProposalService.putContact(contact).subscribe(
      (res) => {
        console.log('res', res)
        if(res === null){
          console.log('no tiene contacto')
        }
      }
    )
    const data1 = {
      id:  this.editData.id,
      company: this.newProposal.value.company,
      customer: this.newProposal.value.customer,
      customerReference: this.newProposal.value.customerReference,
      yearP: this.newProposal.value.yearP,
      monthP: this.newProposal.value.monthP,
      servicioConcept: this.newProposal.value.servicioConcept,
      typeOfService: this.newProposal.value.typeOfService,
      currency: this.newProposal.value.currency,
      stateP: this.newProposal.value.stateP,
      baseAmount: this.newProposal.value.baseAmount,
      totalAmount: this.newProposal.value.totalAmount,
      warranty: this.newProposal.value.warranty,
      version: Number(this.editData.version) + 1,
      dateVersion: this.newProposal.value.dateVersion,
      folder: this.newProposal.value.folder,
      wayToPay: this.newProposal.value.wayToPay,
      wayToPayDays: this.newProposal.value.wayToPayDays,
      creatorUser: this.newProposal.value.creatorUser,
    }
    this.businessProposalService.putProposal(data1).subscribe(
      (res) => {
        console.log('res put', res, 'version in add', this.editData.version)
        const data = {
          company: this.editData.company,
          customer: this.editData.customer,
          customerReference: this.editData.customerReference,
          yearP: this.editData.yearP,
          monthP: this.editData.monthP,
          servicioConcept: this.editData.servicioConcept,
          typeOfService: this.editData.typeOfService,
          currency: this.editData.currency,
          stateP: this.editData.stateP,
          baseAmount: this.editData.baseAmount,
          totalAmount: this.editData.totalAmount,
          warranty: this.editData.warranty,
          version: this.editData.version,
          dateVersion: this.editData.dateVersion,
          proposalId: this.editData.id,
          folder: this.editData.folder,
          wayToPay: this.editData.wayToPay,
          wayToPayDays: this.editData.wayToPayDays,
          creatorUser: this.editData.creatorUser,
        }
        this.businessProposalService.addNewVersion(data).subscribe(
          (res) => {
            console.log('res add', res)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La propuesta se ha editado',
              showConfirmButton: false,
              timer: 4000
            })
          }
        )
      },
      (err) => console.log('ha ocurrido un error', err),
      () => console.info('se ha completado la llamada')
    )
    this.newProposal.reset()
    this.dialogRef.close('Editar')
  }


  /*onUpload() {
    console.log('this.file', this.file)
    this.businessProposalService.upload(this.file).subscribe(
      (res) => {
          console.log('res', res)
      })

    /*this.loading = !this.loading;
    console.log(this.file);
    this.businessProposalService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable
            }
        }
    );*/
//}

}

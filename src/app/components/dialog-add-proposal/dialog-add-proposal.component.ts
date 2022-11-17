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

  years = [2022, 2019, 2018, 2017];
  company: Array<String> = []
  //company: data[] | undefined;
  customer: Array<String> = []
  customerReference: Array<String> = []
  yearP: Array<String> = ['2022', '2021', '2009']
  monthP: Array<String> = []
  typeOfService: Array<String> = []
  stateP: Array<String> = []
  currency: Array<String> = ['dolares']

  newProposal!: FormGroup
  accionBtn: string = "Guardar"
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file = ""; // Variable to store file


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

    console.log('this.editData', this.editData)
    let idVersion =  Math.floor(Math.random() * (10000 - 100) + 100);
    let v = 1

    if(this.editData != null){
      idVersion = this.editData.proposalId;
      v = this.editData.version + 1;
    }

    this.newProposal = this.formBuilder.group({
      company: ['', Validators.required],
      customer: ['', Validators.required],
      customerReference: [''],
      yearP: [''],
      monthP: ['', Validators.required],
      servicioConcept: [''],
      typeOfService: ['', Validators.required],
      currency: [''],
      stateP: [''],
      baseAmount: [''],
      totalAmount: [''],
      warranty: [''],
      version: [v, Validators.required],
      dateVersion: [new Date(), Validators.required],
      folder: ['']
    })

    if(this.editData){
      this.accionBtn = "Editar"
      this.newProposal.controls['company'].setValue(this.editData.company)
      this.newProposal.controls['customer'].setValue(this.editData.customer)
      this.newProposal.controls['customerReference'].setValue(this.editData.customerReference)
      this.newProposal.controls['servicioConcept'].setValue(this.editData.servicioConcept)
      this.newProposal.controls['typeOfService'].setValue(this.editData.typeOfService)
      this.newProposal.controls['yearP'].setValue(this.editData.yearP)
      this.newProposal.controls['monthP'].setValue(this.editData.monthP)
      this.newProposal.controls['stateP'].setValue(this.editData.stateP)
      this.newProposal.controls['warranty'].setValue(this.editData.warranty)
      this.newProposal.controls['baseAmount'].setValue(this.editData.baseAmount)
      this.newProposal.controls['totalAmount'].setValue(this.editData.totalAmount)
      this.newProposal.controls['currency'].setValue(this.editData.currency)
      this.newProposal.controls['folder'].setValue(this.editData.folder)
    }
  }

  addProposal(){
    if(!this.editData){
        if (this.file) {
            //this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", this.file);
            //console.log("file", file, 'file name', this.fileName);
            this.http.post<any>("http://localhost:8080/proposal/upload", formData).subscribe(
              (res) => {
                console.log('res', res)
                this.newProposal.get('folder')?.setValue(res.message)
                console.log('this.newProposal.value', this.newProposal.value)
                this.businessProposalService.addNewProposal(this.newProposal.value).subscribe(
                  (res) => {
                    console.log('res', res)
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'La propuesta se ha creado',
                      showConfirmButton: false,
                      timer: 2000
                    })
                  },
                  (err) => console.log('ha ocurrido un error', err),
                  () => console.info('se ha completado la llamada')
                )
                this.newProposal.reset()
                this.dialogRef.close('save')
              },
              (err) => {
                console.log('err', err)
              }
            )
        }
  }else{
    console.log('entra en update')
    this.updateProposal();
  }

}

  updateProposal(){
    //console.log('new', this.newProposal.value, 'update', this.editData)
    this.businessProposalService.putProposal(this.newProposal.value).subscribe(
      (res) => {
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
          folder: this.editData.folder
        }
        this.businessProposalService.addNewVersion(data).subscribe(
          (res) => {
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

onFileSelect(event: any) {
    this.file = event.target.files[0];
}

onFileSelected() {
  const file = this.file;
  console.log('file', file)
  if (file) {
      const formData = new FormData();
      formData.append("file", file);
      //console.log("file", file, 'file name', this.fileName);
      this.http.post<any>("http://localhost:8080/proposal/upload", formData).subscribe(
        (res) => {
          console.log('res', res)
        },
        (err) => {
          console.log('err', err)
        }
      )

  }
}

uploadFile() {

  //let file: File = this.file;

  this.businessProposalService.uploadFile(this.file)
    .subscribe(
      (res) => {
        console.log('res', res)
        /*if (event.type == HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
        }
      },
      (err) => {
        console.log("Upload Error:", err);
      }, () => {
        console.log("Upload done");
      }*/
    }
    )
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

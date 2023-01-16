import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataFiltersService } from 'src/app/services/dataFilters/dataFilters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-customers',
  templateUrl: './dialog-add-customers.component.html',
  styleUrls: ['./dialog-add-customers.component.css']
})
export class DialogAddCustomersComponent implements OnInit {

  newCustomer!: FormGroup

  error: any = {
    name: '',
  }

  constructor(private formBuilder: FormBuilder,
    private dataFiltersService: DataFiltersService,
    private dialogRef: MatDialogRef<DialogAddCustomersComponent>,
    ) { }

  ngOnInit(): void {

    this.newCustomer = this.formBuilder.group({
      name: ['', Validators.required],
      businessName: [''],
      ruc: [''],
      legalRepresentative: [''],
      fieldToWhichItIsDedicated: [''],
      telephone1: [''],
      telephone2:  [''],
      email1: [''],
      direction: ['']

    })

  }

  addCustomers(){
//this.newCustomer.reset()
    if(this.newCustomer.value.name === ""){
      Swal.fire(
        '',
        'El campo nombre es obligatorio!',
        'warning'
      )
      this.error.name = false
    }else{
      this.dataFiltersService.addCustomer(this.newCustomer.value).subscribe((res) => {
        console.log('res', res)
      },
      (err) => console.log('ha ocurrido un error', err),
      () => {
        console.info('se ha completado la llamada')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha creado el cliente',
          showConfirmButton: false,
          timer: 4000
        })

        this.dataFiltersService.getAllCustomer().subscribe(
          (res) => {
            const customers = res.data.map((r: any) => r.name)
            this.dataFiltersService.addCustomers(customers)
          }
        )
      } 
      )
  
      
      this.newCustomer.reset()
      this.dialogRef.close()
    }
  }
}

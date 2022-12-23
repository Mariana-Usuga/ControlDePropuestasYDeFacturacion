import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  newCustomerReference!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private dataFiltersService: DataFiltersService,
    private dialogRef: MatDialogRef<DialogAddCustomersComponent>,
    ) { }

  ngOnInit(): void {

    this.newCustomer = this.formBuilder.group({
      name: ['', Validators.required],
    })

    this.newCustomerReference = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  addCustomers(){
    const customer = {
      name : this.newCustomer.value.name
    }
    this.dataFiltersService.addCustomer(customer).subscribe((res) => {
      console.log('res', res)
    },
    (err) => console.log('ha ocurrido un error', err),
    () => console.info('se ha completado la llamada')
    )

    const customerReference = {
      name : this.newCustomerReference.value.name
    }
    this.dataFiltersService.addCustomerReference(customerReference).subscribe((res: any) => {
      console.log('res', res)
      if(res.sucess){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Clientes creados',
          showConfirmButton: false,
          timer: 4000
        })
      }
    },
    (err) => console.log('ha ocurrido un error', err),
    () => console.info('se ha completado la llamada')
    )
    this.newCustomer.reset()
    this.newCustomerReference.reset()
    this.dialogRef.close()
  }
}

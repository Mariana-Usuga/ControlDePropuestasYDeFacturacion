import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataFiltersService } from 'src/app/services/dataFilters/dataFilters.service';

@Component({
  selector: 'app-dialog-add-customers',
  templateUrl: './dialog-add-customers.component.html',
  styleUrls: ['./dialog-add-customers.component.css']
})
export class DialogAddCustomersComponent implements OnInit {

  newCustomer!: FormGroup
  newCustomerReference!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private dataFiltersService: DataFiltersService) { }

  ngOnInit(): void {

    this.newCustomer = this.formBuilder.group({
      name: ['', Validators.required],
    })

    this.newCustomerReference = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  addCustomers(){
    /*const customer = {
      name : this.newCustomer.value.name
    }
    this.dataFiltersService.addCustomer(customer).subscribe((res) => {
      console.log('res', res)
    },
    (err) => console.log('ha ocurrido un error', err),
    () => console.info('se ha completado la llamada')
    )*/

    const customerReference = {
      name : this.newCustomerReference.value.name
    }
    this.dataFiltersService.addCustomerReference(customerReference).subscribe((res) => {
      console.log('res', res)
    },
    (err) => console.log('ha ocurrido un error', err),
    () => console.info('se ha completado la llamada')
    )
  }
}

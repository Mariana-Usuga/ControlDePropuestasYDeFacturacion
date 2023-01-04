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
    /*const customer = {
      name : this.newCustomer.value.name
    }*/
    this.dataFiltersService.addCustomer(this.newCustomer.value).subscribe((res) => {
      console.log('res', res)
    },
    (err) => console.log('ha ocurrido un error', err),
    () => console.info('se ha completado la llamada')
    )

    
    this.newCustomer.reset()
    this.dialogRef.close()
  }
}

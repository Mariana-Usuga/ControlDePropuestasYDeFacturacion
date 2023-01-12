import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import Swal from 'sweetalert2';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-reject-proposal',
  templateUrl: './dialog-reject-proposal.component.html',
  styleUrls: ['./dialog-reject-proposal.component.css']
})
export class DialogRejectProposalComponent implements OnInit {

  verify!: FormGroup;
  dataSource: any[] = [];

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public getDataArray: any, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogRejectProposalComponent>) { }

    proposalSee: any

    ngOnInit(): void {
      if(this.getDataArray[0].company){
        this.proposalSee = this.getDataArray[0]
      }

      this.verify = this.formBuilder.group({
        rejectionDate:  ['', Validators.required],
        rejectionUser: ['', Validators.required],
        rejectionComments: ['']
      })
    }

    rejectProposal(){
    if(this.verify.value.rejectionDate === '' || this.verify.value.rejectionUser === ''){
      //alert('los campos Quien rechaza y Fecha de rechazo son obligatorios')
      Swal.fire('los campos Quien rechaza y Fecha de rechazo son obligatorios')
    }else{
      const d =  this.verify.value.rejectionDate.toISOString();
    console.log('nameprop',)
    const cambio = {
      id: this.proposalSee.id,
      customer: this.proposalSee.customer,
      company: this.proposalSee.company,
      customerReference: this.proposalSee.customerReference,
      servicioConcept: this.proposalSee.servicioConcept,
      typeOfService: this.proposalSee.typeOfService,
      stateP: "RECHAZADO",
      currency: this.proposalSee.currency,
      baseAmount: this.proposalSee.baseAmount,
      totalAmount: this.proposalSee.totalAmount,
      version: this.proposalSee.version,
      proposalId: this.proposalSee.proposalId,
      editorUser: this.proposalSee.editorUser,
      wayToPay: this.proposalSee.wayToPay,
      wayToPayDays: this.proposalSee.wayToPayDays,
      creatorUser: this.proposalSee.creatorUser,
      rejectionUser: this.verify.value.rejectionUser,
      rejectionComments: this.verify.value.rejectionComments ,
      rejectionDate: d,
      code: this.proposalSee.code,
      folder: this.proposalSee.folder,
      dateVersion: this.proposalSee.dateVersion
    }
      this.businessProposalService.putStateOfProposal(cambio).subscribe(
      (res) => {
        console.log('res', res)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Propuesta Rechazada',
          showConfirmButton: false,
          timer: 2000
        })
      },
      (err) => console.log('ha ocurrido un error', err),
          () => {
            console.info('se ha completado la llamada')
            this.getListProposals()
          } 
    )
      this.verify.reset()
      this.dialogRef.close()
  }
    }

    getListProposals(){
      this.businessProposalService.getBusinessProposal(this.getDataArray[1], 
        this.getDataArray[2]).subscribe(
        (resProposals) => {
          console.log('res despues de editar', resProposals)
  
          if(resProposals.length === 0){
            //alert('No hay datos que coincidan con la búsqueda')
          }else{
            this.dataSource = resProposals
            this.businessProposalService.addProposals(this.dataSource)
          }
        },
        (err) => console.log('ha ocurrido un error', err),
        () =>  {
          console.info('se ha completado la llamada')
        }
      )
    }

}

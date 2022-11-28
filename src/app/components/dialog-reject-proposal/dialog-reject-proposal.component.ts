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

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public proposalSee: any, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogRejectProposalComponent>) { }

    ngOnInit(): void {
      this.verify = this.formBuilder.group({
        rejectionDate:  ['', Validators.required],
        rejectionUser: ['', Validators.required],
        rejectionComments: ['']
      })
    }

  recha(){
    const d =  this.verify.value.rejectionDate.toISOString();
    console.log('nameprop',)
    const cambio = {
      id: this.proposalSee.id,
      customer: this.proposalSee.customer,
      company: this.proposalSee.company,
      customerReference: this.proposalSee.customerReference,
      servicioConcept: this.proposalSee.servicioConcept,
      typeOfService: this.proposalSee.typeOfService,
      stateP: "rechazado",
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
          () => console.info('se ha completado la llamada')
    )
      this.verify.reset()
      this.dialogRef.close()
  }

}

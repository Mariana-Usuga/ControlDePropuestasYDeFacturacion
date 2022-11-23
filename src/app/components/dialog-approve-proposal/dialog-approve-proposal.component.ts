import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-approve-proposal',
  templateUrl: './dialog-approve-proposal.component.html',
  styleUrls: ['./dialog-approve-proposal.component.css']
})
export class DialogApproveProposalComponent implements OnInit {

  verify!: FormGroup;
  dialogRef: any;

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public proposalSee: any, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.verify = this.formBuilder.group({
      company: ['', Validators.required],
    })
  }

    cambio: any = {
      //id: this.proposalSee.id,
      customer: this.proposalSee.customer,
      company: this.proposalSee.company,
      monthP: this.proposalSee.monthP,
      customerReference: this.proposalSee.customerReference,
      yearP: this.proposalSee.yearP,
      servicioConcept: this.proposalSee.servicioConcept,
      typeOfService: this.proposalSee.typeOfService,
      stateP: "aprobado",
      warranty: this.proposalSee.warranty,
      currency: this.proposalSee.currency,
      baseAmount: this.proposalSee.baseAmount,
      totalAmount: this.proposalSee.totalAmount,
      version: this.proposalSee.version,
      proposalId: this.proposalSee.proposalId,
      dateVersion: this.proposalSee.dateVersion,
      folder: this.proposalSee.folder
    }

    approvedProposal: any = {
      id: this.proposalSee.id,
      customer: this.proposalSee.customer,
      company: this.proposalSee.company,
      monthP: this.proposalSee.monthP,
      customerReference: this.proposalSee.customerReference,
      yearP: this.proposalSee.yearP,
      servicioConcept: this.proposalSee.servicioConcept,
      typeOfService: this.proposalSee.typeOfService,
      stateP: "aprobado",
      warranty: this.proposalSee.warranty,
      currency: this.proposalSee.currency,
      baseAmount: this.proposalSee.baseAmount,
      totalAmount: this.proposalSee.totalAmount,
      version: this.proposalSee.version,
      proposalId: this.proposalSee.proposalId,
      dateVersion: this.proposalSee.dateVersion,
      folder: this.proposalSee.folder
    }

  aprovar(){
    console.log('cambio', this.cambio)
    console.log('nameprop', this.verify.value.company, 'sacs',this.proposalSee.company)

    if(this.verify.value.company === this.proposalSee.company){
      this.businessProposalService.addApprovedProposal(this.cambio).subscribe(
      (res) => {
        this.businessProposalService.putStateOfProposal(this.approvedProposal).subscribe(
          (res) => {
            console.log('res', res)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Propuesta Aprobada',
              showConfirmButton: false,
              timer: 2000
            })
          },
          (err) => console.log('ha ocurrido un error', err),
              () => console.info('se ha completado la llamada')
        )
        console.log('res', res)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Propuesta Aprobada',
          showConfirmButton: false,
          timer: 2000
        })
      },
      (err) => console.log('ha ocurrido un error', err),
          () => console.info('se ha completado la llamada')
    )
    this.dialogRef.close('save')
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Nombre no valido',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

}

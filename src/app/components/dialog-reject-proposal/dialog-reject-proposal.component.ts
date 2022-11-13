import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-reject-proposal',
  templateUrl: './dialog-reject-proposal.component.html',
  styleUrls: ['./dialog-reject-proposal.component.css']
})
export class DialogRejectProposalComponent implements OnInit {

  verify!: FormGroup;

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public proposalSee: any, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.verify = this.formBuilder.group({
        company: ['', Validators.required],
      })
    }

    cambio: any = {
      id: this.proposalSee.id,
      customer: this.proposalSee.customer,
      company: this.proposalSee.company,
      monthP: this.proposalSee.monthP,
      customerReference: this.proposalSee.customerReference,
      yearP: this.proposalSee.yearP,
      servicioConcept: this.proposalSee.servicioConcept,
      typeOfService: this.proposalSee.typeOfService,
      stateP: "rechazado",
      warranty: this.proposalSee.warranty,
      currency: this.proposalSee.currency,
      baseAmount: this.proposalSee.baseAmount,
      totalAmount: this.proposalSee.totalAmount,
      version: this.proposalSee.version,
      proposalId: this.proposalSee.proposalId
    }

  recha(){
    console.log('cambio', this.cambio)
    console.log('nameprop', this.verify.value.empresa)
    if(this.verify.value.empresa === this.proposalSee.empresa){
      this.businessProposalService.putStateOfProposal(this.cambio).subscribe(
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
    }else{
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

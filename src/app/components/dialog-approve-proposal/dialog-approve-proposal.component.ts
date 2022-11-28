import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-approve-proposal',
  templateUrl: './dialog-approve-proposal.component.html',
  styleUrls: ['./dialog-approve-proposal.component.css']
})
export class DialogApproveProposalComponent implements OnInit {

  hitos: any = [];
  approve!: FormGroup;
  hitoForm!: FormGroup;
  //dialogRef: any;

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public proposalSee: any, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogApproveProposalComponent>) { }

  ngOnInit(): void {

    this.approve = this.formBuilder.group({
      userApproved: ['', Validators.required],
      approvalDate: ['', Validators.required],
      comments: ['']
    })

    this.hitoForm = this.formBuilder.group({
      percentage: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  addHito(){
    console.log('this.hitoForm.value', this.hitoForm.value)
    console.log('date', this.approve.value.approvalDate)

    this.hitos.push({
      "percentage": this.hitoForm.value.percentage,
      "description": this.hitoForm.value.description
    })
    this.hitoForm.controls['description'].setValue('')
    this.hitoForm.controls['percentage'].setValue('')
  }

  aprovar(){
    console.log('hitos', this.hitos)
    console.log('nameprop', 'sacs',this.proposalSee)

    const date = this.approve.value.approvalDate

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const d =  new Date(`${yyyy}-${mm}-${dd}`).toISOString();

    const approvedProposal = {
      customer: this.proposalSee.customer,
      company: this.proposalSee.company,
      customerReference: this.proposalSee.customerReference,
      servicioConcept: this.proposalSee.servicioConcept,
      typeOfService: this.proposalSee.typeOfService,
      stateP: "aprobado",
      currency: this.proposalSee.currency,
      baseAmount: this.proposalSee.baseAmount,
      totalAmount: this.proposalSee.totalAmount,
      version: this.proposalSee.version,
      proposalId: this.proposalSee.id,
      dateVersion: this.proposalSee.dateVersion,
      folder: this.proposalSee.folder,
      editorUser: this.proposalSee.editorUser,
      wayToPay: this.proposalSee.wayToPay,
      wayToPayDays: this.proposalSee.wayToPayDays,
      creatorUser: this.proposalSee.creatorUser,
      approvalDate: d,
      userApproved: this.approve.value.userApproved,
      comments:this.approve.value.comments,
      code: this.proposalSee.code
    }

    const cambio = {
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
        folder: this.proposalSee.folder,
        editorUser: this.proposalSee.editorUser,
        rejectionDate: this.proposalSee.rejectionDate,
        rejectionComments: this.proposalSee.rejectionComments,
        creatorUser: this.proposalSee.creatorUser,
        wayToPay: this.proposalSee.wayToPay,
        wayToPayDays: this.proposalSee.wayToPayDays,
        code: this.proposalSee.code
      }
      this.businessProposalService.addApprovedProposal(approvedProposal).subscribe(
      (res) => {
        console.log('res add table apro', res)
        console.log('this.proposalSee.proposalId,', this.proposalSee.proposalId)
       for(let hito of this.hitos){
          this.businessProposalService.addHito(this.proposalSee.id, hito).subscribe(
            (res) => {
              console.log('hitos', res)
            },
            (err) => console.log('ha ocurrido un error', err),
              () => console.info('se ha completado la llamada')
            )
         }
        this.businessProposalService.putStateOfProposal(cambio).subscribe(
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
    this.approve.reset()
    this.hitoForm.reset()
    this.dialogRef.close()
    }
  }


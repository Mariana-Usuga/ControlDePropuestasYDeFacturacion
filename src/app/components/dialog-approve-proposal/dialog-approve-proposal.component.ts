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
  dataSource: any[] = [];

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public getDataArray: any, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogApproveProposalComponent>) { }

    proposalSee: any

  ngOnInit(): void {
    if(this.getDataArray[0].company){
      this.proposalSee = this.getDataArray[0]
    }

    this.approve = this.formBuilder.group({
      userApproved: ['', Validators.required],
      approvalDate: ['', Validators.required],
      comments: ['']
    })

    this.hitoForm = this.formBuilder.group({
      percentage: [''],
      description: [''],
    })
  }

  addHito(){

    this.hitos.push({
      "percentage": this.hitoForm.value.percentage,
      "description": this.hitoForm.value.description
    })
    this.hitoForm.controls['description'].setValue('')
    this.hitoForm.controls['percentage'].setValue('')
  }

  aprovar(){
    if(this.approve.value.userApproved === '' || this.approve.value.approvalDate === ''){
      //alert('Quien aprueba y Fecha de aprobacion son campos obligatorios')
      Swal.fire('Quien aprueba y Fecha de aprobacion son campos obligatorios')
    }else{
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
      stateP: "APROBADO",
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
        stateP: "APROBADO",
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
            this.getListProposals()
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

    getListProposals(){
      this.businessProposalService.getBusinessProposal(this.getDataArray[1], 
        this.getDataArray[2]).subscribe(
        (resProposals) => {
          console.log('res despues de editar', resProposals)
  
          if(resProposals.length === 0){
            ///alert('No hay datos que coincidan con la búsqueda')
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


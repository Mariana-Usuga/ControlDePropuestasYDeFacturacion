import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { DialogApproveProposalComponent } from '../dialog-approve-proposal/dialog-approve-proposal.component';
import { DialogRejectProposalComponent } from '../dialog-reject-proposal/dialog-reject-proposal.component';

@Component({
  selector: 'app-dialog-see-proposal',
  templateUrl: './dialog-see-proposal.component.html',
  styleUrls: ['./dialog-see-proposal.component.css']
})
export class DialogSeeProposalComponent implements OnInit {

  proposal: commercialProposal = {
    code: this.proposalSee.code,
    customer: this.proposalSee.customer,
    company: this.proposalSee.company,
    customerReference: this.proposalSee.customerReference,
    servicioConcept: this.proposalSee.servicioConcept,
    typeOfService: this.proposalSee.typeOfService,
    stateP: this.proposalSee.stateP,
    currency: this.proposalSee.currency,
    baseAmount: this.proposalSee.baseAmount,
    totalAmount: this.proposalSee.totalAmount,
    version: this.proposalSee.version,
    proposalId: this.proposalSee.proposalId,
    dateVersion: this.proposalSee.dateVersion,
    folder: this.proposalSee.folder,
    wayToPay: this.proposalSee.wayToPay,
    wayToPayDays: this.proposalSee.wayToPayDays,
    creatorUser: this.proposalSee.creatorUser,
  }
  fileService: any;
  toastr: any;

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any) { }

  ngOnInit(): void {
    console.log('proposalSee', this.proposalSee);

  }
  export(): void{
    const downloadInstance = document.createElement('a');
    downloadInstance.href = 'assets/Mariana-Usuga(1).pdf'
    downloadInstance.target = '_blank'
    downloadInstance.download = 'mariana.pdf'
    downloadInstance.click()

    const downloadInstanc = document.createElement('a');
    downloadInstanc.href = 'assets/my_export_export_proposal(2).xlsx'
    downloadInstanc.target = '_blank'
    downloadInstanc.download = 'mariana2'
    downloadInstanc.click()
  }
  /*down(){
    const fileName = `cart.git`

    this.fileService.getReport().subscribe((res: any) => {
      this.manageExcelFile(res, fileName);
      this.toastr.success('resporte descargado exitosamente')
    })
  }*/
  /*manageExcelFile(){
    //const dataType = res.type;
    const binaryData = [];
    binaryData.push(res)
    const filtePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}))
    const downloadLink = document.createElement('a')
    downloadLink.href = filtePath
    downloadLink.setAttribute('download', "C:\Users\Mariana\spring-boot-proposal\cart.gif")
    document.body.appendChild(downloadLink)
    downloadLink.click()

  }*/

  openDialogApprove(){
    this.dialog.open(DialogApproveProposalComponent, {
      width: '70%',
      data:this.proposalSee
    });
  }

  openRecha(){
    this.dialog.open(DialogRejectProposalComponent, {
      width: '70%',
      data:this.proposalSee
    });
  }

}

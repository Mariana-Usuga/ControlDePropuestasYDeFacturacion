import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { DialogApproveProposalComponent } from '../dialog-approve-proposal/dialog-approve-proposal.component';
import { DialogRejectProposalComponent } from '../dialog-reject-proposal/dialog-reject-proposal.component';
import { DialogSeeVersionsComponent } from '../dialog-see-versions/dialog-see-versions.component';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';

@Component({
  selector: 'app-dialog-see-proposal',
  templateUrl: './dialog-see-proposal.component.html',
  styleUrls: ['./dialog-see-proposal.component.css']
})
export class DialogSeeProposalComponent implements OnInit {

  proposal: any = {
    id: this.proposalSee.id,
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
    dateVersion: this.proposalSee.dateVersion?.split('T')[0],
    folder: this.proposalSee.folder,
    wayToPay: this.proposalSee.wayToPay,
    wayToPayDays: this.proposalSee.wayToPayDays,
    creatorUser: this.proposalSee.creatorUser,
    comments: this.proposalSee.comments,
    commercialManager: this.proposalSee.commercialManager,
    presaleManager: this.proposalSee.presaleManager,
    proposalSubmissionDeadline: this.proposalSee.proposalSubmissionDeadline?.split('T')[0],
    editorUser: this.proposalSee.editorUser,
    rejectionUser: this.proposalSee.rejectionUser,
    rejectionDate: this.proposalSee.rejectionDate?.split('T')[0],
    rejectionComments: this.proposalSee.rejectionComments
  }
  fileService: any;
  toastr: any;
  arrayFiles: Array<string> = ['j', 'o']
  showEditorUser: boolean = false
  showRejected: boolean = false

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any,
  private businessProposalService: BusinessProposalService) { }

  ngOnInit(): void {
    console.log('proposalSee', this.proposalSee);

    const f = '2022-12-22T05:00:00.000+00:00'

    const nu = f.split('T')

    console.log('nu ', nu, '0 ', f.split('T')[0])

    if(this.proposal.version != 1){
      this.showEditorUser = true
    }
    if(this.proposal.stateP === "rechazado"){
      this.showRejected = true
    }

  }
  export(folder: any): void{

    console.log('folder', folder)
    const c = folder.split('/')
    console.log('C', c)

    this.businessProposalService.getFilesProposal(c[5]).subscribe((res: any) => {
      for (var i = 0; i < res.data.length ; i++) {
        console.log('arrayfile', res.data[i])
      const part = res.data[i].split(".").pop();
      console.log('part ', part)

          const u = `/opt/tomcat/webapps/archivospropuesta/${c[5]}/${res.data[i]}`
          console.log('u ', u)
        const downloadInstance = document.createElement('a');
      downloadInstance.href = u
      downloadInstance.target = '_blank'
      downloadInstance.download = `${res.data[i]}`
      downloadInstance.click()
      }
    })
  }

  openRecha(){
    this.dialog.open(DialogRejectProposalComponent, {
      width: '70%',
      data:this.proposalSee
    });
  }

  seeVersions(row: any){
    console.log('row', row)
    this.dialog.open(DialogSeeVersionsComponent, {
      maxHeight: '70vh',
      //width: '50%',
      data:row
    });
  }
}

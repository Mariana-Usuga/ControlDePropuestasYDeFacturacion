import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRejectProposalComponent } from '../dialog-reject-proposal/dialog-reject-proposal.component';
import { DialogSeeVersionsComponent } from '../dialog-see-versions/dialog-see-versions.component';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';

@Component({
  selector: 'app-dialog-see-proposal',
  templateUrl: './dialog-see-proposal.component.html',
  styleUrls: ['./dialog-see-proposal.component.css']
})
export class DialogSeeProposalComponent implements OnInit {

  getProposal: any = this.proposalSee[0]
  dateVersion: any = "";
  proposalSubmissionDeadline: any = "";
  rejectionDate: any = "";
  proposal: any ={}
  fileService: any;
  toastr: any;
  arrayFiles: Array<string> = ['j', 'o']
  showEditorUser: boolean = false
  showRejected: boolean = false
  showVersions: boolean = false;


  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any,
  private businessProposalService: BusinessProposalService) {
    //console.log('pro', this.proposal)
   }

  ngOnInit(): void {

     this.dateVersion = new Date(this.getProposal.dateVersion);
     this.proposalSubmissionDeadline = new Date(this.getProposal.proposalSubmissionDeadline);
     this.rejectionDate = new Date(this.getProposal.rejectionDate);

  this.proposal = { ... this.getProposal, 
    dateVersion: `${this.dateVersion.getMonth() + 1}
    /${this.dateVersion.getDate()}/${this.dateVersion.getFullYear()}`,
    proposalSubmissionDeadline: `${this.proposalSubmissionDeadline.getMonth() + 1}
    /${this.proposalSubmissionDeadline.getDate()}/${this.proposalSubmissionDeadline.getFullYear()}`,
    rejectionDate: `${this.rejectionDate.getMonth() + 1}
    /${this.rejectionDate.getDate()}/${this.rejectionDate.getFullYear()}`,
  }

  if(this.proposalSee[1].versions){
    this.showVersions = true
  }
    if(this.getProposal.version != 1){
      this.showEditorUser = true
    }
    if(this.getProposal.stateP === "RECHAZADO"){
      this.showRejected = true
  }

  }
  export(folder: any): void{
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

 seeVersions(row: any){
    //console.log('propos ', this.proposal)
    console.log('row ', this.proposalSee)
    //if(this.proposalSee[1] === true){
      //this.showVersions = true
    //}
    this.dialog.open(DialogSeeVersionsComponent, {
      maxHeight: '100vh',
      //width: '50%',
      data:row
    });
  }
}

/*proposal: any = {
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
  dateVersion: `${this.dateVersion.getMonth() + 1}
  /${this.dateVersion.getDate()}/${this.dateVersion.getFullYear()}`,
  folder: this.proposalSee.folder,
  wayToPay: this.proposalSee.wayToPay,
  wayToPayDays: this.proposalSee.wayToPayDays,
  creatorUser: this.proposalSee.creatorUser,
  comments: this.proposalSee.comments,
  commercialManager: this.proposalSee.commercialManager,
  presaleManager: this.proposalSee.presaleManager,
  proposalSubmissionDeadline: `${this.proposalSubmissionDeadline.getMonth() + 1}
  /${this.proposalSubmissionDeadline.getDate()}/${this.proposalSubmissionDeadline.getFullYear()}`,
  editorUser: this.proposalSee.editorUser,
  rejectionUser: this.proposalSee.rejectionUser,
  rejectionDate: `${this.rejectionDate.getMonth() + 1}
  /${this.rejectionDate.getDate()}/${this.rejectionDate.getFullYear()}`,
  rejectionComments: this.proposalSee.rejectionComments
}*/
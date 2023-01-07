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

  dateVersion = new Date(this.proposalSee.dateVersion);
  proposalSubmissionDeadline = new Date(this.proposalSee.proposalSubmissionDeadline);
  rejectionDate = new Date(this.proposalSee.rejectionDate);

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
  }
  fileService: any;
  toastr: any;
  arrayFiles: Array<string> = ['j', 'o']
  showEditorUser: boolean = false
  showRejected: boolean = false

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any,
  private businessProposalService: BusinessProposalService) { }

  ngOnInit(): void {
    const f = '2022-12-22T05:00:00.000+00:00'

    const nu = f.split('T')

    if(this.proposal.version != 1){
      this.showEditorUser = true
    }
    if(this.proposal.stateP === "RECHAZADO"){
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

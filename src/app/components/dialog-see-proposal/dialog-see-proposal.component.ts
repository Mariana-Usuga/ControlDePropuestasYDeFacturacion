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
  contact: any = {}
  files: Array<string>[] = []
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

  console.log('this.proposal.id ', this.proposal.id)
    this.businessProposalService.getContact(this.proposal.id).subscribe(
      (res) => {
        this.contact = res
      },
      (err) => console.log('ha ocurrido un error', err),
      () => console.info('se ha completado la llamada')
    )

    const c = this.proposal.folder.split('/')
    this.businessProposalService.getFilesProposal(c[5]).subscribe((res: any) => {
      for (var i = 0; i < res.data.length ; i++) {    
          const u = `/home/wilmar/projectsMariana/archivosPropuestas/${c[5]}/${res.data[i]}`
          this.files.push(res.data[i])
        }      
    })
  }


  export(folder: any): void{
    const c = folder.split('/')
    console.log('C', c)

    //this.businessProposalService.getFilesProposal(c[5]).subscribe((res: any) => {
      for (var i = 0; i < this.files.length ; i++) {
        console.log('arrayfile', this.files[i])
          //const u = `/opt/tomcat/webapps/archivospropuesta/${c[5]}/${res.data[i]}`
          const u = `/home/wilmar/projectsMariana/archivosPropuestas/${c[5]}/${this.files[i]}`
          console.log('u ', u)
        const downloadInstance = document.createElement('a');
      downloadInstance.href = u
      downloadInstance.target = '_blank'
      downloadInstance.download = `${this.files[i]}`
      downloadInstance.click()
      }
    //})
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

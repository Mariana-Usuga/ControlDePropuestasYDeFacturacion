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
    dateVersion: this.proposalSee.dateVersion,
    folder: this.proposalSee.folder,
    wayToPay: this.proposalSee.wayToPay,
    wayToPayDays: this.proposalSee.wayToPayDays,
    creatorUser: this.proposalSee.creatorUser,
  }
  fileService: any;
  toastr: any;
  arrayFiles: Array<string> = []

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any,
  private businessProposalService: BusinessProposalService) { }

  ngOnInit(): void {
    console.log('proposalSee', this.proposalSee);

  }
  export(folder: any): void{ 

    console.log('folder', folder)
    const c = folder.split('\\')
    console.log('C', c)

    this.businessProposalService.getFilesProposal(c[5]).subscribe((res: any) => {
      this.arrayFiles = res.data
      //res.data.map((r) => {
        console.log('date', res.data)
      //})
      //this.dates = obj
    })
    //for (let fi of this.arrayFiles) {
      console.log('arrayfile', this.arrayFiles)
      const downloadInstance = document.createElement('a');
      //`${URL}/hito/`
      downloadInstance.href = `file://C://Users//Mariana//Desktop//dataProposa//${c[5]}//Libro.xlsx`
      downloadInstance.target = '_blank'
      downloadInstance.download = 'descarga.xlsx'
      downloadInstance.click()
    //}

   /* const downloadInstanc = document.createElement('a');
    downloadInstanc.href = 'assets/my_export_export_proposal(2).xlsx'
    downloadInstanc.target = '_blank'
    downloadInstanc.download = 'mariana2'
    downloadInstanc.click()*/
  }

  openDialogApprove(){
    console.log('entra approvee!!!!')
    /*console.log('arrayfile', this.arrayFiles)
    this.dialog.open(DialogApproveProposalComponent, {
      width: '70%',
      data:this.proposalSee
    });*/
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
      width: '50%',
      data:row
    });
  }
}

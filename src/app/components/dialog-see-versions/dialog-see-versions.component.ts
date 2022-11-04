import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { DialogSeeProposalComponent } from '../dialog-see-proposal/dialog-see-proposal.component';

@Component({
  selector: 'app-dialog-see-versions',
  templateUrl: './dialog-see-versions.component.html',
  styleUrls: ['./dialog-see-versions.component.css']
})
export class DialogSeeVersionsComponent implements OnInit {

  dataSource: any[] = [];

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any,
  private businessProposalService: BusinessProposalService
  ) { }

  ngOnInit(): void {
    console.log('this.proposalSee', this.proposalSee)
    this.businessProposalService.getByVersionProposal(this.proposalSee.idVersionMismaPropuesta).subscribe(
      (res)=>{
        console.log('res', res)
        for(let le of res){
          this.dataSource.push({
              fechaVersion: le.fechaVersion,
              version: le.version
          })
        }
      },
      (err) => console.log('ha ocurrido un error', err),
          () => console.info('se ha completado la llamada')
    )
  }

  seeProposal(){
    console.log('seee proposal', this.proposalSee)
    this.dialog.open(DialogSeeProposalComponent, {
      width: '70%',
      data: this.proposalSee
    });
  }

}

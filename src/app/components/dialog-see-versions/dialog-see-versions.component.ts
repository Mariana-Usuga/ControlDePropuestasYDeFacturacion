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
  noMoreVersions: boolean = false;

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any,
  private businessProposalService: BusinessProposalService
  ) { }

  ngOnInit(): void {
    console.log('this.proposalSee.proposalId', this.proposalSee.id)
    if(this.proposalSee.id === undefined){
      this.noMoreVersions = true
      return
    }else{
      this.businessProposalService.getByVersionProposal(this.proposalSee.id).subscribe(
        (res)=>{
          console.log('res', res)
          if(res.length === 0){
            this.noMoreVersions = true
            return
          }else{
            for(let le of res){
              const gf = Date.parse(le.dateVersion)
              const h = new Date(gf)
              console.log('d', h.getMonth())
              const d = `${h.getFullYear()}/${h.getMonth()}/${h.getDay()}`
              this.dataSource.push({
                dateVersion: d,
                version: le.version
              })
            console.log('ddata source', this.dataSource)
          }
          }
        },
        (err) => console.log('ha ocurrido un error', err),
            () => console.info('se ha completado la llamada')
      )
    }
  }

  seeProposal(){
    console.log('seee proposal', this.proposalSee)
    this.dialog.open(DialogSeeProposalComponent, {
      width: '70%',
      data: this.proposalSee
    });
  }

}

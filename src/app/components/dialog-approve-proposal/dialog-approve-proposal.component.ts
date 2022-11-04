import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';

@Component({
  selector: 'app-dialog-approve-proposal',
  templateUrl: './dialog-approve-proposal.component.html',
  styleUrls: ['./dialog-approve-proposal.component.css']
})
export class DialogApproveProposalComponent implements OnInit {

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public proposalSee: any) { }

  ngOnInit(): void {
    this.businessProposalService.putStateOfProposal(this.proposalSee).subscribe(
      (res) => {
        console.log('res', res)
      },
      (err) => console.log('ha ocurrido un error', err),
          () => console.info('se ha completado la llamada')
    )
  }

}

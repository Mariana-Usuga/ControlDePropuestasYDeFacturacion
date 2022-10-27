import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeeProposalComponent } from '../dialog-see-proposal/dialog-see-proposal.component';

@Component({
  selector: 'app-dialog-see-versions',
  templateUrl: './dialog-see-versions.component.html',
  styleUrls: ['./dialog-see-versions.component.css']
})
export class DialogSeeVersionsComponent implements OnInit {

  dataSource: any[] = [{
      v: "V1",
      fecha: '10/05/2020'
    },
    {
      v: "V2",
      fecha: '10/05/2020'
    }]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  seeProposal(){
    console.log('seee proposal')
    this.dialog.open(DialogSeeProposalComponent, {
      width: '70%',
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { DialogApproveProposalComponent } from '../dialog-approve-proposal/dialog-approve-proposal.component';

@Component({
  selector: 'app-dialog-see-proposal',
  templateUrl: './dialog-see-proposal.component.html',
  styleUrls: ['./dialog-see-proposal.component.css']
})
export class DialogSeeProposalComponent implements OnInit {

  proposal: commercialProposal = {
    cliente: this.proposalSee.cliente,
    empresa: this.proposalSee.empresa,
    mes: this.proposalSee.mes,
    clienteReferencia: this.proposalSee.clienteReferencia,
    year: this.proposalSee.year,
    conceptoServicio: this.proposalSee.conceptoServicio,
    tipoDeServicio: this.proposalSee.tipoDeServicio,
    estado: this.proposalSee.estado,
    garantia: this.proposalSee.garantia,
    moneda: this.proposalSee.moneda,
    montoBase: this.proposalSee.montoBase,
    montoTotal: this.proposalSee.montoTotal,
    version: this.proposalSee.version,
    idVersionMismaPropuesta: this.proposalSee.idVersionMismaPropuesta
  }

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public proposalSee: any) { }

  ngOnInit(): void {
  }

  openDialogApprove(){
    this.dialog.open(DialogApproveProposalComponent, {
      width: '70%',
    });
  }

}

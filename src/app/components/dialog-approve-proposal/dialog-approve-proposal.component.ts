import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';

@Component({
  selector: 'app-dialog-approve-proposal',
  templateUrl: './dialog-approve-proposal.component.html',
  styleUrls: ['./dialog-approve-proposal.component.css']
})
export class DialogApproveProposalComponent implements OnInit {

  constructor( private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public proposalSee: any) { }

    cambio: any = {
      id: this.proposalSee.id,
      cliente: this.proposalSee.cliente,
      empresa: this.proposalSee.empresa,
      mes: this.proposalSee.mes,
      clienteReferencia: this.proposalSee.clienteReferencia,
      year: this.proposalSee.year,
      conceptoServicio: this.proposalSee.conceptoServicio,
      tipoDeServicio: this.proposalSee.tipoDeServicio,
      estado: "aprobado",
      garantia: this.proposalSee.garantia,
      moneda: this.proposalSee.moneda,
      montoBase: this.proposalSee.montoBase,
      montoTotal: this.proposalSee.montoTotal,
      version: this.proposalSee.version,
      idVersionMismaPropuesta: this.proposalSee.idVersionMismaPropuesta
    }

  ngOnInit(): void {
    this.businessProposalService.putStateOfProposal(this.cambio).subscribe(
      (res) => {
        console.log('res', res)
      },
      (err) => console.log('ha ocurrido un error', err),
          () => console.info('se ha completado la llamada')
    )
  }

}

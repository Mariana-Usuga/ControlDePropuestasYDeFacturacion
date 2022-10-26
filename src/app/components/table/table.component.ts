import { Component, Input, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProposalComponent } from '../dialog-add-proposal/dialog-add-proposal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  nam: string;
  positio: number;
  weigh: number;
  symbo: string;
}

export interface Fil {
  cliente: string;
  clienteReferencia: string;
  anio: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private businessProposalService: BusinessProposalService, public dialog: MatDialog){}

  filtrosObject: any = {
    cliente: "",
    clienteReferencia: "",
    anio: "",
    conceptoDeServicio: "",
    tipoDeServicio: "",
    estado: "",
    garantia: "",
    moneda: "",
    montoBase: "",
    montoTotal: "",
    empresa: "",
    mes: ""
  }

  dataSource: commercialProposal[] = [];

  ngOnInit(): void {
    //this.dataSource = []
    console.log('entra table ngOnInit')
    this.businessProposalService.getFiltros().subscribe(obj => {
      console.log('obj', obj)
      this.filtrosObject = obj
    })

  }

buscar(){
  console.log('entra en buscar')
  this.dataSource = this.businessProposalService.getBusinessProposal()
}

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(DialogAddProposalComponent, {
    width: '50%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

}

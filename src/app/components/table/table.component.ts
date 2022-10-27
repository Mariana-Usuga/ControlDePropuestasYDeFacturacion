import { Component, Input, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogAddProposalComponent } from '../dialog-add-proposal/dialog-add-proposal.component';
import Swal from 'sweetalert2';
import { DialogSeeVersionsComponent } from '../dialog-see-versions/dialog-see-versions.component';

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

  subcription: Subscription | undefined;

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
    /*console.log('entra table ngOnInit')
    this.businessProposalService.getFiltros().subscribe(obj => {
      console.log('obj', obj)
      this.filtrosObject = obj
    })*/
    this.dataSource = this.businessProposalService.getBusinessProposal()
  }

buscar(){
  console.log('entra en buscar', this.dataSource)
  this.dataSource = this.businessProposalService.getBusinessProposal()
}

editProposal(row: any){
  this.dialog.open(DialogAddProposalComponent, {
    width: '70%',
    data:row
  });
}

deleteProposal(id: number){
  console.log('entra en delete')
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estas seguro?',
    text: "Estas seguro de eliminar esta propuesta!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminarla!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.subcription = this.businessProposalService.deleteProposal(id)?.subscribe((v: boolean) => {
        if(v){
          swalWithBootstrapButtons.fire(
            'Eliminada!',
            'La propuesta ha sido eliminada.',
            'success'
          )
        }
      })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
    }
  })
 }

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(DialogAddProposalComponent, {
    width: '70%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

seeVersions(){
  this.dialog.open(DialogSeeVersionsComponent, {
    width: '70%',
  });
}
}

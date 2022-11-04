import { Component, Input, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogAddProposalComponent } from '../dialog-add-proposal/dialog-add-proposal.component';
import { DialogSeeVersionsComponent } from '../dialog-see-versions/dialog-see-versions.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  subcription: Subscription | undefined;

  constructor(private businessProposalService: BusinessProposalService, public dialog: MatDialog){}

  filtrosObject: commercialProposal= {
    empresa: null,
    cliente: "",
    clienteReferencia: null,
    year: null,
    mes: null,
    conceptoServicio: null,
    tipoDeServicio: null,
    moneda: null,
    montoBase: null,
    montoTotal: null,
    estado: null,
    garantia: null,
    version: null,
    idVersionMismaPropuesta: null
  }

  mayor: commercialProposal = {
    cliente: '',
    empresa: null,
    mes: null,
    clienteReferencia: null,
    year: null,
    conceptoServicio: null,
    tipoDeServicio: null,
    estado: null,
    garantia: null,
    moneda: null,
    montoBase: null,
    montoTotal: null,
    version: null,
    idVersionMismaPropuesta: null
  };

  dataSource: commercialProposal[] = [];

  ngOnInit(): void {
    this.businessProposalService.getFiltros().subscribe(obj => {
      console.log('obj', obj)
      this.filtrosObject = obj
    })
  }

buscar(){
  let aqui: commercialProposal;
  this.businessProposalService.getBusinessProposal(this.filtrosObject).subscribe(
    (res) => {
      console.log('res', res)

      let lookupObject: any = {};
      const prop = "idVersionMismaPropuesta"

      for(var a in res) {
         lookupObject[res[a][prop]] = res[a];
      }

      for(a in lookupObject) {
          this.dataSource.push(lookupObject[a]);
      }
    },
    (err) => console.log('ha ocurrido un error', err),
    () =>  {
      console.info('se ha completado la llamada')
    }
  )
}

editProposal(row: commercialProposal){
  console.log(' this.dataSource', this.dataSource)
  this.dialog.open(DialogAddProposalComponent, {
    width: '70%',
    data:row
  });
}

/*deleteProposal(id: number){
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
      /*result.dismiss === Swal.DismissReason.cancel
    ) {
    }
  })
 }*/

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(DialogAddProposalComponent, {
    width: '70%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

seeVersions(row: commercialProposal){
  this.dialog.open(DialogSeeVersionsComponent, {
    width: '70%',
    data:row
  });
}
}

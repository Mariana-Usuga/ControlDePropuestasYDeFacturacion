import { Component, Inject, OnInit } from '@angular/core';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddProposalComponent } from '../dialog-add-proposal/dialog-add-proposal.component';
import { DialogSeeVersionsComponent } from '../dialog-see-versions/dialog-see-versions.component';
import Swal from 'sweetalert2';
import { DialogSeeProposalComponent } from '../dialog-see-proposal/dialog-see-proposal.component';
import { DialogApproveProposalComponent } from '../dialog-approve-proposal/dialog-approve-proposal.component';
import { DialogRejectProposalComponent } from '../dialog-reject-proposal/dialog-reject-proposal.component';
import { DialogAddCustomersComponent } from '../dialog-add-customers/dialog-add-customers.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dis: boolean = true;
  subcription: Subscription | undefined;


  constructor(private businessProposalService: BusinessProposalService,
     public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public editData: any){}

  filtrosObject: commercialProposal= {
    code: null,
    company: null,
    customer: null,
    customerReference: null,
    servicioConcept: null,
    typeOfService: null,
    currency: null,
    stateP: null,
    baseAmount: null,
    totalAmount: null,
    version: null,
    dateVersion: null,
    proposalId: null,
    folder: null,
    wayToPay: null,
    wayToPayDays: null,
    creatorUser: null,
  }

  dates: any = {
    start: '2000-01-01', 
    end: '2050-12-30'
  }

  mayor: commercialProposal = {
    code: null,
    company: null,
    customer: "",
    customerReference: null,
    servicioConcept: null,
    typeOfService: null,
    currency: null,
    stateP: null,
    baseAmount: null,
    totalAmount: null,
    version: null,
    dateVersion: null,
    proposalId: null,
    folder: null,
    wayToPay: null,
    wayToPayDays: null,
    creatorUser: null,
  };
    //Monto_Base: item.baseAmount;

  dataSource: any[] = [];

  data: any[] = []

  ngOnInit(): void {
    console.log('en table')
    this.businessProposalService.getFiltros().subscribe(obj => {
      console.log('obj', obj)
      this.filtrosObject = obj
    })

    this.businessProposalService.getFiltrosDate().subscribe(obj => {
      console.log('date', obj)
      this.dates = obj
    })

    this.businessProposalService.getProposals().subscribe(obj => {
      console.log('EDIATDOO nuevos ', obj)
      this.dataSource = obj
    })
  }

  state(state: string){
    if(state === "APROBADO" || state === "RECHAZADO"){
      console.log('aprobado')
      this.dis = false;
    }
  }

  export(): void{
    this.dataSource.map((item: any) => {
        this.data.push({id: item.id,
        MontoBase:item.baseAmount,
        Codigo: item.code,
        Comentarios: item.comment,
        Responsable_Comercial: item.commercialManager,
        Empresa: item.company,
        Usuario_Creador: item.creatorUser,
        Moneda: item.currency,
        Cliente: item.customer,
        Cliente_Referencia: item.customerReference,
        Fecha_Creacion: item.dateVersion,
        Usuario_Editor: item.editorUser,
        Carpeta: item.folder,
        Rsponsable_preventa: item.presaleManager,
        Fecha_limite_envio_propuesta: item.proposalSubmissionDeadline,
        Comentarios_rechazo: item.rejectionComments,
        Fecha_de_rechazo: item.rejectionDate,
        Quien_rechazo: item.rejectionUser,
        Concepto_del_servicio: item.servicioConcept,
        Estado: item.stateP,
        Base_Total: item.totalAmount,
        Tipo_de_servicio: item.typeOfService,
        Version: item.version,
        Forma_de_pago: item.wayToPay,
        Dias_de_pago: item.wayToPayDays })
    })
    console.log('this', this.data)
    this.businessProposalService.exportToExcel(this.data, 'propuestas')
  }

buscar(){
  const inputDate = document.getElementById('#inputDate')
    inputDate?.click()
    /*if(this.filtrosObject.customer === ""){
      this.businessProposalService.getAllProposal().subscribe(
        (res: any) => {
          console.log('res', res)
          this.dataSource = res
        }
      )
    }else{*/
    console.log('this', this.dates)
        this.businessProposalService.getBusinessProposal(this.filtrosObject, this.dates).subscribe(
          (res) => {
            if(res.length === 0){
              alert('No hay propuestas')
            }else{
              console.log('res', res)
              //this.businessProposalService.addProposals(res)
              this.dataSource = res
            }
          },
          (err) => console.log('ha ocurrido un error', err),
          () =>  {
            console.info('se ha completado la llamada')
          }
        )
    //}
}

editProposal(row: commercialProposal){
  console.log('entra en editar')
  //console.log(' this.dataSource', this.dataSource)
  const array = [
    row,
    this.filtrosObject,
    this.dates
  ]
  this.dialog.open(DialogAddProposalComponent, {
    maxHeight: '100vh',
    data:array,
  });
}

hostoricalProposal(row: commercialProposal){
  this.dialog.open(DialogSeeVersionsComponent, {
    maxHeight: '70vh',
    data:row
  });
}

consultProposal(pro: any){
  const data = [
    pro,
    { versions: false }
  ]
  this.dialog.open(DialogSeeProposalComponent, {
    maxHeight: '100vh',
    data: data
  });
}

deleteProposal(proposal: any, id: number){
  console.log('entra en delete')
  
  if(proposal.stateP != "PENDIENTE"){
    alert('no puedes eliminar esta propuesta')
    return
  }else{
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
        this.dataSource = this.dataSource.filter(x => x != proposal)
        this.subcription = this.businessProposalService.deleteProposal(id).subscribe(
          (v: any) => {
            if(v.success){
              this.businessProposalService.deleteProposalVersion(proposal.code).subscribe(
                (res: any) => {
                  if(res.success){
                    this.businessProposalService.deleteContact(proposal.id).subscribe(
                      (res: any) => {
                        if(res.success){
                          swalWithBootstrapButtons.fire(
                            'Eliminada!',
                            'La propuesta ha sido eliminada.',
                            'success'
                          )
                        }
                      }
                    )
                  }
                }
              )
            }
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

 }

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  const array = [
    {},
    this.filtrosObject,
    this.dates
  ]
  this.dialog.open(DialogAddProposalComponent, {
    maxHeight: '100vh',
    enterAnimationDuration,
    exitAnimationDuration,
    data:array
  });
}

openDialogApprove(row: any){
  const array = [
    row,
    this.filtrosObject,
    this.dates
  ]
  console.log('apro table', row)
  if(row.stateP != "PENDIENTE"){
    alert('No puedes realizar esta accion')
    document.getElementById(row.code)?.classList.add('disabled')
  }else{
    this.dialog.open(DialogApproveProposalComponent, {
      //width: '70%',
      maxHeight: '70vh',
      data:array
    });
  }
}

openDialogCreateCustomers(){
  console.log('clientes')
  this.dialog.open(DialogAddCustomersComponent, {
    maxHeight: '70vh',
    //width: '70%',
  });
}

openRecha(row: any){
  const array = [
    row,
    this.filtrosObject,
    this.dates
  ]
  if(row.stateP != "PENDIENTE"){
    alert('no puedes hacer esta accion')
    document.getElementById(row.code)?.classList.add('disabled')
  }else{
  this.dialog.open(DialogRejectProposalComponent, {
    maxHeight: '70vh',
    data: array
  });
  }
}

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';
import { BusinessProposalService } from 'src/app/services/business-proposal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-proposal',
  templateUrl: './dialog-add-proposal.component.html',
  styleUrls: ['./dialog-add-proposal.component.css']
})
export class DialogAddProposalComponent implements OnInit {

  newProposal!: FormGroup
  accionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder,
    private businessProposalService: BusinessProposalService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogAddProposalComponent>) { }

  ngOnInit(): void {
    console.log('this.editData', this.editData)
    let idVersion =  Math.floor(Math.random() * (10000 - 100) + 100);
    let v = 1
    let base = String(this.editData?.montoBase)
    let total =  String(this.editData?.montoTotal)
    if(this.editData != null){
      idVersion = this.editData.idVersionMismaPropuesta;
      v = this.editData.version + 1;
      console.log('EDIT', this.editData)
    }else{
    }

    this.newProposal = this.formBuilder.group({
      //id: [this.editData.id, Validators.required],
      empresa: ['', Validators.required],
      cliente: ['', Validators.required],
      clienteReferencia: [''],
      year: [''],
      mes: ['', Validators.required],
      conceptoServicio: [''],
      tipoDeServicio: ['', Validators.required],
      moneda: [''],
      estado: [''],
      montoBase: [''],
      montoTotal: [''],
      garantia: [''],
      version: [2, Validators.required],
      fechaVersion: [new Date(), Validators.required],
      idVersionMismaPropuesta: [1, Validators.required]
    })

    if(this.editData){
      this.accionBtn = "Editar"
      this.newProposal.controls['empresa'].setValue(this.editData.empresa)
      this.newProposal.controls['cliente'].setValue(this.editData.cliente)
      this.newProposal.controls['clienteReferencia'].setValue(this.editData.clienteReferencia)
      this.newProposal.controls['conceptoServicio'].setValue(this.editData.conceptoServicio)
      this.newProposal.controls['tipoDeServicio'].setValue(this.editData.tipoDeServicio)
      this.newProposal.controls['year'].setValue(this.editData.year)
      this.newProposal.controls['mes'].setValue(this.editData.mes)
      this.newProposal.controls['estado'].setValue(this.editData.estado)
      this.newProposal.controls['garantia'].setValue(this.editData.garantia)
      this.newProposal.controls['montoBase'].setValue(this.editData.montoBase)
      this.newProposal.controls['montoTotal'].setValue(this.editData.montoTotal)
      this.newProposal.controls['moneda'].setValue(this.editData.moneda)
    }
  }

  addProposal(){
    if(!this.editData){
        this.businessProposalService.addNewProposal(this.newProposal.value).subscribe(
          (res) => {
            console.log('res', res)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La propuesta se ha creado',
              showConfirmButton: false,
              timer: 2000
            })
          },
          (err) => console.log('ha ocurrido un error', err),
          () => console.info('se ha completado la llamada')
        )
        this.newProposal.reset()
        this.dialogRef.close('save')
  }else{
    console.log('entra en update')
    this.updateProposal();
  }

}

  updateProposal(){
    console.log('entra en editar', this.newProposal.value)
    this.businessProposalService.addNewProposal(this.newProposal.value).subscribe(
      (res) => {
        console.log('res', res)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La propuesta se ha creado',
          showConfirmButton: false,
          timer: 4000
        })
      },
      (err) => console.log('ha ocurrido un error', err),
      () => console.info('se ha completado la llamada')
    )
    this.newProposal.reset()
    this.dialogRef.close('Editar')
  }


}

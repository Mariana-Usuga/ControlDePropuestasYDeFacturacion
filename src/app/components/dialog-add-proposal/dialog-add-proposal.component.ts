import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PROPOSAL } from 'src/app/mocks/commercialProposal.mocks';
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
    this.newProposal = this.formBuilder.group({
      empresa: ['', Validators.required],
      cliente: ['', Validators.required],
      clienteReferencia: ['', Validators.required],
      conceptoDeServicio: ['', Validators.required],
      tipoDeServicio: ['', Validators.required],
      anio: ['', Validators.required],
      mes: ['', Validators.required],
      estado: ['', Validators.required],
      garantia: ['', Validators.required],
      montoBase: ['', Validators.required],
      montoTotal: ['', Validators.required],
      moneda: ['', Validators.required],
    })

    if(this.editData){
      this.accionBtn = "Editar"
      this.newProposal.controls['empresa'].setValue(this.editData.empresa)
      this.newProposal.controls['cliente'].setValue(this.editData.cliente)
      this.newProposal.controls['clienteReferencia'].setValue(this.editData.clienteReferencia)
      this.newProposal.controls['conceptoDeServicio'].setValue(this.editData.conceptoDeServicio)
      this.newProposal.controls['tipoDeServicio'].setValue(this.editData.tipoDeServicio)
      this.newProposal.controls['anio'].setValue(this.editData.anio)
      this.newProposal.controls['mes'].setValue(this.editData.mes)
      this.newProposal.controls['estado'].setValue(this.editData.estado)
      this.newProposal.controls['garantia'].setValue(this.editData.garantia)
      this.newProposal.controls['montoBase'].setValue(this.editData.montoBase)
      this.newProposal.controls['montoTotal'].setValue(this.editData.montoTotal)
      this.newProposal.controls['moneda'].setValue(this.editData.moneda)
    }
    console.log('editData', this.editData)
  }

  addProposal(){
    if(!this.editData){
      //if(this.newProposal.valid){
        this.businessProposalService.addNewProposal(this.newProposal.value)
        this.newProposal.reset()
        this.dialogRef.close('save')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La propuesta se ha creado',
          showConfirmButton: false,
          timer: 2000
        })
      //}else{
        //console.log('FALSEEE', this.newProposal)
      //}
    }else{
      this.updateProposal()
    }

  }
  updateProposal(){
    console.log('entra en editar')
    this.businessProposalService.putProposal(this.newProposal.value, this.editData.cliente)
    this.newProposal.reset()
    this.dialogRef.close('Editar')
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'La propuesta se ha creado',
      showConfirmButton: false,
      timer: 4000
    })
  }

  nose(){
    console.log('PROPOSAl', PROPOSAL)
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

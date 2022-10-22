import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { commercialProposal } from 'src/app/models/interfaces/commercialProposal.interfaces';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  empresa = [ 'CSTI', 'CS', 'CST']
  clienteReferencia = ['COLSUBSIDIO', 'COLSUBSID', 'COLSUBSI']
  cliente = ['C1', 'C2', 'C3']
  anio = [2018, 2020, 2019, 2017]
  mes = ['oct', 'nov', 'dic', 'ene', 'feb', 'mar']
  tipoServicio = ['t1', 't2', 't3', 't4', 't5']
  estado = ['pendiente', 'rechazado', 'aprobado']
  moneda = ['dolar']

  filtersLabel = ['Cliente', 'Cliente referencia', 'Tipo de servicio', 'Empresa factura',
  'Año', 'Mes', 'Moneda', 'Estado']
  dataSource: MatTableDataSource<commercialProposal> | any

  constructor() { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.filterBySubject();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    console.log('this.dataSource.filter', this.dataSource.filter)
}

filterBySubject() {
  let filterFunction = 
      (data: commercialProposal, filter: string): boolean => {
        if (filter) {
          const subjects = data.empresa;
          for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].indexOf(filter) != -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
     };
  return filterFunction;
}

}

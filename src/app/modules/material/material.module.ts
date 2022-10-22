import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    //MatTableDataSource,
  ]
})

export class MaterialModule { }

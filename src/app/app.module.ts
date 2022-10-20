import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SelectComponent } from './components/select/select.component';
import { FilterComponent } from './components/filter/filter.component';
import { ColumnComponent } from './components/column/column.component';
import { ProposalFilterPipe } from './pipes/proposal-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    NavBarComponent,
    SelectComponent,
    FilterComponent,
    ColumnComponent,
    ProposalFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //importamos el modulo personalisado de modulos de angular material
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

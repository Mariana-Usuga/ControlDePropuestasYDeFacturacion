import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProposalFilterPipe } from './pipes/proposal-filter.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAddProposalComponent } from './components/dialog-add-proposal/dialog-add-proposal.component';
import { DialogSeeVersionsComponent } from './components/dialog-see-versions/dialog-see-versions.component';
import { DialogSeeProposalComponent } from './components/dialog-see-proposal/dialog-see-proposal.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    NavBarComponent,
    ProposalFilterPipe,
    HomeComponent,
    DialogAddProposalComponent,
    DialogSeeVersionsComponent,
    DialogSeeProposalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //importamos el modulo personalisado de modulos de angular material
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

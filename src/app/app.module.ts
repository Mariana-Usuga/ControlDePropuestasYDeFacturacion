import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { DialogApproveProposalComponent } from './components/dialog-approve-proposal/dialog-approve-proposal.component';
import { DialogRejectProposalComponent } from './components/dialog-reject-proposal/dialog-reject-proposal.component';
import { FileUploadComponentComponent } from './components/file-upload-component/file-upload-component.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogAddCustomersComponent } from './components/dialog-add-customers/dialog-add-customers.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

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
    DialogSeeProposalComponent,
    DialogApproveProposalComponent,
    DialogRejectProposalComponent,
    FileUploadComponentComponent,
    DialogAddCustomersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //importamos el modulo personalisado de modulos de angular material
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }



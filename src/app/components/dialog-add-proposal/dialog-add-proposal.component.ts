import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-add-proposal',
  templateUrl: './dialog-add-proposal.component.html',
  styleUrls: ['./dialog-add-proposal.component.css']
})
export class DialogAddProposalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

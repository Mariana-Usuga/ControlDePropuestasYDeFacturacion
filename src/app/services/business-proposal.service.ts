import { Injectable } from '@angular/core';
import { PROPOSAL } from '../mocks/commercialProposal.mocks';
import { commercialProposal } from '../models/interfaces/commercialProposal.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BusinessProposalService {

  constructor() { }

  getBusinessProposal(): commercialProposal[] {
    return PROPOSAL
  }
}

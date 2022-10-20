import { TestBed } from '@angular/core/testing';

import { BusinessProposalService } from './business-proposal.service';

describe('BusinessProposalService', () => {
  let service: BusinessProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

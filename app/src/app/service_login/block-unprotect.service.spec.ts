/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlockUnprotectService } from './block-unprotect.service';

describe('Service: BlockUnprotect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockUnprotectService]
    });
  });

  it('should ...', inject([BlockUnprotectService], (service: BlockUnprotectService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginInGuardService } from './login-in-guard.service';

describe('Service: LoginInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginInGuardService]
    });
  });

  it('should ...', inject([LoginInGuardService], (service: LoginInGuardService) => {
    expect(service).toBeTruthy();
  }));
});

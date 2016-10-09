/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfilService } from './profil.service';

describe('Service: Profil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilService]
    });
  });

  it('should ...', inject([ProfilService], (service: ProfilService) => {
    expect(service).toBeTruthy();
  }));
});

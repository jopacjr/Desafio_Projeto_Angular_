import { TestBed } from '@angular/core/testing';

import { Automavel } from './automavel';

describe('Automavel', () => {
  let service: Automavel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Automavel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

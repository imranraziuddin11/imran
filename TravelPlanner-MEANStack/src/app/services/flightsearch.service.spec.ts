import { TestBed } from '@angular/core/testing';

import { FlightsearchService } from './flightsearch.service';

describe('FlightsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightsearchService = TestBed.get(FlightsearchService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BuildPackageService } from './build-package.service';

describe('BuildPackageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildPackageService = TestBed.get(BuildPackageService);
    expect(service).toBeTruthy();
  });
});

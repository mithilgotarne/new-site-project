/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { InfoService } from './info.service';

describe('Info Service', () => {
  beforeEachProviders(() => [InfoService]);

  it('should ...',
      inject([InfoService], (service: InfoService) => {
    expect(service).toBeTruthy();
  }));
});

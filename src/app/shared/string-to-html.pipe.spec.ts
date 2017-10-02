/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { StringToHtmlPipe } from './string-to-html.pipe';

describe('Pipe: StringToHtml', () => {
  it('create an instance', () => {
    let pipe = new StringToHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});

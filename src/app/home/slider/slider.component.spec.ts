/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SliderComponent } from './slider.component';

describe('Component: Slider', () => {
  it('should create an instance', () => {
    let component = new SliderComponent();
    expect(component).toBeTruthy();
  });
});

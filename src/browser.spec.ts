import browser from './browser';
import { expect } from 'chai';
import 'mocha';

describe('Browser', () => {

  it('It Should expect open to be function', () => {
    expect(typeof browser.open).to.equals('function');
  });
});

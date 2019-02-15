import { edit } from './index';
import { expect } from 'chai';
import 'mocha';

describe('OpenApi Editor', () => {

  it('It Should expect edit to be function', () => {
    expect(typeof edit).to.equals('function');
  });
});

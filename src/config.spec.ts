import config from './config';
import { expect } from 'chai';
import 'mocha';

describe('Config', () => {

  it('It Should expect config to be object', () => {
    expect(typeof config).to.equals('object');
  });
});

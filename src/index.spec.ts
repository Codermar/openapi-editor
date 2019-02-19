// tslint:disable: no-unused-expression
import { edit } from './index';
import { expect } from 'chai';
import 'mocha';
import fs from 'fs';
import path from 'path';

describe('OpenApi Editor', () => {
  let swaggerFile: string;

  before((done) => {
    // console.log(':::swaggerFile', swaggerFile);
    swaggerFile = path.resolve(__dirname, '..', 'test', './api/oas/oas-v1.yaml');
    done();
  });

  it('It Should expect edit to be function', () => {
    expect(typeof edit).to.equals('function');
  });

  it('It should return true when the test swaggerFile exists', () => {
    const exists = fs.existsSync(swaggerFile);
    expect(exists).to.be.true;
  });
});

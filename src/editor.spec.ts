// tslint:disable: no-unused-expression
import { edit } from './editor';
import { expect } from 'chai';
import 'mocha';
import fs from 'fs';
import path from 'path';

describe('OpenApi Editor', () => {
  let swaggerFile: string;

  before((done) => {
    swaggerFile = path.resolve(__dirname, '..', 'examples', './api/v1/api.yaml');
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

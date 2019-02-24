// tslint:disable: no-unused-expression
import fs from 'fs';
import config from './config';
import { expect } from 'chai';
import 'mocha';
// import mock from 'mock-fs';

describe('Config', () => {

  it('It Should expect config to be object', () => {
    expect(typeof config).to.equals('object');
  });

  it('It should return true when config.nodeModules path exists', () => {
    const exists = fs.existsSync(config.nodeModules);
    expect(exists).to.be.true;
  });

  it('It should return true when config.editorPath path exists', () => {
    const exists = fs.existsSync(config.editorPath);
    expect(exists).to.be.true;
  });

  // TODO: look into using mock-fs
  // it('test mock', () => {
  //   mock({
  //     'sample-file.txt': 'This is file content',
  //     'path': {
  //       to: {
  //         'sub-dir': {
  //           'another-file.md': 'Markdown content'
  //         }
  //       }
  //     }
  //   });
  // });
});

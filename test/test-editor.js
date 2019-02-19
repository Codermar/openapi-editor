const editor = require('../dist');
const path = require('path');
const oasFilePath = path.resolve(__dirname, '..', 'test', './api/oas/oas-v1.yaml');

const options = {
  oasFilePath,
  // port: 10010,
  silent: false,
};
editor.edit(options);


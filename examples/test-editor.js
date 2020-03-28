const openApiEditor = require('../dist/editor');
const path = require('path');
const oasFilePath = path.resolve(__dirname, 'api/v1/api.yaml');

const options = {
  file: oasFilePath,
  port: 10010,
  silent: false,
};

openApiEditor.edit(options);
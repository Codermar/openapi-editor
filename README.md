# openapi-editor

OpenAPI Editor is a wrapper for Swagger-Editor 3.x".

## Features

* Edit, validate, and save your [Open API specifications](https://github.com/OAI/OpenAPI-Specification) yaml file in the browser using [Swagger Editor](https://github.com/swagger-api/swagger-editor).
* Additional Features provided by [Swagger Editor](https://github.com/swagger-api/swagger-editor)

[![Build Status](https://travis-ci.org/<username>/<reponame>.svg?branch=master)](https://travis-ci.org/<username>/<reponame>)
[![Coverage Status](https://coveralls.io/repos/github/<username>/<reponame>/badge.svg?branch=master)](https://coveralls.io/github/<username>/<reponame>?branch=master)

## Installation

  ```npm i openapi-editor``` 
  
  *Optional global install* ```npm i openapi-editor -g```

## Usage

### Installed globally

```bash
cd your-project-dir
```

  Specify path and optional port

```bash
  openapi-editor --path ./src/api/my-openapi.yaml --port 10010
```

### Installed as Local Dependency

```javascript
  import editor from 'openapi-editor'

  const openApiEditor = require('openapi-editor');

  const options = {
    oasFilePath: './src/api/oas/oas-v1.yaml', // specify path as string or fully resolved path
    port: 10015, // specify port or omit for random port usage
    silent: false, // invoque browser or run silently
  };

  openApiEditor.edit(options);

```

## Licence

This project is licensed under the MIT License

## Development Setup

<!-- TODO -->

## Test

  `npm test`

## Contributing

Keep it simple. Keep it minimal.

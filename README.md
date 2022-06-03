# openapi-editor

The **OpenAPI Editor** is a wrapper package built around the [Swagger Editor](https://github.com/swagger-api/swagger-editor) tool which allows you to edit [Open API specifications](https://github.com/OAI/OpenAPI-Specification) in YAML inside your browser and preview its documentations in real time.

The OpenAPI Specification is a community-driven open specification within the [OpenAPI Initiative](https://www.openapis.org/), a Linux Foundation Collaborative Project.

**OpenAPI Editor** is built with [swagger-editor-dist](https://www.npmjs.com/package/swagger-editor-dist) which is a dependency-free module that includes everything you need to serve Swagger Editor in a project.

## Features

* Runs as a stand-alone web application in a port of your choice.
* Edit, validate and save your OpenAPI yaml file describing your project API.

## Getting Started

In a typical workflow of building an API based on the [Open API specifications](https://github.com/OAI/OpenAPI-Specification), you would design and model your API, write the implementation code, test it and maintain it.

### Install

In a new or existing folder containing your project:

```npm install openapi-editor```

### Usage

By default ```openapi-editor``` will run in a dynamically assigned port and will attempt to find an OpenAPI yaml file in the default path ```src/api/v1/api.yaml```

You can add an entry to the "scripts" section in package.json:

```json
"scripts": {
  "api:edit": "openapi-editor --file ./src/api/v1/api.yaml --port 10021"
}
```

You can also run it from the command line using ```npx```

```npx openapi-editor --file ./src/api/v1/api.yaml --port 10021```

Or in JavaScript by importing the module

```javascript
const openApiEditor = require('openapi-editor');

const options = {
  file: './src/api/v1/api.yaml', // specify path as string or fully resolved path
  host: '127.0.0.1', // specify ip 
  port: 10021, // specify port or omit for random port usage
  silent: false, // invoque browser or run silently
  basicauth: "username:password" // if you want to protect the editor
};

openApiEditor.edit(options);
```

## API

### ```--file [optional]```

The OpenAPI specification File to edit. Defaults to ```src/api/v1/api.yaml```

### ```--host [optional]```

Optional ip to run. Defaults to 127.0.0.1 .

### ```--port [optional]```

Optional port to run. Defaults to 0 or dynamically assigned port.

### ```--silent [optional true/false]```

Automatically opens default browser. Defaults to true.

### ```--basicauth [optional username:password]```

Optional basic authentication,it is useful if you expose the editor in wild.

## Licence

This project is licensed under the MIT License

## Development Setup

Clone this repo ```git clone https://github.com/Codermar/openapi-editor```

```npm install```

```npm run test:watch``` To run tests in watch mode.

```npm run build``` or ```npm run build:watch``` To build the project.

  `npm test` to run the tests.

## Docker
```cd docker```
```docker build -t Codermar/open-api .```
```docker run -d --name openapieditor --restart always -p 8080:8080 Codermar/open-api```

## Contributing

Keep it simple. Keep it minimal.

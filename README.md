# RESTful Web APIs with Node.js, Express, MongoDB and TypeScript

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node

```
npm install -g typescript ts-node
```

## Getting Started

You should install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) on your local machine, or use other services such as [mLab](https://mlab.com/) or [Compose](https://www.compose.com/compare/mongodb)

After that, you will have to replace the connectionString with your MongoDB address in _src/environment/environment.ts_

## Clone this repository

Then install the dependencies

```
npm install
```

## Start the server

Run in development mode

```
npm run dev
```

Run in production mode

```
npm run prod
```

## Testing over HTTP

The default URL is: _http://localhost:80_

- Test running API

```
Send GET request to http://localhost:80/
```

## Testing over HTTPs

The default URL is: _https://localhost:443_

The key and cert in the config folder is for testing purpose only. You should generate your own.

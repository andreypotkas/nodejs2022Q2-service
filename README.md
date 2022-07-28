# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/andreypotkas/nodejs2022Q2-service.git
git checkout postgreSQL
```

## Installing NPM modules

```
npm install
```

## Running application

Docker
При запуске в докере нужно дождаться пока в контейнере всё установится и запуститься сервер. Для этого можно зайти в сам контейнер с api и дождаться пока nest logs выдаст SERVER RUN ON PORT: 4000

```

npm run docker
npm run scan - scan for security vulnerabilities
```

Local

```
npm run start
```

After starting the app on port (4000 as default) you can open http://localhost:4000/

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

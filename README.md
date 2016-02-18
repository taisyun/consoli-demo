# hrdemo-websocket
 Based on redux-socket.io-boilerplate
 
## Commands
  - `npm start` runs the development server with [hot-loading](https://github.com/gaearon/react-hot-loader).
  - `npm run debug` runs the development server with [hot-loading](https://github.com/gaearon/react-hot-loader) and node-inspector
  - `npm test` runs both server side and client side tests
  - `npm run lint` runs eslint on files
  - `npm run build` builds code for production
  - `npm run test:server` runs server side tests
  - `npm run test:client` runs client side tests
  - `npm run test:server-watch` runs server tests when files change
  - `npm run test:client-watch` runs client tests when files change
  - `npm run test:watch` runs tests when files change

## Layout
  - [/test](test/) General tests that do not fit in front or backend.
    - [/test/learning](test/learning) various non-application tests. Used to experiment with a new API or get comformable with the testing framework.

### Frontend
  - [/app](app/) root of front end code
  - [/app/test](app/test) front end tests

### Backend
  - [/server](server/) contains the main backend source code. Reducer, Redux store, and core functionality.
  - [/server/test](server/test/) contains chai tests for backend.


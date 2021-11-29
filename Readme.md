# Web Application Template

This application is a basic React/TypeScript starter app for Esri based applications. It uses many of the modules and conventions found in our production applications. However, this starter is not quite production ready (could use some more production configuration in the webpack bundler).

## Technologies Demonstrated

- [TypeScript](https://www.typescriptlang.org/): Extends JavaScript to adding data types.
- [React](https://reactjs.org/): Rendering engine for interactive UIs. Includes setup with react-refresh for hot module reloading
- [WebPack](https://webpack.js.org/): Bundles the various JavaScript/TypeScript files together into a final "bundled" version for the web server
- [AntD](https://ant.design/components/overview/): React base UI component library
- [Styled Components](https://styled-components.com/): Reusable and isoloated component styling for React applications
- [Mobx](https://github.com/mobxjs/mobx): Full featured and reactive state management
- [SASS](https://sass-lang.com/): CSS Precompiler. Allows you to build css with variables and logic.
- [ESRI](https://developers.arcgis.com/javascript/latest/): Esri JavaScript map SDK
- [Babel](https://babeljs.io/): JavaScript "compiler"
- [Jest](https://jestjs.io/): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Testing Library](https://testing-library.com/docs/): Simple and complete testing utilities that encourage good testing practices

## Getting Started

It is assumed that you already have `node` and `yarn` installed on your machine. Google `how to install node` or `how to install yarn` if you need help setting up these environments.

### Initialize The Application

`yarn install`

### Start a local development web server (webpack-dev-server)

`yarn start`

### Build a deployable version of the app

`yarn build`

### Lint your code

`yarn lint`

### Verify all TypeScripts are in good working order

`yarn tsc`

### Non-existent tests

See documentation on writing tests at [Testing Library](https://testing-library.com/docs/)

`yarn test`

## What this repo is lacking?

This template is lacking examples for the following:

- Robust testing
- Performance optimizations for production builds
- Strong patterns for structuring MobX stores

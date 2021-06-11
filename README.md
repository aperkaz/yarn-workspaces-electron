# 🧶 Advanced electron starter with yarn workspaces

Desktop apps are often a mix of UI and business logic.

In some cases, the business logic runs in a server and the desktop app may be a simple UI that interacts with said server executing CRUD operations.

In other cases, the app itself needs to contain the business logic and perform expensive computations (ex. machine learning, CPU intensive calculations).

[Electron.js](https://www.electronjs.org/) is a powerful framework that enables JS developers to create cross-platform desktop apps with the same technology stack used in the web. While the default process model of Electron scales well for UI heavy apps, there are known limitations that may cause laggy UIs and poor developer experience.

This starter aims to bridge those limitations, focusing on performance and developer experience. This is exactly how my app [Taggr](https://taggr.ai/) is architected.

## High level architecture

As mentioned above, this starter proposes an advanced architecture, best suited for complex Electron.js apps. Avoid over engineering your solution in the beginning, and consider the switch if you experience performance or developer experience limitations.

The architecture of this starter is divided into three modules: `frontend`, `electron-backend` and `shared`.

The three modules are built using TypeScript, with optional JS support.

<!-- TODONOW: add graph -->

### Frontend

**Stack**: [TypeScript](https://www.typescriptlang.org/) + [React (CRA)](https://github.com/facebook/create-react-app) + [Redux](https://redux-toolkit.js.org/) + [Storybook](https://storybook.js.org/)

The frontend module is responsible of all things UI.
No business logic should live in this module.

Main features:

- Full TypeScript support.
- Develop components in isolation using Storybook.
- Store the fully-typed app state in Redux.
- Interact with the electron-backend through async message passing with `node-ipc`.
- Access to the `shared` module (through [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)).

### Electron-backend

**Stack**: [TypeScript](https://www.typescriptlang.org/) + [Node.js](https://nodejs.org/en/)

The electron-backend module is responsible for the business logic, and the integrations with external dependencies such as databases and REST APIs.

In develper mode, it runs withing an Electron render process (browser window), and in production it runs as a separate node.js process (forked from the electron node.js verion).

This module also contains the electron code required to build and package the starter into a cross-platform

Main features:

- Full TypeScript support.
- Perform costly CPU and GPU operations without impacting the UI.
- Support for [native modules](https://www.electronjs.org/docs/tutorial/using-native-node-modules).
- Interact with the frontend through async message passing with `node-ipc`.
- Access to the `shared` module (through [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)).

### Shared

**Stack**: [TypeScript](https://www.typescriptlang.org/)

There are great benefits to having a decoupled architecture. It is often easier to reason about and modify parts of it without impacting the other parts of the system, as long as the interaction contract between the modules it kept (API).

Since the `frontend` and `electron-backend` are separated modules, `shares` enables sharing code between them. This allows to define the frontend and electron-backend async event passing APIs in one place, and evolve the modules separatedly.

Main features:

- Full TypeScript support
- Enable code sharing between `fronted` and `electron-backend`

## Communication

The communication between the `frontend` and `electron-backend` modules is done by [node-ipc](https://github.com/RIAEvangelist/node-ipc), following the blueprint proposed in [this great post](https://archive.jlongster.com/secret-of-good-electron-apps).

<!-- TODONOW: add more -->

## Getting up and running

## Building app for production

The high level app architecture:

<!-- TODONOW: add architecture -->

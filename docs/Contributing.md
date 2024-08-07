# Contributing

We welcome contributions! Watch this [Getting Started Video](https://youtu.be/Q4EJKXDi3a8) for how the project is setup
and take a look at the conventions below to get started contributing. I talk slowly so you probably want to 2x that bad
boy 😛

[![Getting Started Video](https://i9.ytimg.com/vi_webp/Q4EJKXDi3a8/mq1.webp?sqp=CPTKhbUG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYACxgWKAgwIABABGGQgZChkMA8=&rs=AOn4CLATRoV8G6s9Zl8mY4Pi_mmujrDAww)](https://youtu.be/Q4EJKXDi3a8)

## Overall guidelines | Suggestions

- 🙏 Thank you for your help! Your contributions will motivate developers to do greater things!
- 🥇 Keep it simple. We don't need optimizations right now. We need features!
- 🤖 Built by devs for devs so if you want to make a change to make things better, do it! Make a PR and let rphovley know
  to review it. If it's a big change, a heads up before you start will save some heartache.

## Quickstart

### Backend

```
cd packages/server
npm i
npm run start
```

### Frontend

```
cd packages/app
npm i
npm run start
```

### CLI

```
./bin/dev.js [COMMAND]
```

## Architecture

The information flow generally speaking looks like this:

```
extension -> wakatime cli -> codeclimbers cli -> sqlite db
```

We are making use of the wakatime cli as it is a great open source project that helps us to prototype what we are looking to build.

[MORE INFO](./Architecture.md)

## Frontend

A React Single Page Application that uses react-router, material-ui, tanstack to help the user visualize their data

### Conventions

- All files should be typescript and avoid `any` types within reason
- Components should be functional and the name should be PascalCase
- Any api calls should be included in the `api` directory and make use of tanstack
- All components should reside in the `components` directory.
- All pages should go in the `components` directory and have their own component.
- All layout components should go in the `layouts` directory.
- Styling: make use of the `sx` attribute for any material-ui customizations.
- Styling: make use of the appropriate material-ui components for layouts like `Grid` or `Stack` when possible,
  but `Box` is a great fallback
- Styling: when needing to do your own work with `Box` for layouts, make use of `flex` instead of other css layout types
  where possible

## Backend

A Node NestJS server with knex and sqlite for generating the functionality of the application

### Conventions

- When writing your endpoint, please include it in
  the [postman collection](https://app.getpostman.com/join-team?invite_code=9637b029e619749476d15a4c5e1022d7&target_code=6b61a4e2db3eb4abdac588e6cc32a45c).
  Makes for easier testing for yourself and helps the rest of us understand how to use your endpoint.
- If there isn't an established pattern for what you are doing, check out the NestJS docs. They probably have something
  for it or talk to someone on the team.
- `controller` files are for defining endpoints and controlling user access. Should not contain business logic or
  database calls.
- `repo` files are for accessing the database. Should not contain business logic. Should be typically named after the
  table they are accessing.
- `services` go between the `controller` and the `repo`. Contains only the business logic. i.e. making repo calls,
  mapping data to be prepared for return, decisioning on creating data, etc...
- if your `service` has more than a handful of code paths, you should probably make a unit test for it. Once you get the
  hang of doing these, it will likely make you faster at delivering the first version of the feature
- when making calls to the database, use the knex query builder where possible for things that are relatively simple.
  When things are more complicated, use raw sql and make use of the `queries` directory

## CLI

A way for the user to interact with the application easily using oclif

- CLI runs with node --watch mode in place. However, it will only work for changes in the `packages/commands` directory.
  If
  you want changes to be reflected in the CLI from the server, you will need to build it with `npm run build:server` and
  then restart the CLI.

### Conventions

- TBD

## [Bootup Services](./BootupServices.md)

## Deployment

With a clean working directory, run the following to publish the latest version to npm

```
npm run version [major].[minor].[hotfix]
npm run publish:npm
```

To create a tarball for the variety of environments run the following (and have something else to do because it takes
30+ minutes)

```
npm run package
```

Creates the distribution packages that we use to upload new versions of the application. For more info, check out the
oclif documentation on [releasing](https://oclif.io/docs/releasing/)

_Note: Requires that you have 7zip installed to run_

# Code Climbers CLI

A command-line interface tool for climbers to track their daily coding achievements. Made up of 3 pieces. A Node server with a restful api that delivers a Single Page application and a CLI that allows the user to turn the server on and off and control some of their preferences. 

The goal is to allow the user to be able to run the command `codeclimbers start` after they download and install the CLI and not have to do anything else after that point. They could then view their dashboard from their browser at `codeclimbers.local`

## Features
- Log daily coding wins
- View progress over time

## Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Quickstart  

### Backend
```
cd src/server
npm i
npm run start
```

### Frontend
```
cd src/app
npm i
npm run start
```


## Contributing
We welcome contributions! Watch this [Getting Started Video](https://youtu.be/Q4EJKXDi3a8) for how the project is setup and take a look at the conventions below to get started contributing

## Overall guidelines | Suggestions
- Keep it simple. We don't need optimizations right now. We need features! 
- Built by devs for devs so if you want to make a change to make things better, do it! Make a PR and let rphovley know to review it. If it's a big change, a heads up before you start will save some heartache.

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
- Styling: make use of the appropriate material-ui components for layouts like `Grid` or `Stack` when possible, but `Box` is a great fallback
- Styling: when needing to do your own work with `Box` for layouts, make use of `flex` instead of other css layout types where possible

## Backend
A Node NestJS server with knex and sqllite for generating the functionality of the application

### Conventions
- When writing your endpoint, please include it in the [postman collection](https://app.getpostman.com/join-team?invite_code=9637b029e619749476d15a4c5e1022d7&target_code=6b61a4e2db3eb4abdac588e6cc32a45c). Makes for easier testing for yourself and helps the rest of us understand how to use your endpoint. 
- If there isn't an established pattern for what you are doing, check out the NestJS docs. They probably have something for it or talk to someone on the team.
- `controller` files are for defining endpoints and controlling user access. Should not contain business logic or database calls.
- `repo` files are for accessing the database. Should not contain business logic. Should be typically named after the table they are accessing. 
- `services` go between the `controller` and the `repo`. Contains only the business logic. i.e. making repo calls, mapping data to be prepared for return, decisioning on creating data, etc...
- if your `service` has more than a handful of code paths, you should probably make a unit test for it. Once you get the hang of doing these, it will likely make you faster at delivering the first version of the feature
- when making calls to the database, use the knex query builder where possible for things that are relatively simple. When things are more complicated, use raw sql and make use of the `queries` directory


## CLI
A way for the user to interact with the application easily using oclif

### Conventions 
- TBD

## Licensing
This project is licensed under the MIT License.

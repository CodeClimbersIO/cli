# Code Climbers CLI

A command-line interface tool for climbers to track their daily coding achievements. Made up of 3 pieces. A Node server
with a restful api that delivers a Single Page application and a CLI that allows the user to turn the server on and off
and control some of their preferences.

The goal is to allow the user to be able to run the command `npx codeclimbers@latest start` and not have to do anything else
after that point. They could then view their dashboard and install sources from their browser
at `localhost:14400`

## Features

- Measure daily work
- (Future) Measure deep work
- (Future) View progress over time
- (Future) Community mods like gamification or interruptions manager

## Quickstart

```
npx codeclimbers@latest start
```

## From Source

```
git clone https://github.com/CodeClimbersIO/cli.git && cd cli
npm i
npm run build
npx codeclimbers@latest start server
```

## Prerequisites

- Node.js

## Contributing 🚀

Come help contribute to making it easier for coders to focus on doing what they love to do: Code!

- [Contributing Guide](./docs/Contributing.md)

## Licensing

This project is licensed under the MIT License.

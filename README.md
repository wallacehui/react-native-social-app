# react-native-social-app

It is a simple social network demo app developed with React Native.
TypeScript is adapted to facilitate type checker
All remote data is provided from https://jsonplaceholder.typicode.com

Redux observer pattern is used to handle data flow.

React Navigation manages screen flow stack.

## Features

- Top level list of users
- User detail screen for display user information
- Posts screen for user's posts list out
- Photo albums screen
- Todo screen to list all incompleted and completed tasks
- Photos screen support paginate and refresh
- Comment screen shows all comments with post detail

## Prerequisite

- Node >= 10
- yarn
- react-native-cli

## Setup

```sh
cd socialApp
yarn # Install packages

# Initiate development server
yarn start
```

## Lint

- prettier
- tslint
- tsc

```sh
# type check
yarn tsc

# prettier for align all code style
yarn check-code-style

# TypeScript linting
yarn lint
```

## Run

```sh
# iOS
react-native run-ios

# Android
react-native run-android
```

# Notes Display(https://education-app-alpha.herokuapp.com/)

> Web App for managing notes.

## Table of contents

- [General info](#general-info)
- [Login details](#login-details)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [TODO](#TODO)
- [Contact](#contact)

## General info

The project allows user to manage notes. It Display them in the browser in the form of the quiz. Client provides .txt/.json file and app will convert it to notes and questions.

\*\* <b>Project still under the development</b>

## Login details

TODO

## Screenshots

TODO

## Technologies

- JavaScript - version ES6
- Vue - version 2.6.11
  - bootstrap - version 4.5.2
  - bootstrap-vue - version 2.16.0
  - vuex
- HTML5/CSS/SCSS

## Setup

```
  yarn install
  yarn serve
```

## Features

- fully working quiz on client side it uses JSON and txt files
- user can create his own notes/question on frontend
- switch for changing colors

## TODO

- ~~fix bug: new line in answer is missing~~
- ~~add possibility to upload question in JSON format~~
- add validation for txt and json files
- change paths and tests for BONUS files
- add other readme with instructions for format text file
- ~~reformat css maybe change to SASS~~
- ~~implement switch for theme~~
- implement full server side in Django
- implement users login/logout
- create settings for category of question if it should be displayed
- save user preferences in D

## Contact

Created by <b>Marek Chałabis</b> email: chalabismarek@gmail.com

<!--
TODO make it more clear

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```      const questions = fileAsObject[category];
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Education_App -->

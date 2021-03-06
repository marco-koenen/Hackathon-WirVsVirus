
<h3 align="center">Hackathon-WirVsVirus</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  ![License](https://img.shields.io/github/license/marco-koenen/Hackathon-WirVsVirus)
  ![Version](https://img.shields.io/github/package-json/v/marco-koenen/Hackathon-WirVsVirus)
  ![GitHub last commit](https://img.shields.io/github/last-commit/marco-koenen/Hackathon-WirVsVirus)

</div>

---

This prototype is developed with [Pug](https://pugjs.org/api/getting-started.html), [ES6](http://es6-features.org/) and [Sass](http://sass-lang.com/) and build with [Gulp](http://gulpjs.com/), [Webpack](https://webpack.js.org) and [NPM](https://www.npmjs.com/). If you're already up and running with most of the usual Node ecosystem tools this project won't require much additional effort.
<br/><br/>

## 📝 Table of Contents
- [Getting started](#getting_started)
- [Install dependencies](#dependencies)
- [Build system](#build)
- [Tasks](#tasks)
- [Codebase structure](#codebase-structure)
- [Backend documentation](/README_backend.md)
- [Contributing](/docs/contributing.md)
- [Pull request](/docs/pull_request.md)
<br/>

## 🏁 Getting Started <a name="getting_started"></a>
In order to simplify the installation process you should install Homebrew which provides a friendly Homebrew CLI workflow for the administration of Mac applications distributed as binaries. Simply paste following line in your terminal.

```shell
"/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)""
```
<br/>

## 🔧 Install dependencies <a name="dependencies"></a>
[Npm](https://www.npmjs.com/) is a package manager for our code. It allows us to use and share code with other developers from around the world. Npm, does this quickly, securely, and reliably so you don’t ever have to worry. You can easily install npm with Homebrew. (it comes along with Node.js)

```shell
brew install node
```

Install all package dependencies with yarn.

```shell
npm install
```
<br/>

## ⚙️ Build system <a name="build"></a>
[Gulp](http://gulpjs.com/) is an extremely powerful tool for automating tasks from the command line. Configuration is handled by a single file: ``settings.yml``. If you leave the directory structure intact, there won't be too much that needs changing here. When you are ready - run ``npm start`` and start hacking!
<br/><br/>

## 🚀 Tasks <a name="tasks"></a>

* ``npm start`` watch all files and run browser-sync.
* ``npm run build`` build a working copy of the source files.
* ``npm run deploy`` minify and optimize all source files and deploy them to the production branch
* ``npm run clean`` clean build folder
* ``npm run fresh`` fresh node_modules install
* ``npm run bump`` bump to a new version (patch)
<br/>

## 🔖 Codebase structure <a name="codebase-structure"></a>

```shell
├── build/                        # → Generated by Gulp, this is a working copy of our theme (never edit)
│
├── docs/                         # → The project documentation
│
├── gulpfile.js/                  # →
│   └── tasks/                    # → All Gulp tasks
│
├── node_modules/                 # → Node.js packages (never edit)
│
├── src/                          # → This directory contains the raw material for our prototype
│   │── backend/                  # →
│   └── frontend/                 # →
│       │── assets/               # →
│       │   ├── fonts/            # → Fonts
│       │   ├── img/              # → Images
│       │   │   ├── icons/        # → Favicons and normal icons
│       │   │   └── logos/        # → All used logos
│       │   ├── js/               # →
│       │   │   ├── components/   # → Components like images, buttons …
│       │   │   ├── fragments/    # → Fragments like navigation, footer …
│       │   │   ├── lib/          # → Used Libraries
│       │   │   └── utils/        # → Utilities for math, cookies, …
│       │   │                     # →
│       │   └── scss/             # →
│       │       ├── _components/  # → Components
│       │       ├── _container_/  # → Container
│       │       ├── _fragments/   # → Fragments
│       │       ├── _mixins/      # → Sass mixins
│       │       ├── _pages/       # → Page specific styles
│       │       └── _utilities/   # → Utilities
│       │                         # →
│       │── fragments/            # → Layout fragments like navigation, footer, …
│       │── inc/                  # → Includes like variables and imports
│       └── mixins/               # → Pug mixins
│
├── gulpconfig.js                 # → Gulpconfig, you dont need to change this file
├── package-log.lock              # → Auto-generated file from npm
├── package.json                  # → Dependencies and scripts
└── settings.yml                  # → Settings file for the template

```
<br/>
<br/>

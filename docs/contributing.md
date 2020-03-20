# Contributing Guide

- Contributing to this project is fairly easy. This document shows you how to get started

## General
- The [Codebase Structure](./../README.md#codebase-structure) has detailed information about how the various files in this project are structured
- Please ensure that any changes you make are in accordance with the [Coding Guidelines](./coding_guidelines.md) of this repo

## Submitting changes

- Fork the repo
- Check out a new branch and name it to what you intend to do:
  - Use one branch per fix / feature
  - Example:
    ````
    $ git checkout -b BRANCH_NAME
    ````
    If you get an error, you may need to fetch <code>develop</code> first by using
    ````
    $ git remote update && git fetch
    ````
- Commit your changes
  - Please provide a git message that explains what you've done
  - Commit to the forked repository
  - Example:
    ````
    $ git commit -am 'Added some nice feature'
    ````
- Push to the branch
  - Example:
    ````
    $ git push origin BRANCH_NAME
    ````
- Make a pull request
  - Make sure you send the PR to the <code>develop</code> branch

If you follow these instructions, your PR will land pretty safely in the main repo!

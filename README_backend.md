### Setting up development environment
 - Install nix
 - Enter "virtual env" using `nix-shell`
 - Execute `./update-pycharm-packages` to get a python interpreter that has all our dependencies in python-environment/bin/python3.8

### Add dependency
 - Add the dependency in default.nix
 - Run `./update-pycharm-packages`
 - (You might need to restart PyCharm, seems like indexing doesn't happen automatically again)
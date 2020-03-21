with import <nixpkgs> {};

let
myFlask = import ./patched-flask.nix;
pythonEnv = import ./python-env.nix;
in
mkShell {
  buildInputs = [myFlask pythonEnv];
}


let
  patchedWerkzeugOverlay = import ./nix/patched-werkzeug-overlay.nix;
  pkgs = import <nixpkgs> { overlays = [patchedWerkzeugOverlay ]; };
  pythonEnv = import ./nix/python-env.nix;
in
pkgs.mkShell {
  buildInputs = [pkgs.python38Packages.flask pythonEnv];
}


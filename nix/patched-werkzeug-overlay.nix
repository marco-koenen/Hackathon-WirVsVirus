with import <nixpkgs> {};

let
# We need to patch Werkzeug to get it to work in development mode in nix shell
# https://github.com/NixOS/nixpkgs/issues/42924
myWerkzeug = python38Packages.werkzeug.overrideAttrs (oldAttrs: rec {
  postPatch = ''
    substituteInPlace src/werkzeug/_reloader.py \
      --replace "rv = [sys.executable]" "return sys.argv"
  '';
  doCheck = false;
});
in
pkgsself: pkgssuper: {
  python38 = pkgssuper.python38.override {
    packageOverrides = self: super: {
      werkzeug = myWerkzeug;
    };
  };
}
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

myFlask = python38Packages.flask.override { werkzeug = myWerkzeug; };
myFlaskCors = python38Packages.flask-cors.override { flask = myFlask; };

callPackagePy38 = newScope python38.pkgs;
ourPackage = callPackagePy38 ./. { flask = myFlask; flask-cors = myFlaskCors; };

in python38.withPackages (ps: with ps; [ gunicorn] ++ ourPackage.propagatedBuildInputs)

with import <nixpkgs> {};

let
myFlask = import ./patched-flask.nix;
myFlaskCors = python38Packages.flask-cors.override { flask = myFlask; };

callPackagePy38 = newScope python38.pkgs;
ourPackage = callPackagePy38 ./. { flask = myFlask; flask-cors = myFlaskCors; };
in
python38.withPackages (ps: with ps; ourPackage.propagatedBuildInputs)

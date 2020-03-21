with import <nixpkgs> {};

let
myFlask = import ./patched-flask.nix;
myFlaskCors = python38Packages.flask-cors.override { flask = myFlask; };

peeweeFixedApsw = python38Packages.peewee.override {
  apsw = python38Packages.apsw.overridePythonAttrs {
    # Tests fail on macOS
    # Seems like an error in the test code, method is not pickleable
    # https://github.com/rogerbinns/apsw/issues/277
    doCheck = false;
  };
};

callPackagePy38 = newScope python38.pkgs;
ourPackage = callPackagePy38 ./. { flask = myFlask; flask-cors = myFlaskCors; peewee = peeweeFixedApsw; };
in
python38.withPackages (ps: with ps; ourPackage.propagatedBuildInputs)

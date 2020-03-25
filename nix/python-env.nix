let
  patchedWerkzeugOverlay = import ./patched-werkzeug-overlay.nix;
in
with import <nixpkgs> { overlays = [patchedWerkzeugOverlay ];};
let
  callPackagePy38 = newScope python38.pkgs;
  ourPackage = callPackagePy38 ../default.nix {};
  testDependencies = ps: [ps.requests];
in
python38.withPackages (ps: with ps; ourPackage.propagatedBuildInputs ++ (testDependencies ps))

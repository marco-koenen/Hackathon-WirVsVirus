{ buildPythonPackage, flask, boto3 }:

buildPythonPackage rec {
  name = "wirvsvirus";
  src = ./.;
  propagatedBuildInputs = [ flask boto3 ];
}
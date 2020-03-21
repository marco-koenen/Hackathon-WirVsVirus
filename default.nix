{ buildPythonPackage, flask, boto3, flask-cors, peewee }:

buildPythonPackage rec {
  name = "wirvsvirus";
  src = ./.;
  propagatedBuildInputs = [ flask boto3 flask-cors peewee ];
}

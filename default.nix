{ buildPythonPackage, flask, boto3, flask-cors }:

buildPythonPackage rec {
  name = "wirvsvirus";
  src = ./.;
  propagatedBuildInputs = [ flask boto3, flask-cors ];
}

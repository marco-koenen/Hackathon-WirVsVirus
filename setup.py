from setuptools import find_packages, setup

setup(
    name='wirvsvirus',
    version='1.0.0',
    packages=["wirvsvirus"],
    package_dir={"wirvsvirus":"src/backend"},
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'flask-cors',
        'boto3',
        'flask-httpauth',
        'requests',
    ],
)

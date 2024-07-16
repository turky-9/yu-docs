FROM python:3

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN pip install numpy matplotlib jupyterlab iplantuml
RUN apt upgrade
RUN apt update && apt-get install plantuml default-jre -y
RUN mv /usr/share/plantuml/plantuml.jar /usr/local/bin/plantuml.jar

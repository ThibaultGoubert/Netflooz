Pour tout nettoyer: docker system prune --all --force --volumes

Un docker file / micro-services
=> Crée une image docker
Faire un docker compose des images/file ?
Chocapics

Visual Code: => Local
- web => ng serve
- api => python.exe api.py

F:\Cours\MicroServices\Netflooz\Docker\Dockerfiles\Catalogue
=> docker build -t catalogue .

F:\Cours\MicroServices\Netflooz\Docker\Dockerfiles\Notes
=> docker build -t notes .

F:\Cours\MicroServices\Netflooz\Docker\Dockerfiles\Front
=> docker build -t front .

Les 3 images sont créé, ont peut lancer le compose

F:\Cours\MicroServices\Netflooz\Docker
=> docker-compose up


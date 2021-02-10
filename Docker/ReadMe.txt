Pour tout nettoyer: 
docker system prune --all --force --volumes

Pour build les micros services:
=> docker-compose up
à l'emplacement du fichier docker-compose

Front: 			http://localhost:8080/
API-Catalogue: 	http://localhost:5001/
				http://localhost:5001/api/v1/resources/books/all
API-Notes: 		http://localhost:5002/
				http://localhost:5002/api/v1/resources/notes/all
API-Recherche:	http://localhost:5003/
				http://localhost:5003/api/v1/resources/books/search?arg=Ann
	
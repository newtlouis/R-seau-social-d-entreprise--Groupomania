
# Groupomania - Réseau social d'entreprise
Création d' un réseau social interne d’entreprise pour le groupe Groupomania
## Technologies utilisées :

### Back:

NodeJS

Express

mySql

### Front
Vue.js

axios

## Objectif


Le projet consiste à construire un réseau social interne pour les employés de Groupomania. 

Le but de cet outil est de faciliter les interactions entre collègues. 

Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.


## Serveur de développement local

Prérequis: installer node, mysql

### Front End
Dans un terminal exécuter `cd frontend` puis `npm run serve` pour avoir accès au serveur de développement. 

Rendez-vous sur `http://localhost:8080/`. 


## Back End

Installer mysql Créer une base de données sous mysql à l'aide du fichier groupomania.sql

 et modifier le fichier .env avec vos données personnelles lors de la création de la base de donnée afin de vous y connecter et créer vos tokens d'authentification

Dans un second terminal exécuter `cd backend`

puis lancer le serveur `nodemon server`
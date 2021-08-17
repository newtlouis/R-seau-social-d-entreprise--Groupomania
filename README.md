Réseau social d'entreprise -Groupomania


Prérequis:
installer node, mysql

Pour lancer le front end:

cd frontend/

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

Installation Backend:
Créer une base de données sous mysql à l'aide du fichier dump groupomania.sql
Allez dans le répertoire backend/ et modifier le fichier .env avec vos données personnelles.

Pour lancer le backend
cd backend1/

# Compiles 
nodemon server

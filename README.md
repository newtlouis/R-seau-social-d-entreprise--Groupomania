Réseau social d'entreprise -Groupomania


Prérequis:
installer node, mysql

FRONTEND:

cd frontend/
npm run serve
# Compiles and minifies for production
npm run build

BACKEND:

Installer mysql
Créer une base de données sous mysql à l'aide du fichier groupomania.sql

Allez dans le répertoire backend1/ et modifier le fichier .env avec vos données personnelles.

Pour lancer le backend
cd backend1/
nodemon server


CREER UN ADMIN:

Créer un nouvel utilisateur via la page SignUp de l'application Web
Modifier cet nouvel utilisateur dans Mysql
Dans Admin, remplacer "N" par "Y"
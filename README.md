# ProjetWebApp

Projet réalisé par Julien Goetghebeur et Martin Rouxel, dans le cadre du cours Complément Web du BUT Informatique de L'IUT de Lannion.

Version actuelle : 2.0

## R4.A.10 Complément Web : Partie 1

Création des classes `Country`, `Language` et `Currency`.
Création des instances de classes à partir des données faites dans `./main.js`.
Les données sont dans un tableau `countries_data` dans `./script/countries.js`.

Tests réaliser dans `./scripts/test.js`.

## R4.A.10 Complément Web : Partie 2

Ajout d'un affichage de la liste des pays.

### Modèle

Fichier `template.html`.

Affiche une ligne du tableau avec les infos en dur dans le fichier html.

### Tous les pays

Fichier `countries_v1.html`.

Affiche tous les pays dans le tableau.

### Pagination

Fichier `countries_v2.html`.

Affiche le tableau par page de 25 pays max.

### Détails

Fichier `countries_v3.html`.

Affiche une pop-up avec des détails sur le pays lorsque l'on clique sur une ligne.
Si on clique sur un drapeau, une pop-up avec le drapeau s'ouvre.

### Filtrages

Fichier `countries_v4.html`.

Ajoute une possibilité de filtrer le tableau par continent, langue et nom.
Les filtres se cumulent.

### Tris

Fichier `countries_v5.html`.

Ajoute une possibilité de trier le tableau en cliquant sur les entêtes du tableau.

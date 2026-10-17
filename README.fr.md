# Tableau d'enquête Obra Dinn

[English](README.md) · **Français**

Un « pin board » local pour vous aider à résoudre **[Return of the Obra Dinn](https://obradinn.com/)** : épinglez l'équipage sur l'illustration de groupe du jeu, reliez les personnages entre eux, prenez des notes, suivez vos hypothèses et qui disparaît, chapitre après chapitre.

Tout tourne en local : un petit serveur Node sert une seule page HTML et enregistre votre tableau dans un fichier JSON sur le disque. Pas de dépendance, pas de build, pas de compte.

L'interface est disponible en **français et en anglais**.

![Le tableau avec des épingles non identifiées, des fils entre elles et des notes](docs/screenshot.jpg)

<sub>Tableau d'exemple avec des données factices : les épingles ne sont pas identifiées pour que la capture ne dévoile aucun sort.</sub>

## Fonctionnalités

- **Épingles sur l'illustration** : posez une épingle numérotée sur chaque personnage, indiquez son statut (vivant, mort, disparu, inconnu), son sort, et si le jeu l'a confirmé. Les épingles et leurs étiquettes s'adaptent au zoom pour que le tableau reste lisible.
- **Identité et hypothèses** : choisissez un membre d'équipage dans le registre grâce à un sélecteur avec recherche, ou gardez plusieurs hypothèses sur la même épingle tant que vous n'êtes pas sûr.
- **Liens entre personnages** : tirez des fils entre les épingles, avec une icône (famille, même rang, même groupe, amis, conflit, a tué, sert, vus ensemble, hypothèse) ou un texte libre.
- **Notes** : des notes volantes de plusieurs couleurs, ancrées sur l'image, avec copier/coller.
- **Registre d'équipage** : la liste plein écran des 60 membres d'équipage et passagers, avec filtres (fonction, origine, statut, épinglé, confirmé), recherche par prénom ou nom, tri, une note par personnage, et un aperçu au survol de l'endroit où se trouve chaque épingle sur l'image.
- **Frise des chapitres** : notez dans quel chapitre et quelle partie chaque personne disparaît, puis filtrez le panneau d'accueil, le registre et le tableau pour voir qui est encore présent, qui a déjà disparu, ou qui disparaît à un moment donné.
- **Sélection multiple** : ⌘+clic ou Maj+glisser pour définir le statut, le sort, la disparition ou les hypothèses de plusieurs épingles d'un coup.
- **Options d'affichage** : afficher ou masquer chaque type de lien, les noms, les sorts, ainsi que les épingles et les liens des personnages confirmés.
- **Annuler/rétablir**, enregistrement automatique, et une copie de sauvegarde du tableau à chaque démarrage du serveur.

## Prérequis

- [Node.js](https://nodejs.org/) 18 ou plus récent

## Démarrage

```sh
git clone https://github.com/<votre-compte>/obra-dinn-board.git
cd obra-dinn-board
npm start
```

Ouvrez ensuite <http://localhost:4321>. La variable d'environnement `PORT` permet de changer de port :

```sh
PORT=8080 npm start
```

Le serveur n'écoute que sur `127.0.0.1`.

## Vos données

- Votre tableau est enregistré dans `board.json`, à côté de `server.js`, environ une demi-seconde après chaque modification.
- `board.backup.json` est une copie du tableau faite au démarrage du serveur.
- Ces deux fichiers sont ignorés par Git : votre enquête (et ses spoilers) reste en dehors du dépôt.
- Pour repartir de zéro, arrêtez le serveur et supprimez `board.json`.

## Raccourcis clavier

| Touche | Action |
| --- | --- |
| `V` / `P` / `L` / `N` | Sélection / épingler un personnage / lien / note |
| `R` | Ouvrir le registre d'équipage |
| `F` | Ajuster l'image à l'écran |
| Molette, glisser, `Espace`+glisser | Zoomer et se déplacer |
| `Alt`+glisser une épingle | Créer un lien |
| `⌘`+clic, `Maj`+glisser, `⌘A` | Sélection multiple |
| `⌫` | Supprimer la sélection |
| `⌘Z` / `⇧⌘Z` | Annuler / rétablir |
| `⌘C` / `⌘X` / `⌘V` | Copier, couper, coller une note |
| `Échap` | Annuler / fermer |

## Spoilers

La liste d'équipage fournie (`characters.json`) ne contient que les noms, fonctions et origines. **Elle n'inclut jamais les sorts**, le tableau ne dévoile donc rien du jeu. La liste des chapitres de la frise ne donne que leurs titres et leur nombre de parties.

## Structure du projet

| Fichier | Rôle |
| --- | --- |
| `server.js` | Serveur HTTP minimal : sert la page, lit et écrit `board.json` |
| `index.html` | Toute l'application (HTML, CSS et JavaScript sans framework) |
| `characters.json` | Registre d'équipage : numéro, prénom, nom, fonction, origine |
| `dessin.jpg` | L'illustration de l'équipage tirée du jeu, en fond du tableau |

## Crédits et licence

- *Return of the Obra Dinn* est un jeu de Lucas Pope, édité par 3909 LLC. Ce projet de fan n'est pas officiel, ni affilié à eux, ni approuvé par eux.
- `dessin.jpg` est une illustration du jeu et reste © Lucas Pope / 3909 LLC. Elle n'est incluse que pour que l'outil fonctionne directement, et n'est pas couverte par la licence de ce dépôt.
- Le registre d'équipage et la liste des chapitres proviennent du [wiki Obra Dinn](https://obradinn.fandom.com/wiki/Characters), sous licence [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- Le code source est publié sous [licence MIT](LICENSE).

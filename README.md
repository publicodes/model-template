<div align="center">
  <h3 align="center">
	<big>Publicodes Package Template</big>
  </h3>
  <p align="center">
   <a href="https://github.com/incubateur-ademe/publicodes-model-template/issues">Report Bug</a>
   •
   <a href="https://incubateur-ademe.github.io/publicodes-model-template/">API docs</a>
   •
   <a href="https://github.com/incubateur-ademe/publicodes-model-template/blob/master/CONTRIBUTING.md">Contribute</a>
   •
   <a href="https://publi.codes">Publicodes</a>
  </p>

Template dépôt GitHub pour créer un paquet Publicodes.

</div>

## Fonctionnalités

- 📦 compilation des règles publicodes en un seul fichier JSON grâce à
  [`@incubateur-ademe/publicodes-tools`](https://github.com/incubateur-ademe/publicodes-tools)
- 📖 documentation du modèle interactive disponible sur GitHub Pages grâce à
  [`@publicodes/react-ui`](https://publi.codes/docs/api/react-ui)
- 🚀 API REST pour utiliser le modèle dans une application grâce à
  [`@publicodes/api`](https://publi.codes/docs/api/api-rest)

## Initialisation

Pour utiliser ce template, il suffit de cliquer sur le bouton `Use this
template`. Puis de remplacer les variables suivantes dans tous les fichiers du
projet :

- `%PACKAGE_NAME%` : nom du paquet npm / nom du repository GitHub
- `%GITHUB_USER%` : nom d'utilisateur GitHub / organisation GitHub

Pour garantir une utilisation de la documentation sans erreur :

- `%DEFAULT_RULE%` : nom de la règle à afficher par défaut dans la documentation en ligne

Pour utiliser les fonctionnalités de la CI :

1. Il faut décommenter les fichiers `./github/workflows/*.yaml`
2. Ajouter les variables suivantes dans les secrets du repository GitHub : - `NPM_TOKEN` : token NPM pour publier le paquet sur [npmjs.com](https://npmjs.com) - `PAT` : Personal Access Token pour publier la documentation sur GitHub Pages
   ![Screenshot from 2023-09-12 12-02-40](https://github.com/incubateur-ademe/publicodes-model-template/assets/44124798/a6fe53cc-5766-4541-8936-41d474ed0069)
3. Aller dans les paramètres du repository GitHub et : - modifier les droits des worflows
   ![image](https://github.com/incubateur-ademe/publicodes-model-template/assets/44124798/cd7e37f9-0641-44f2-b968-79faa778b832) - sélectionner la branche `gh-pages` dans les paramètres du repository
   ![image](https://github.com/incubateur-ademe/publicodes-model-template/assets/44124798/77191750-12f1-4ab4-94a4-7447f1b77624)

## Exemples de dépôts utilisant ce template

- [`@incubateur-ademe/publicodes-commun`](https://github.com/incubateur-ademe/publicodes-commun) -
  _Ensemble de règles communes utilisées pour l'implémentation des modèles Publicodes de l'incubateur_
- [`@incubateur-ademe/publicodes-negaoctet`](https://github.com/incubateur-ademe/publicodes-negaoctet) -
  _Modèle Publicodes pour la base de données NegaOctet_
- [`@incubateur-ademe/publicodes-impact-livraison`](https://github.com/incubateur-ademe/publicodes-negaoctet) -
  _Modèle [Publicodes](https://publi.codes) pour le simulateur [Impact Livraison](https://impactco2.fr/livraison)_

## Usage

Ajouter le paquet à vos dépendances :

```
bun add %PACKAGE_NAME%
```

Instancier un nouveau moteur Publicode :

```typescript
import Engine from 'publicodes'
import rules from '%PACKAGE_NAME%'

const engine = new Engine(rules)

engine.evaluate('tablette . consommation en mode actif')
```

Utiliser certaines règles dans un autre modèle publicodes :

```yaml
importer!:
  depuis:
    nom: %PACKAGE_NAME%
    url: https://github.com/%GITHUB_USER%/%PACKAGE_NAME%
  dans: modèle numérique
  les règles:
    - numérique . internet . consommation horaire
    - ordinateur portable . construction
```

### En local

#### Compiler le modèle

> Les règles publicodes du modèle sont disponible dans le workspace
> [`rules/`](https://github.com/%GITHUB_USER%/%PACKAGE_NAME%/tree/main/rules).

Pour installer les dépendances et compiler tous les fichiers `.publicodes` en
un seul fichier JSON, il suffit d'exécuter la commande suivante :

```
bun && bun run build
```

#### Lancer la documentation

> Le code de la documentation est disponible dans le workspace
> [`doc/`](https://github.com/%GITHUB_USER%/%PACKAGE_NAME%/tree/main/doc).

Pour lancer l'app React en local permettant de parcourir la documentation du
modèle, il suffit d'exécuter la commande suivante :

```
bun i --cwd doc

bun run doc:start
```

#### Lancer l'API

> Le code de l'API est disponible dans le workspace
> [`api/`](https://github.com/%GITHUB_USER%/%PACKAGE_NAME%/tree/main/api).

Pour lancer le serveur Node permettant d'utiliser l'API REST, il faut utiliser les commandes
suivantes :

```
bun run api

# En watch-mode
bun run api:watch
```

## Publier une nouvelle version

Afin de publier une nouvelle version il suffit d'exécuter la commande `npm
version`.

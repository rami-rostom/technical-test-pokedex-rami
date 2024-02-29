# Test technique frontend - Cap collectif

## Installation, lancement et modalités de rendu
- #### ⚠ Pour rendre ce test, merci de cloner ce repository sur ton compte Github (ou Gitlab / autre), et travailler sur celui-ci. Tu créeras une branche, travailleras sur celle-ci et nous enverras le lien de la PR en guise de rendu ⚠ ####
_________
- Clone le repository, rends toi dans le dossier
- Assure toi d'avoir une version de Node.js `>= v18.17.0`
- Lance `mkdir -p __generated__`
- Lance `yarn install` (ou npm, npx, ou autre)
- Lance `yarn relay`
- Lance le projet avec `yarn dev`
- Si tout va bien, le projet est accessible sur l'URL `http://localhost:3000`. Sinon, contacte-nous.

## Le test
Le test consiste à compléter une version minimaliste d'un Pokédex.
Les 2 pages principales existent déjà, la liste des Pokémons, et la page de visualisation d'un Pokémon.
Tes objectifs sont donc les suivants : 

### Sur la page principale :
- Améliorer le design général afin d'avoir une vue plus agréable et lisible. Tu ne
seras pas particulièrement jugé sur les choix graphiques, mais les différents Pokémons devront quand même être séparés, sous forme de "cartes".
- Ajouter une barre de recherche pour rechercher les différents Pokémons

### Sur la page de visualisation d'un Pokémon : 

- Afficher les informations de ton choix sur le Pokémon sélectionné. À minima, la génération, le taux de capture, le nom et l'image. Tu les récupèreras dans l'API `pokeapi`, plus d'infos dans l'aide
- Afficher la chaine d'évolution du Pokémon sélectionné
- Prévoir un lien de retour sur la page principale
- Styliser également un peu la page, là encore, tu ne seras pas jugé sur tes choix, mais sur l'application de ceux-ci


## Aides, à lire : 

- Pour le style, tu peux utiliser le fichier `globals.css` dans le répertoire `src/app`. Tu peux également utiliser [Tailwind](https://tailwindcss.com/) si tu le souhaites, déjà installé.
- La documentation de l'API Graphql [est disponible ici](https://beta.pokeapi.co/graphql/console/). Elle est un peu rébarbative
aux premiers abords, mais tu devrais trouver ton bonheur dans les champs `pokemon_v2_pokemon`et `pokemon_v2_pokemonspecies` de la documentation. N'hésites pas à fouiller
- On utilise Relay et pas Apollo à Capco, tu peux te renseigner [sur la doc si besoin/envie](https://relay.dev/), mais normalement tout est déjà en place. Petite particularité, utilise toujours des alias lorsque tu demandes des champs nommés `id`, comme ceci : 
```
 pokemons: pokemon_v2_pokemon(limit: 151) {
      pokemonId: id
 }
```
Sinon tu te retrouveras avec l'erreur suivante : `Invariant Violation: RelayResponseNormalizer: Expected id on field to be a string`

N'oublie pas de relancer `yarn relay` à chaque changement dans les requêtes graphql
- Lorsque tu auras terminé ton test, envoie le sur ton repository et fais le nous savoir. Si tu as des questions, des remarques, n'hésite pas à me contacter - julien.aguilar@cap-collectif.com
- Prends le temps qu'il te faut, et bon courage !

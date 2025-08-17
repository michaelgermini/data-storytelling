# Suisse Éducation 3D – Portfolio interactif Data Storyteller

Application web 3D servant de CV immersif. Vue 3D de la Suisse, KPI éducatifs, storytelling interactif et graphiques.

## Démarrage

- Ouvrez `index.html` dans un navigateur moderne (Chrome/Edge/Firefox). Aucune installation nécessaire (CDN).
- Si des restrictions CORS locales apparaissent, servez le dossier via un petit serveur local:

```bash
# Python 3
python -m http.server 8080
# ou Node
npx http-server -p 8080
```

Puis ouvrez `http://localhost:8080/`.

## Fonctionnalités

- Carte 3D des cantons (extrusion de GeoJSON) avec survol/clic.
- Navigation orbit et transitions caméra (GSAP) – bouton « Lecture ».
- Thème Jour/Nuit, labels dynamiques, halo subtil.
- Indicateurs (réussite, diplomation, satisfaction, MOOC) + graphique Plotly.
- Popover « Portfolio CV » par canton (exemples: GE, VD, ZH, BS).

## Données

- GeoJSON des cantons: source publique GitHub (interactivethings/swiss-maps).
- KPI d’exemple dans `src/main.js` (à remplacer par API/CSV/JSON réels).

## Personnalisation

- Ajoutez d’autres cantons/établissements et vos expériences dans `cantonPortfolio`.
- Connectez des APIs (OFS, opendata.swiss) et remplacez le fetch des KPI.
- Ajoutez des overlays D3/Plotly supplémentaires selon besoin.

## Licence

Usage personnel pour portfolio/CV. Vérifiez les licences de données externes.



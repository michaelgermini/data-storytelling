# CV Data Storytelling – Gestion des Forêts

Application web immersive (React + Three.js + D3.js + Mapbox GL) présentant un CV interactif pour un expert en gestion forestière et data environnementale.

## Démarrage

1. Copier `.env.example` en `.env` et définir `VITE_MAPBOX_TOKEN`.
2. Installer et lancer:

```bash
npm install
npm run dev
```

## Sections

- Accueil: scène 3D avec arbres stylisés
- Compétences: radar D3
- Projets: slider avant/après
- KPI: cartes animées
- Carte: Mapbox GL centrée sur la Suisse
- Expérience, Contact (+ export PDF)

## Adaptation Ville de Genève

- Filtrer sur l’étendue du canton, ajouter couches locales (biodiversité, air, CO₂) depuis les données ouvertes de Genève.



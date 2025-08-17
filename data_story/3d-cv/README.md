## CV 3D (Three.js + GSAP)

Aperçu: une "ville" 3D où chaque bâtiment ouvre une section du CV (Profil, Compétences, Expériences, Projets, Formation, Contact).

### Prévisualiser localement

Option 1 (Node):

```
npx --yes http-server 3d-cv -p 5500 -c-1
```

Option 2 (Python):

```
cd 3d-cv && python -m http.server 5500
```

Puis ouvrez `http://localhost:5500` dans votre navigateur.

### Personnalisation

- Contenu: modifiez `CV_DATA` dans `main.js`.
- Styles: `styles.css`.
- Mise en page: `index.html`.



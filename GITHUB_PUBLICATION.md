# 🚀 Guide de Publication sur GitHub

Ce guide vous accompagne étape par étape pour publier votre projet Data Storytelling sur GitHub.

## 📋 Prérequis

- ✅ Compte GitHub créé
- ✅ Git configuré localement
- ✅ Projet prêt (déjà fait !)

## 🎯 Étapes de Publication

### 1. **Créer le Repository sur GitHub**

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton **"New"** ou **"+"** > **"New repository"**
3. Configurez le repository :
   - **Repository name** : `data-storytelling`
   - **Description** : `Data Storytelling Platform - Interactive 3D portfolio with 32 data science projects`
   - **Visibility** : `Public` (recommandé pour un portfolio)
   - **Initialize with** : Ne cochez rien (nous avons déjà un projet)
4. Cliquez sur **"Create repository"**

### 2. **Connecter le Repository Local à GitHub**

```bash
# Ajouter le remote origin
git remote add origin https://github.com/michaelgermini/data-storytelling.git

# Vérifier le remote
git remote -v

# Pousser le code vers GitHub
git branch -M main
git push -u origin main
```

### 3. **Configurer GitHub Pages**

1. Allez dans votre repository sur GitHub
2. Cliquez sur **"Settings"** (onglet)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Configurez :
   - **Source** : `Deploy from a branch`
   - **Branch** : `gh-pages` (sera créé automatiquement par GitHub Actions)
   - **Folder** : `/(root)`
5. Cliquez sur **"Save"**

### 4. **Activer GitHub Actions**

1. Dans votre repository, allez dans l'onglet **"Actions"**
2. Le workflow de déploiement devrait apparaître automatiquement
3. Cliquez sur **"Deploy to GitHub Pages"**
4. Cliquez sur **"Run workflow"** pour le premier déploiement

### 5. **Configurer le Domaine Personnalisé (Optionnel)**

Si vous voulez utiliser `upframe.com` :

1. Dans **Settings** > **Pages**
2. Dans la section **"Custom domain"**
3. Entrez : `upframe.com`
4. Cliquez sur **"Save"**
5. Configurez votre DNS pour pointer vers GitHub Pages

## 📊 Vérification du Déploiement

### 1. **Vérifier GitHub Actions**
- Allez dans l'onglet **"Actions"**
- Vérifiez que le workflow s'est exécuté avec succès
- Le statut doit être vert ✅

### 2. **Vérifier GitHub Pages**
- Allez dans **Settings** > **Pages**
- Vous devriez voir : "Your site is published at https://michaelgermini.github.io/data-storytelling/"

### 3. **Tester le Site**
- Ouvrez l'URL de votre site
- Vérifiez que tout fonctionne correctement
- Testez la navigation et les fonctionnalités

## 🎨 Personnalisation du Repository

### 1. **Ajouter une Description**
Dans la page principale du repository, cliquez sur l'icône crayon à côté de la description.

### 2. **Ajouter des Topics**
Cliquez sur l'icône crayon à côté de "About" et ajoutez des topics :
```
data-science, react, typescript, vite, 3d-visualization, portfolio, data-storytelling, threejs, tailwindcss
```

### 3. **Configurer le README**
Le README.md est déjà configuré avec :
- ✅ Badges de statut
- ✅ Description du projet
- ✅ Instructions d'installation
- ✅ Technologies utilisées
- ✅ Liens de contact

## 🔧 Configuration Avancée

### 1. **Protection de la Branche Main**
1. Allez dans **Settings** > **Branches**
2. Cliquez sur **"Add rule"**
3. Configurez :
   - **Branch name pattern** : `main`
   - **Require pull request reviews before merging** : ✅
   - **Require status checks to pass before merging** : ✅

### 2. **Issues et Discussions**
1. Allez dans **Settings** > **Features**
2. Activez :
   - ✅ **Issues**
   - ✅ **Discussions**
   - ✅ **Wiki** (optionnel)

### 3. **Security**
1. Allez dans **Settings** > **Security**
2. Activez :
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**

## 📈 Optimisation SEO

### 1. **Meta Tags**
Le fichier `index.html` contient déjà les meta tags optimisés.

### 2. **Sitemap**
GitHub Pages génère automatiquement un sitemap.

### 3. **Robots.txt**
Créé automatiquement par GitHub Pages.

## 🔗 Liens Utiles

### Repository
- **URL** : https://github.com/michaelgermini/data-storytelling
- **Issues** : https://github.com/michaelgermini/data-storytelling/issues
- **Discussions** : https://github.com/michaelgermini/data-storytelling/discussions

### Site Web
- **GitHub Pages** : https://michaelgermini.github.io/data-storytelling/
- **Site Principal** : https://upframe.com/

### Contact
- **Email** : michael@germini.info
- **GitHub** : @michaelgermini
- **YouTube** : @TerminalZone404

## 🚀 Prochaines Étapes

### 1. **Promotion**
- Partagez le lien sur LinkedIn
- Postez sur Twitter/X
- Ajoutez à votre CV
- Mentionnez dans vos candidatures

### 2. **Maintenance**
- Surveillez les dépendances avec Dependabot
- Mettez à jour régulièrement
- Répondez aux issues et discussions

### 3. **Amélioration Continue**
- Ajoutez de nouveaux projets
- Améliorez les performances
- Optimisez l'expérience utilisateur

## 🎉 Félicitations !

Votre projet Data Storytelling est maintenant publié sur GitHub avec :
- ✅ Repository professionnel
- ✅ Déploiement automatique
- ✅ Documentation complète
- ✅ Badges de statut
- ✅ Site web accessible

**Votre portfolio est maintenant visible par le monde entier ! 🌍**

---

**Besoin d'aide ?** Contactez [michael@germini.info](mailto:michael@germini.info)

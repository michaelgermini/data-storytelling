# 🌐 Déploiement Direct Infomaniak - Console Commands

Guide pour télécharger et déployer directement depuis la console Infomaniak.

## 🚀 **Méthode 1 : Téléchargement Direct depuis GitHub**

### **Étape 1 : Connexion SSH**
```bash
# Connectez-vous à votre console SSH Infomaniak
ssh username@your-server.infomaniak.com
```

### **Étape 2 : Navigation**
```bash
# Aller dans votre répertoire web
cd /home/clients/xxxxx/web/upframe.com/

# Vérifier le répertoire actuel
pwd
ls -la
```

### **Étape 3 : Téléchargement et Déploiement**
```bash
# Télécharger le ZIP depuis GitHub
wget https://github.com/michaelgermini/data-storytelling/archive/refs/heads/main.zip

# Renommer le fichier
mv main.zip portfolio-infomaniak.zip

# Extraire le contenu
unzip portfolio-infomaniak.zip

# Aller dans le dossier extrait
cd data-storytelling-main

# Installer les dépendances
npm install

# Construire le projet
npm run build

# Copier les fichiers de production
cp -r dist/* ../

# Retourner au répertoire parent
cd ..

# Nettoyer
rm -rf data-storytelling-main
rm portfolio-infomaniak.zip

# Vérifier le résultat
ls -la
```

## 🚀 **Méthode 2 : Script Automatisé**

### **Étape 1 : Créer le script**
```bash
# Créer le fichier script
nano download-deploy.sh
```

### **Étape 2 : Copier le contenu du script**
```bash
#!/bin/bash
echo "🚀 Déploiement automatique Infomaniak..."

# Télécharger depuis GitHub
wget -O portfolio.zip https://github.com/michaelgermini/data-storytelling/archive/refs/heads/main.zip

# Extraire
unzip -q portfolio.zip
cd data-storytelling-main

# Installer et construire
npm install
npm run build

# Déployer
cp -r dist/* ../
cd ..
rm -rf data-storytelling-main portfolio.zip

echo "✅ Déploiement terminé !"
ls -la
```

### **Étape 3 : Exécuter le script**
```bash
# Rendre le script exécutable
chmod +x download-deploy.sh

# Exécuter le script
./download-deploy.sh
```

## 🚀 **Méthode 3 : Commandes Directes (Recommandée)**

### **Copier-coller ces commandes dans votre console SSH :**

```bash
# 1. Aller dans le répertoire web
cd /home/clients/xxxxx/web/upframe.com/

# 2. Sauvegarder l'ancienne version (optionnel)
mv public_html public_html_backup_$(date +%Y%m%d)

# 3. Créer le nouveau répertoire
mkdir public_html
cd public_html

# 4. Télécharger depuis GitHub
wget https://github.com/michaelgermini/data-storytelling/archive/refs/heads/main.zip

# 5. Extraire
unzip main.zip

# 6. Aller dans le projet
cd data-storytelling-main

# 7. Installer Node.js si nécessaire
# (Infomaniak a généralement Node.js installé)
node --version
npm --version

# 8. Installer les dépendances
npm install

# 9. Construire le projet
npm run build

# 10. Copier les fichiers de production
cp -r dist/* ../../

# 11. Retourner au répertoire web
cd ../../

# 12. Nettoyer
rm -rf public_html/data-storytelling-main
rm public_html/main.zip

# 13. Vérifier
ls -la
```

## 🔧 **Configuration Post-Déploiement**

### **Créer le fichier .htaccess**
```bash
# Créer le fichier .htaccess
cat > .htaccess << 'EOF'
RewriteEngine On
RewriteBase /

# Handle React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>
EOF
```

### **Configurer les permissions**
```bash
# Définir les bonnes permissions
chmod 755 .
chmod 644 *.html
chmod 644 assets/*
chmod 644 .htaccess
```

## 🔍 **Vérification**

### **Tester le déploiement**
```bash
# Vérifier que les fichiers sont en place
ls -la

# Tester l'accès (si curl est disponible)
curl -I https://upframe.com/

# Vérifier les logs
tail -f /var/log/apache2/error.log
```

## 🆘 **Dépannage**

### **Si Node.js n'est pas installé :**
```bash
# Vérifier si Node.js est disponible
which node
which npm

# Si pas disponible, contacter le support Infomaniak
# ou utiliser une version pré-compilée
```

### **Si npm install échoue :**
```bash
# Essayer avec --legacy-peer-deps
npm install --legacy-peer-deps

# Ou avec --force
npm install --force
```

### **Si le build échoue :**
```bash
# Vérifier la version de Node.js
node --version

# Nettoyer le cache npm
npm cache clean --force

# Réessayer
npm install
npm run build
```

## 📞 **Support**

- **Infomaniak Support** : https://support.infomaniak.com/
- **Email** : [michael@germini.info](mailto:michael@germini.info)
- **GitHub** : [@michaelgermini](https://github.com/michaelgermini)

## 🎉 **Félicitations !**

Votre site sera accessible sur : **https://upframe.com/**

**Le déploiement direct depuis la console est maintenant terminé ! 🌍✨**

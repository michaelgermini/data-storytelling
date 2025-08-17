# 🌐 Déploiement Infomaniak - Version Simplifiée

Guide étape par étape pour déployer sur Infomaniak sans problème.

## 🚀 **Méthode Ultra-Simple**

### **Étape 1 : Connexion SSH**
```bash
# Connectez-vous à votre console SSH Infomaniak
ssh username@your-server.infomaniak.com
```

### **Étape 2 : Vérifier l'environnement**
```bash
# Vérifier où vous êtes
pwd

# Vérifier si Node.js est disponible
node --version
npm --version

# Si Node.js n'est pas disponible, utilisez la méthode pré-compilée
```

### **Étape 3A : Si Node.js est disponible**
```bash
# Aller dans le répertoire web
cd /home/clients/xxxxx/web/upframe.com/

# Télécharger le projet
wget https://github.com/michaelgermini/data-storytelling/archive/refs/heads/main.zip

# Extraire
unzip main.zip

# Aller dans le projet
cd data-storytelling-main

# Installer et construire
npm install
npm run build

# Copier les fichiers
cp -r dist/* ../

# Nettoyer
cd ..
rm -rf data-storytelling-main main.zip
```

### **Étape 3B : Si Node.js n'est PAS disponible (Méthode Pré-compilée)**
```bash
# Aller dans le répertoire web
cd /home/clients/xxxxx/web/upframe.com/

# Télécharger la version pré-compilée
wget https://github.com/michaelgermini/data-storytelling/releases/download/v1.0.0/upframe-ready.zip

# Ou télécharger depuis le repository principal
wget https://raw.githubusercontent.com/michaelgermini/data-storytelling/main/upframe-ready.zip

# Extraire
unzip upframe-ready.zip

# Vérifier
ls -la
```

## 🔧 **Configuration .htaccess**

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
# Permissions
chmod 755 .
chmod 644 *.html
chmod 644 assets/*
chmod 644 .htaccess
```

## 🆘 **Dépannage**

### **Problème 1 : Erreur de connexion SSH**
```bash
# Vérifier vos identifiants
# Utiliser la console web Infomaniak à la place
# Manager > Votre site > Console SSH
```

### **Problème 2 : Node.js non disponible**
```bash
# Utiliser la méthode pré-compilée
# Ou contacter le support Infomaniak pour installer Node.js
```

### **Problème 3 : Erreur de permissions**
```bash
# Vérifier les permissions
ls -la

# Corriger si nécessaire
chmod 755 .
chmod 644 *.html
```

### **Problème 4 : Erreur 404**
```bash
# Vérifier que le .htaccess est présent
ls -la .htaccess

# Vérifier la configuration du domaine dans Manager Infomaniak
```

## 📞 **Support Immédiat**

### **Si rien ne marche :**
1. **Contactez le support Infomaniak** : https://support.infomaniak.com/
2. **Email** : [michael@germini.info](mailto:michael@germini.info)
3. **GitHub** : [@michaelgermini](https://github.com/michaelgermini)

### **Alternative : Utiliser le File Manager**
1. Allez dans **Manager Infomaniak** > **Votre site** > **File Manager**
2. Uploadez le fichier `upframe-ready.zip`
3. Extrayez-le dans le répertoire web

## 🎉 **Vérification**

### **Tester le site**
```bash
# Vérifier les fichiers
ls -la

# Tester l'accès
curl -I https://upframe.com/
```

**Votre site sera accessible sur : https://upframe.com/**

---

## 📋 **Résumé des Fichiers**

- ✅ `upframe-ready.zip` - Version pré-compilée (72 KB)
- ✅ `.htaccess` - Configuration optimisée
- ✅ Guide simplifié pour Infomaniak

**Dites-moi quelle erreur vous avez exactement pour que je puisse vous aider plus précisément ! 🔧**

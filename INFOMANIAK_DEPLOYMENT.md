# 🌐 Déploiement Infomaniak - Guide Complet

Ce guide vous accompagne pour déployer votre projet Data Storytelling sur Infomaniak.

## 📋 Prérequis

- ✅ Compte Infomaniak actif
- ✅ Accès SSH à votre serveur
- ✅ Fichier ZIP prêt : `portfolio-infomaniak.zip`

## 🚀 Étapes de Déploiement

### **1. Connexion SSH à Infomaniak**

```bash
# Connexion SSH (remplacez par vos identifiants)
ssh username@your-server.infomaniak.com

# Ou via la console Infomaniak
# Allez dans Manager > Votre site > Console SSH
```

### **2. Navigation vers le Répertoire Web**

```bash
# Vérifier le répertoire actuel
pwd

# Aller dans le répertoire web (ajustez selon votre configuration)
cd /home/clients/xxxxx/web/upframe.com/

# Ou pour un sous-dossier
cd /home/clients/xxxxx/web/upframe.com/portfolio/
```

### **3. Upload du Fichier ZIP**

#### **Option A : Via SCP (Recommandé)**
```bash
# Depuis votre machine locale
scp portfolio-infomaniak.zip username@your-server.infomaniak.com:/home/clients/xxxxx/web/upframe.com/
```

#### **Option B : Via File Manager Infomaniak**
1. Allez dans **Manager** > **Votre site** > **File Manager**
2. Naviguez vers le répertoire web
3. Uploadez `portfolio-infomaniak.zip`

### **4. Extraction et Déploiement**

```bash
# Se connecter en SSH
ssh username@your-server.infomaniak.com

# Aller dans le répertoire web
cd /home/clients/xxxxx/web/upframe.com/

# Sauvegarder l'ancienne version (optionnel)
mv public_html public_html_backup_$(date +%Y%m%d)

# Créer le nouveau répertoire
mkdir public_html

# Extraire le ZIP
unzip portfolio-infomaniak.zip -d public_html/

# Vérifier le contenu
ls -la public_html/
```

### **5. Configuration des Permissions**

```bash
# Définir les bonnes permissions
chmod 755 public_html/
chmod 644 public_html/*.html
chmod 644 public_html/assets/*

# Définir le propriétaire (ajustez selon votre configuration)
chown -R www-data:www-data public_html/
```

### **6. Configuration du Serveur Web**

#### **Créer un fichier .htaccess pour SPA Routing**
```bash
# Créer le fichier .htaccess
cat > public_html/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
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
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOF
```

### **7. Test du Déploiement**

```bash
# Vérifier que les fichiers sont en place
ls -la public_html/

# Tester l'accès
curl -I https://upframe.com/
```

## 🔧 Configuration Avancée

### **1. Configuration du Domaine**

Dans **Manager Infomaniak** :
1. **Sites** > **Votre site** > **Domaines**
2. Vérifiez que `upframe.com` pointe vers le bon répertoire
3. Activez **HTTPS** si nécessaire

### **2. Configuration SSL/HTTPS**

```bash
# Vérifier le certificat SSL
openssl s_client -connect upframe.com:443 -servername upframe.com
```

### **3. Optimisation des Performances**

#### **Activer la Compression Gzip**
```bash
# Vérifier que mod_deflate est activé
apache2ctl -M | grep deflate
```

#### **Configuration du Cache**
```bash
# Ajouter dans .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## 🔍 Vérification Post-Déploiement

### **1. Tests Fonctionnels**
- ✅ Site accessible sur `https://upframe.com/`
- ✅ Navigation fonctionnelle
- ✅ Projets s'affichent correctement
- ✅ Recherche et filtres opérationnels
- ✅ Responsive design sur mobile

### **2. Tests de Performance**
```bash
# Test de vitesse
curl -w "@curl-format.txt" -o /dev/null -s "https://upframe.com/"

# Vérifier les headers de cache
curl -I https://upframe.com/assets/index-421911c7.js
```

### **3. Tests de Sécurité**
- ✅ HTTPS actif
- ✅ Headers de sécurité appropriés
- ✅ Pas d'erreurs dans les logs

## 📊 Monitoring

### **1. Logs d'Accès**
```bash
# Voir les logs d'accès
tail -f /var/log/apache2/access.log

# Voir les logs d'erreur
tail -f /var/log/apache2/error.log
```

### **2. Métriques de Performance**
- Surveillez les temps de chargement
- Vérifiez l'utilisation de la bande passante
- Contrôlez l'utilisation du CPU/mémoire

## 🔄 Mise à Jour

### **Processus de Mise à Jour**
```bash
# 1. Créer un nouveau build
npm run build

# 2. Créer un nouveau ZIP
Compress-Archive -Path "dist/*" -DestinationPath "portfolio-infomaniak-v2.zip" -Force

# 3. Upload et déploiement
scp portfolio-infomaniak-v2.zip username@your-server.infomaniak.com:/home/clients/xxxxx/web/upframe.com/
ssh username@your-server.infomaniak.com
cd /home/clients/xxxxx/web/upframe.com/
unzip -o portfolio-infomaniak-v2.zip -d public_html/
```

## 🆘 Dépannage

### **Problèmes Courants**

#### **1. Erreur 404**
```bash
# Vérifier les permissions
ls -la public_html/
chmod 755 public_html/
chmod 644 public_html/*.html
```

#### **2. Erreur de Routing**
```bash
# Vérifier le .htaccess
cat public_html/.htaccess

# Vérifier que mod_rewrite est activé
apache2ctl -M | grep rewrite
```

#### **3. Problèmes de Cache**
```bash
# Vider le cache du navigateur
# Ou ajouter un paramètre de version
# https://upframe.com/?v=1.0.1
```

## 📞 Support

- **Infomaniak Support** : https://support.infomaniak.com/
- **Email** : [michael@germini.info](mailto:michael@germini.info)
- **GitHub** : [@michaelgermini](https://github.com/michaelgermini)

## 🎉 Félicitations !

Votre projet Data Storytelling est maintenant déployé sur Infomaniak avec :
- ✅ Déploiement automatisé
- ✅ Configuration optimisée
- ✅ SSL/HTTPS actif
- ✅ Performance optimisée
- ✅ Monitoring en place

**Votre site est maintenant accessible sur https://upframe.com/ ! 🌍✨**

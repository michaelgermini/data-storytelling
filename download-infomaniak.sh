#!/bin/bash

# Script de téléchargement pour Infomaniak
# Télécharge le ZIP directement depuis GitHub

echo "🚀 Téléchargement du fichier ZIP pour Infomaniak..."

# URL du fichier ZIP sur GitHub (à ajuster selon votre repository)
ZIP_URL="https://github.com/michaelgermini/data-storytelling/archive/refs/heads/main.zip"
FILENAME="portfolio-infomaniak.zip"

# Télécharger le fichier
echo "📥 Téléchargement en cours..."
wget -O "$FILENAME" "$ZIP_URL"

# Vérifier si le téléchargement a réussi
if [ $? -eq 0 ]; then
    echo "✅ Téléchargement réussi !"
    echo "📁 Fichier : $FILENAME"
    echo "📊 Taille : $(du -h "$FILENAME" | cut -f1)"
    
    # Extraire le contenu
    echo "📦 Extraction en cours..."
    unzip -q "$FILENAME"
    
    # Aller dans le dossier extrait
    cd data-storytelling-main
    
    # Installer les dépendances et construire
    echo "🔧 Installation des dépendances..."
    npm install
    
    echo "🏗️ Construction du projet..."
    npm run build
    
    # Copier le contenu du dossier dist
    echo "📋 Copie des fichiers..."
    cp -r dist/* ../
    
    # Retourner au répertoire parent
    cd ..
    
    # Nettoyer
    echo "🧹 Nettoyage..."
    rm -rf data-storytelling-main
    rm "$FILENAME"
    
    echo "🎉 Déploiement terminé !"
    echo "📂 Contenu du répertoire :"
    ls -la
    
else
    echo "❌ Erreur lors du téléchargement"
    exit 1
fi

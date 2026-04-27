# 🍽️ LunchladyApp — Version Mobile (Ionic / Capacitor)

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

> 🎓 Projet formation — Aston École Informatique 2021  
> Version mobile Ionic/Capacitor de l'application de gestion de cantine

---

## 📋 Contexte

Portage mobile de l'application LunchladyApp, développé dans le cadre de la formation au Titre RNCP niveau 6 (Bac+3/4) à Aston École Informatique.

L'application consomme la même API REST Java en lecture seule, avec authentification JWT, dans une interface adaptée mobile grâce à Ionic et Capacitor.

---

## ✨ Fonctionnalités

- 🔐 Authentification JWT (login / logout / token management)
- 📋 Consultation du menu de la cantine
- 🛒 Commande de repas
- 👤 Gestion du profil utilisateur
- 📱 Interface mobile native via Ionic Components
- 🔒 Guards Angular pour la protection des routes

---

## 🛠️ Stack technique

| Côté | Technologies |
|------|-------------|
| Framework mobile | Ionic |
| Framework web | Angular |
| Langage | TypeScript |
| Style | SCSS |
| Runtime natif | Capacitor |
| Auth | JWT (JSON Web Tokens) |
| HTTP | Angular HttpClient |

---

## 🚀 Installation et lancement

```bash
# Cloner le repo
git clone https://github.com/MaxGsprd/cantiniere_ionic.git

# Installer les dépendances
npm install

# Lancer en mode navigateur
ionic serve

# Build pour mobile (iOS / Android)
ionic build
npx cap sync
```

---

## 📌 Notes

> L'API Java back-end n'est plus disponible — l'application ne peut pas être exécutée en conditions réelles.  
> Ce repo illustre l'utilisation d'Ionic/Capacitor, la gestion JWT et la consommation d'API REST sur mobile.

---

*Voir aussi : [cantiniere_max](https://github.com/MaxGsprd/cantiniere_max) — version web Angular du même projet*


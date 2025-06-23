# Hackathon 2025

## Technologies utilisées

- **NestJS** : Framework backend pour la gestion des API et de la logique métier.
- **NextJS** : Framework frontend pour une expérience utilisateur fluide et moderne.
- **Docker** : Conteneurisation de l'application pour un déploiement simplifié.
- **PostgreSQL** : Base de données relationnelle pour stocker les informations des utilisateurs et les messages.
- **Prisma** : ORM pour gérer les interactions avec la base de données. (À VOIR)
- **Adminer** : Interface web pour la gestion de la base de données.
- **MailDev** : Outil pour tester les emails envoyés par l'application.

## Installation et utilisation

1. **Cloner le dépôt** :  

    ```bash
    git clone https://github.com/ines-mgg/Hackathon
    cd Hackathon
    ```

2. **Créer le fichier `.env` (voir `.env.local`)** :

    ```plaintext
    NEST_PORT=
    NEXT_PUBLIC_BACK_URL=
    NODE_ENV=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    DATABASE_URL=
    JWT_SECRET=
    JWT_SECRET_EXPIRATION=
    ```

3. **Lancer l'application avec Docker** :  
    Assurez-vous d'avoir Docker installé sur votre machine.  

    ```bash
    docker compose down -v # si besoin
    docker compose up --build -d
    ```

4. **Initialiser la base de données avec Prisma** :  
    Une fois les conteneurs Docker démarrés, exécutez la commande suivante pour synchroniser le schéma de la base de données :  

    ```bash
    docker-compose exec backend npx prisma db push
    ```

5. **Ajouter des données** :  
    Pour gérer et ajouter des données à la base de données, vous avez plusieurs options :  

    - **Utiliser Adminer** : Accédez à l'interface web d'Adminer pour manipuler les données directement.  
    - **Utiliser Prisma Studio** : Lancez Prisma Studio, un outil visuel pour gérer vos données, avec la commande suivante :  

        ```bash
        docker-compose exec backend npx prisma studio
        ```

    - **Utiliser les seeders** : Ajoutez des données avec la commande suivante :

        ```bash
        docker-compose exec backend npm run seed
        ```

## Status du projet

Ce projet est en **cours de développement**.

## Équipe

- Marie Minga
- Hanane Meddad
- Inès Maganga
- Ulysse Asso’o
- Fabian Zuo
- Arthur Bouaki

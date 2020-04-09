# Lumberjack

Application for order management of a lumber yard company.

# Get Started

Download the Node.js source code or a pre-built installer for the matching platform

- [NodeJS](https://nodejs.org/en/download/)

Download and install MariaDB for local machine (recommended setup for development mode)

- [MariaDB](https://downloads.mariadb.org/mariadb/10.0.10/)

Create a database using command line or HeidiSQL

- CREATE OR REPLACE DATABASE lumberjack;

Create a file with name `.env.example` in `backend/src` and copy the `.env.example` file's content. Edit it with your local configuration (database credentials, ports etc.).
```sh
cd /backend
cp .env.example .env
(edit new file)
```

Download and install Visual Studio Code (VS Code)

- [Visual Studio Code](https://code.visualstudio.com/download)

Clone the repository from GitLab

- [GitHub Repository](https://gitlab.com/papiliond/lumberjack/)

Install NPM packages and dependencies for NestJS and Angular

```sh
cd /backend
npm install
npm audit fix
...
cd ..
cd /frontend
npm install
npm audit fix
```

Fresh build database migrations and project structure

```sh
cd /backend
npm install -g typeorm
npm run build
typeorm migration:run
```

(If entity structure changes, new migration and revert of the previous version is needed.)

```sh
typeorm migration:revert
```

Run the backend server and frontend application in two different terminals or command lines:

## Running the backend application

```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Running tests in backend

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Running the frontend application

```sh
cd /frontend
ng serve --open
```

## Deployment to Heroku

$ heroku login

Put your database data to .env, and remove it from gitignore.

$ git subtree push --prefix backend heroku master
(or force push)
$ git push -f heroku \`git subtree split --prefix backend\`:master

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

## Automate database backup on server (MariaDB on Linux)**

_- Prerequisites:_ {username} with the corresponding OS user!

1. Make sure that MySQL dump executable script is accessible in the central 'bin' folder:

Command:
`bash /usr/bin/mysqldump`

Content:
`mysqldump -u <db_username> -p <db_name> --single-transaction --quick --lock-tables=false > <db_name>-backup-$(date +%F).sql`

2. Create a file with MariaDB connection details for root user:

Path:
`/home/{username}/.lumberjack_login.cnf`

Content:

```
[client]
user = lumberjack
password = lumberjack
```

3. Restrict permissions of the credentials file:

Command:
`sudo chmod 600 /home/{username}/.lumberjack_login.cnf`

4. Create a folder where database backup files will be stored:

Command:
`mkdir /home/{username}/db_backup`

5. Create a cron job file which will create a full backup of the database every day at 03:00 AM:

Path:
`/etc/cron.daily/database_dump`

Content:
`0 3 \* \* \* /usr/bin/mysqldump --defaults-extra-file=/home/{username}/.lumberjack*login.cnf -u root --single-transaction --quick --lock-tables=false lumberjack > /home/{username}/db_backup/db_backup*\$(date +"%Y-%m-%d").sql`

ACTUAL RUNNING CRON JOB COMMAND:

`/usr/bin/mysqldump --defaults-extra-file=/home/yogacent/.yogacent_plan_login.cnf yogacent_plan --single-transaction --quick --lock-tables=false > /home/yogacent/plan.yogacentarsubotica.com/db_backup/yogacent_plan-`date "+\%F-\%H\%M\%S"`.sql`

6. Set up a cron job that runs every day at 04:00 AM which deletes all database dump files older than 30 days:

Path:
`/etc/cron.daily/cleanup_db_dumps`

Content:
`0 4 \* \* _ /usr/bin/find /home/{username}/db_backup/ -name "_.sql" -type f -mtime +30 -exec rm -f {} \;`

7. Depending on the operation system, you need to run the cron job service restart command (command can include 'cron' and 'crond' as they are not the same):

Commands:

```
sudo service cron reload
sudo service cron restart
sudo systemctl start crond.service
sudo /etc/init.d/cron reload
sudo /etc/init.d/crond reload
```

######################################################################

**Restore database backup on server (MariaDB on Linux)**

1. Make sure that MySQL executable script is accessible in the central 'bin' folder:

Command:
`bash /usr/bin/mysql`

2. Verify if the chosen database dump file is available and readable for the current user:

Command:
`ls -l /home/{username}/db*backup/db_backup*{chosen_date}.sql`

3. Restore a single database dump (no space between -p flag and the password):

Command:
`mysql -u lumberjack -plumberjack lumberjack < /home/{username}/db*backup/db_backup*{chosen_date}.sql`

4. Check your database in database administrator console and on using web client!

Administrator steps...

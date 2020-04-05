Automate database backup on server (MariaDB on Linux)

- Prerequisites: {username} with the corresponding OS user!

1. Make sure that MySQL dump executable script is accessible in the central 'bin' folder:

Command:
bash /usr/bin/mysqldump

2. Create a file with MariaDB connection details for root user:

Path:
/home/{username}/.lumberjack_login.cnf

Content:
[client]
user = lumberjack
password = lumberjack

3. Restrict permissions of the credentials file:

Command:
sudo chmod 600 /home/{username}/.lumberjack_login.cnf

4. Create a folder where database backup files will be stored:

Command:
mkdir /home/{username}/db_backup

5. Create a cron job file which will create a full backup of the database every day at 03:00 AM:

Path:
/etc/cron.daily/database_dump

Content:
0 3 \* \* \* /usr/bin/mysqldump --defaults-extra-file=/home/{username}/.lumberjack*login.cnf -u root --single-transaction --quick --lock-tables=false lumberjack > /home/{username}/db_backup/db_backup*\$(date +"%Y-%m-%d").sql

6. Set up a cron job that runs every day at 04:00 AM which deletes all database dump files older than 30 days:

Path:
/etc/cron.daily/cleanup_db_dumps

Content:
0 4 \* \* _ /usr/bin/find /home/{username}/db_backup/ -name "_.sql" -type f -mtime +30 -exec rm -f {} \;

7. Depending on the operation system, you need to run the cron job service restart command (command can include 'cron' and 'crond' as they are not the same):

Commands:
sudo service cron reload
sudo service cron restart
sudo systemctl start crond.service
sudo /etc/init.d/cron reload
sudo /etc/init.d/crond reload

######################################################################

Restore database backup on server (MariaDB on Linux)

1. Make sure that MySQL executable script is accessible in the central 'bin' folder:

Command:
bash /usr/bin/mysql

2. Verify if the chosen database dump file is available and readable for the current user:

Command:
ls -l /home/{username}/db*backup/db_backup*{chosen_date}.sql

3. Restore a single database dump (no space between -p flag and the password):

Command:
mysql -u lumberjack -plumberjack lumberjack < /home/{username}/db*backup/db_backup*{chosen_date}.sql

4. Check your database in database administrator console and on using web client!

Administrator steps...

######################################################################

1. Set up a cron job that runs every day at 04:00 AM which deletes all database dump files older than 30 days:
   0 0 \* \* _ /usr/bin/find /home/{username}/db_backup/ -name "_.sql" -type f -mtime +30 -exec rm -f {} \;

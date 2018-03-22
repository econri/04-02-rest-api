**Steps**:
* for install node modules: npm install
* for sync PostgreSQL DataBase with your models: npm run syncDB
* for install migrate module globally: npm install migrate -g
* for insert data in DataBase: migrate up
* for delete data from DataBase: migrate down
* for starting server app: npm start


**For using PostgreSQL**
* download and install PostgreSQL from official web-site https://www.postgresql.org/download/
* user main *postgres* role with pass *postgres* or create your postgres user

*If you create new user and want work with it:*
* change server configs in file './server/configs/config.js'

*don't forget to create database for this user*

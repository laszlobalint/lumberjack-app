const mode = process.env.NODE_ENV;

if (mode === "staging") {
  module.exports = {
    "type": "mariadb",
    "host": "ivgz2rnl5rh7sphb.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    "port": 3306,
    "username": "fv40kwqxdkf8zalp",
    "password": "mdm67n55il6assrm",
    "database": "gt0i923sbcodjf0a",
    "synchronize": false,
    "entities": ["dist/**/*.entity.js"],
    "migrations": ["dist/migrations/*.js"],
    "cli": {
      "migrationsDir": "migrations"
    },
    "extra": {
      "charset": "utf8mb4"
    }
  }
} else {
  module.exports = {
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "lumberjack",
    "password": "lumberjack",
    "database": "lumberjack",
    "synchronize": false,
    "entities": ["dist/**/*.entity.js"],
    "migrations": ["dist/migrations/*.js"],
    "cli": {
      "migrationsDir": "migrations"
    },
    "extra": {
      "charset": "utf8mb4"
    }
  }
}

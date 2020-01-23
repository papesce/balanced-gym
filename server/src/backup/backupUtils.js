const backup = require("mongodb-backup-4x");
const restore = require("mongodb-restore");
const path = require("path");

class MongoDBUtils {
  static execute(API) {
    MongoDBUtils.backup(API);
  }

  static backup(API, name) {
    // backup and restore DB
    console.log(`backing up the database ${API}`);
    backup({
      uri: API, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: path.join(__dirname, "/dbbackup"),
      // tar: `${name}.tar`
    });
  }

  static restore(API, name) {
    console.log(`restoring the database ${API} from ${name}`);
    restore({
      uri: API, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: path.join(__dirname, "/dbbackup/balanced_gym"),
      // tar: `${name}.tar`,
      drop: true,
      logger: path.join(__dirname, "/log"),
    });
  }
}

module.exports = MongoDBUtils;

const MongoDBUtils = require("./backupUtils");
require("dotenv").config();

// database backup/restore
if (process.env.NODE_ENV === "production") {
  MongoDBUtils.backup(process.env.MONGODB_REMOTE_API, "remote");
} else {
  MongoDBUtils.backup(process.env.MONGODB_LOCAL_API, "local");
}

console.log("Finished doing backup.");

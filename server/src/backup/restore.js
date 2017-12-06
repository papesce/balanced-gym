const MongoDBUtils = require("./backupUtils");
require("dotenv").config();

// database backup/
// database backup/restore
if (process.env.NODE_ENV === "production") {
  MongoDBUtils.restore(process.env.MONGODB_REMOTE_API, "local");
} else {
  MongoDBUtils.restore(process.env.MONGODB_LOCAL_API, "remote");
}
console.log("Finished restoring backup.");

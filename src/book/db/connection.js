const MongoClient = require("mongodb").MongoClient;

module.exports = async function(config) {
  const dbConnection = await MongoClient.connect(config.db, {
      bufferMaxEntries: 0
  });

  return dbConnection.db();
}


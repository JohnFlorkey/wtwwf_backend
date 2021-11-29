const { Client } = require("pg");
const { DB_URI } = require("./config");

let client;

if (process.env.NODE_ENV === "production") {
  client = new Client({
    connectionString: DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  client = new Client(DB_URI);
}

client.connect();

module.exports = client;

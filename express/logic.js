var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    }
});


module.exports = {
    create: function (payload, cb) {
        //do something with the payload, like insert to db
        cb();
    }
};
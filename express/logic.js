const Datastore = require('nedb');
const db = new Datastore();

module.exports = {
    create: function (payload, cb) {
        db.insert(payload, cb);
    }
};
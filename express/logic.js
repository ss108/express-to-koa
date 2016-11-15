const Datastore = require('nedb');
const db = new Datastore();

module.exports = {
    create: function (payload, cb) {
        db.insert(payload, cb);
    },

    delete: function (id, cb) {
        db.remove({ _id: id }, {}, cb);
    },

    getAll: function (cb) {
        db.find({}, function (err, users) {
            if (err) {
                cb(err);
            }

            else {
                users.forEach((u) => {
                    u.something = "else";
                });

                cb(null, users);
            }
        });
    }

};
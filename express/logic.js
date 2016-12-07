import Datastore from "nedb";
const db = new Datastore();

const logic = {
    create: function (payload, cb) {
        payload.read = false;
        db.insert(payload, cb);
    },

    delete: function (id, cb) {
        db.remove({ _id: id }, {}, cb);
    },

    get: function (id, cb) {
        db.findOne({ _id: id }, cb);
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
    },

    markAsRead: function (id, cb) {
        db.update({ _id: id }, { $set: { read: true } }, {}, cb);
    }

};

export default logic;
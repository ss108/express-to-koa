import Datastore from "nedb";
const db = new Datastore();

import promisify from "es6-promisify";

import { execAsPromise } from "./utils";

export default {
    create: function (payload) {
        payload.read = false;
        return new Promise((resolve, reject) => {
            db.insert(payload, (err, item) => {
                if (err) {
                    reject(err);
                }

                else {
                    resolve(item);
                }
            });
        });
    },

    get: function (id) {
        return execAsPromise(db.find.bind(db, { _id: id }));
    },

    delete: function (id) {
        return execAsPromise(db.remove.bind(db, { _id: id }));

    },

    getAll: async function () {
        let messages = await execAsPromise(db.find.bind(db, {}));

        messages.forEach((m) => {
            m.something = "else";
        });

        return messages;
    },

    markAsRead: function (id) {
        let update = promisify(db.update, db);
        return update({ _id: id }, { $set: { read: true } }, {});
    }
}


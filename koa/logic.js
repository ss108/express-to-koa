import Datastore from "nedb";
const db = new Datastore();

export default {
    create: function (payload) {
        //do something with the payload, like insert to db. 
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
    }
}
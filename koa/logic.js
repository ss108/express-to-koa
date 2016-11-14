import knex from "knex";

const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    }
});

export default {
    create: function (payload) {
        //do something with the payload, like insert to db. 
        return Promise.resolve();
    }
}
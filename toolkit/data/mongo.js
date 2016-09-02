/**
 * Created by rcard on 02/09/2016.
 */
var mongodb = require('mongodb');

var store = module.exports;

function tryCloseConnection(db) {
    try {
        db.close();
    } catch (e) {
        // I do not care.
    }
}

store.connect = () => {
    if (!global.app.config.connectionString) {
        throw 'Please set the connectionstring...';
    }

    return mongodb.MongoClient.connect(global.app.config.connectionString);
};

store.add = (collection, doc) => store.connect().then(
    db => {
        if (doc.id) {
            doc._id = doc.id;
        }
        return db.collection(collection).insert(doc).then(() => {
            tryCloseConnection(db);
            return doc._id;
        }, err => {
            tryCloseConnection(db);
            return err;
        });
    });

store.update = (collection, doc) => store.connect().then(
    db => {
        if (doc.id) {
            doc._id = doc.id;
        }

        var id = doc._id;
        delete doc._id;
        db.collection(collection).update({_id: id}, {$set: doc}, {upsert: true, safe: true}).then(
            () => {
                doc._id = id;
                tryCloseConnection(db);
                return doc;
            },
            err => {
                tryCloseConnection(db);
                return err;
            }
        );
    }
);

store.findOne = (collection, selector) => store.connect().then(
    db => {
        db.collection(collection).findOne(selector).then(
            result => {
                tryCloseConnection(db);
                return result;
            },
            err => {
                tryCloseConnection(db);
                return err;
            });
    });

store.objectId = id => new mongodb.BSONPure.ObjectID(id.toString());

store.findOneById = (collection, id) => store.connect().then(
    db => db.collection(collection).findOne({_id: store.objectId(id)}).then(
        result => {
            tryCloseConnection(db);
            return result;
        },
        err => {
            tryCloseConnection(db);
            return err;
        }
    )
);

store.find = (collection, selector) => store.connect().then(
    db => db.collection(collection).find(selector).toArray().then(
        result => {
            tryCloseConnection(db);
            return result;
        },
        err => {
            tryCloseConnection(db);
            return err;
        }
    )
);

store.removeById = (collection, id) => store.connect().then(
    db => db.collection(collection).remove({_id: store.objectId(id)}).then(
        result => {
            tryCloseConnection(db);
            return result;
        },
        err => {
            tryCloseConnection(db);
            return err;
        }
    )
);

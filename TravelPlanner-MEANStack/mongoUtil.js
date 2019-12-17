const MongoClient = require('mongodb').MongoClient;
const nconf = require('nconf');
let uri = `mongodb+srv://imran:<global>@cluster0-n3bxv.gcp.mongodb.net/test?retryWrites=true&w=majority`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}

var _db;

module.exports = {

    connectToServer: function(callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            _db = client.db('test');
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    }
};
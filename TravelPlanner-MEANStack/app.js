const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const port = 8080;
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var google = require('googleapis').google;
var OAuth2 = google.auth.OAuth2;
const MongoClient = require('mongodb').MongoClient;
let uri = `mongodb+srv://imran:<pass>@cluster0-n3bxv.gcp.mongodb.net/test?retryWrites=true&w=majority`;


const DATABASE_NAME = "test";
var database, collection, packageCollection, adminCollection;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/dist/travel-planner')));
auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/travel-planner/index.html'));
});
app.use(cookieParser());
app.get('/google_signin', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        var oauth2Client = new OAuth2();
        oauth2Client.setCredentials({ access_token: req.session.token });
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        oauth2.userinfo.get(
            function(err, res2) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res2);
                    collection.find({ "id": res2["data"]["id"] }).toArray((error, result) => {
                        if (error) {
                            return res.status(500).send(error);
                        }
                        console.log("collection result");
                        console.log(result);
                        if (result.length == 0) {
                            if (res2["data"]["id"] == "108420412227237662942") {
                                res2["data"]["type"] = "admin";
                            } else {
                                res2["data"]["type"] = "user";
                            }
                            collection.insert(res2["data"], (error2, result2) => {
                                if (error2) {
                                    return res.status(500).send(error2);
                                }
                                res.send({ "status": true, "message": "session cookie set", "data": res2["data"] });
                            });
                        } else {
                            res.send({ "status": true, "message": "session cookie set", "data": result[0] });
                        }
                    });
                    /*  */
                }
            });
    } else {
        res.cookie('token', '')
        res.send({ "status": false, "message": "session cookie not set", "data": {} });
    }
});
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
);
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.cookie('token', '')
    res.redirect('/');
});
app.post('/flightSearch', (req, res) => {
    console.log(req.body);
    console.log(req.body.depart_date);
    console.log(req.body.destination);
    console.log(req.body.origin);
    var options = {
        method: 'GET',
        url: 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/',
        qs: {
            return_date: req.body.return_date,
            depart_date: req.body.depart_date,
            destination: req.body.destination,
            origin: req.body.origin,
            currency: 'usd'
        },
        headers: {
            'x-rapidapi-host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com',
            'x-rapidapi-key': '123',
            'x-access-token': '123'
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.send(body);
    });
});
app.post('/searchAPI', (req, res) => {
    console.log(req.body);
    request('https://maps.googleapis.com/maps/api/place/textsearch/json?query=lodging+in+' + req.body.query + '&key=123', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        res.send(body)
    });
});

app.post('/package', (req, res) => {
    console.log(req.body);
    if (req.body.action == "create") {
        delete req.body["action"];
        if (req.body.type == "User") {
            req.body["booking_ids"] = [req.body.userID];
            req.body["package_id"] = Math.floor(100000 + Math.random() * 900000) + "" + req.body.userID;
            packageCollection.insert(req.body, (error2, result2) => {
                if (error2) {
                    return res2.status(500).send(error2);
                }
                res.send({ "status": true, "message": "package Added", "data": req.body });
            });
        } else if (req.body.type == "Travel Agent") {
            req.body["booking_ids"] = [];
            req.body["package_id"] = Math.floor(100000 + Math.random() * 900000) + "" + req.body.userID;
            packageCollection.insert(req.body, (error2, result2) => {
                if (error2) {
                    return res2.status(500).send(error2);
                }
                res.send({ "status": true, "message": "package Added", "data": req.body });
            });
        }

    } else if (req.body.action == "get") {
        packageCollection.find().toArray((error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            console.log(result);
            res.send({ "status": true, "data": result });
        });

    } else if (req.body.action == "remove") {
        console.log("remove package");
        console.log(req.body);
        packageCollection.remove({ "package_id": req.body["package_id"] }, { "justOne": true }, (error2, result2) => {
            if (error2) {
                return res.status(500).send(error2);
            }
            res.send({ "status": true, "message": "Package Removed" });
        });

    } else if (req.body.action == "book") {
        packageCollection.find({ "package_id": req.body["package"]["package_id"] }).toArray((error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            console.log(result);
            if (result.length > 0) {
                if (result[0]["booking_ids"].indexOf(req.body["booking_user_id"]) == -1) {
                    result[0]["booking_ids"].push(req.body["booking_user_id"]);
                    packageCollection.update({ "package_id": req.body["package"]["package_id"] }, result[0], (error2, result2) => {
                        if (error2) {
                            console.log(error2);
                        }
                        res.send({ "status": true, "message": "Package Booked" });
                    });
                } else {
                    res.send({ "status": true, "message": "You have already booked this package" });

                }
            } else {
                res.send({ "status": true, "message": "Package Not Found" });
            }
        });
    }

});


app.post('/admin', (req, res) => {
    console.log(req.body);
    if (req.body.action == "switch") {
        delete req.body["data"]["_id"];
        adminCollection.find({ "id": req.body["data"]["id"] }).toArray((error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            console.log(result);
            if (result.length == 0) {
                adminCollection.insert(req.body["data"], (error2, result2) => {
                    if (error2) {
                        return res.status(500).send(error2);
                    }
                    res.send({ "status": true, "message": "Switch User Request Placed", "data": req.body["data"] });
                });
            } else {
                res.send({ "status": true, "message": "Switch User Request is in queue" });

            }

        });
    } else if (req.body.action == "get") {
        adminCollection.find({}).toArray((error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            console.log(result);
            res.send({ "status": true, "message": "All Switch User Requests", "data": result });
        });
    } else if (req.body.action == "process") {
        console.log("---------------------");
        if (req.body["data"]["type"] == "User") {
            req.body["data"]["type"] = "Travel Agent";
        } else {
            req.body["data"]["type"] = "User";
            packageCollection.remove({ "userID": req.body["data"]["id"], "type": "Travel Agent" }, { "justOne": false }, (error2, result2) => {
                if (error2) {
                    return res.status(500).send(error2);
                }
            });
        }
        console.log(req.body);
        delete req.body["data"]["_id"];
        collection.update({ "id": req.body["data"]["id"] }, req.body["data"], (error2, result2) => {
            if (error2) {
                console.log(error2);
            }
        });
        adminCollection.remove({ "id": req.body["data"]["id"] }, { "justOne": true }, (error2, result2) => {
            if (error2) {
                return res.status(500).send(error2);
            }
            res.send({ "status": true, "message": "Successfully Processed" });
        });
    }

});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    MongoClient.connect(uri, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("user");
        packageCollection = database.collection("packages");
        adminCollection = database.collection("admin");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

});
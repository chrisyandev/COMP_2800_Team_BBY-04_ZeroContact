const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const {
    DB_URL
} = require("./credentials")
const connectionString = DB_URL;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

let app = express();

// Establish connection to MongoDB Server
MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
        console.log("Connected to database.");
        const db = client.db("zero-contact");
        const usersCollection = db.collection("users");

        app.use(express.urlencoded({
            extended: true
        }));
        app.use(express.static("public"));
        app.use(express.json());
        app.set("view engine", "ejs");


        // Get request for main page.
        app.get("/", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then((highscores) => {
                console.log(highscores)
                res.render("pages/landing-page/home.ejs", {
                    highscores: highscores
                })
            }).catch(error => console.error(error));
        });

        // Get request for about page.
        app.get("/about", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then((highscores) => {
                console.log(highscores)
                res.render("pages/landing-page/about.ejs", {
                    highscores: highscores
                })
            }).catch(error => console.error(error));
        });

        //Get request for main game.
        app.get("/game", (req, res) => res.render("pages/zero-contact/main.ejs"));

        //Get request for minigame.
        app.get("/minigame", (req, res) => res.render("pages/zero-contact/minigame.ejs"));

        //Get request for signup page.
        app.get("/signup", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then((highscores) => {
                console.log(highscores)
                res.render("pages/landing-page/signup.ejs", {
                    highscores: highscores
                })
            }).catch(error => console.error(error));
        });

        // Get request for login page.
        app.get("/login", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then((highscores) => {
                console.log(highscores)
                res.render("pages/landing-page/login.ejs", {
                    highscores: highscores
                })
            }).catch(error => console.error(error));
        });

        // Get request for delete accounts.
        app.get("/delete", (req, res) => res.render("pages/landing-page/home.ejs"));

        // Post request for signup page.
        app.post('/signup', (req, res) => {
            bcrypt.genSalt(saltRounds).then(salt => {
                console.log("salt " + salt)
                return bcrypt.hash(req.body.password, salt)
            }).then(hash => {
                console.log("hash " + hash)
                usersCollection.insertOne({
                    username: req.body.username,
                    password: hash,
                    days: 0
                })
            }).catch(err => console.error(err.message))
            usersCollection.find().sort({
                days: -1
            }).toArray().then((highscores) => {
                console.log(highscores)
                res.render("pages/landing-page/login.ejs", {
                    highscores: highscores
                })
            }).catch(error => console.error(error));
        })

        // Post request for login page.
        app.post("/login", (req, res) => {
            usersCollection.find({
                username: req.body.username
            }).toArray().then((user) => {
                console.log(user)
                console.log("Attempting login")
                if (user.length == 0) {
                    res.redirect("/");
                    console.log("User not found")
                } else {
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                        console.log(result);

                        if (result == true) {
                            usersCollection.find().sort({
                                days: -1
                            }).toArray().then((highscores) => {
                                console.log(highscores);
                                console.log("SUCCESS");

                                res.render("pages/landing-page/profile.ejs", {
                                    highscores: highscores,
                                    username: req.body.username,
                                    user: user
                                })
                            }).catch(error => console.error(error));
                        } else {
                            console.error(err);
                        }
                    })
                }
            }).catch((error) => console.error(error))
        })

        // Post request for main page.
        app.post("/main", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then(highscores => {
                console.log(highscores);
                console.log(req.body.username);
                res.render("pages/zero-contact/main.ejs", {
                    highscores: highscores,
                    username: req.body.username
                });
            }).catch(error => console.error(error));
        })

        // Put request to update longest days.
        app.put("/longest-days", (req, res) => {
            usersCollection.find({
                username: req.body.username
            }).toArray().then((user) => {
                if (user.length == 0) {
                    console.log("No user found")
                    usersCollection.insertOne({
                        username: req.body.username,
                        days: req.body.days
                    })
                } else {
                    if (user[0].days < req.body.days) {
                        usersCollection.findOneAndUpdate({
                            username: req.body.username
                        }, {
                            $set: {
                                days: req.body.days
                            }
                        })
                    }
                }
            }).catch((error) => console.error(error))
        })

        // get request for game over page.
        app.get("/game-over", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then(highscores => {
                let userhighest = highscores.find(element => element.username == req.query.username)
                res.render("pages/zero-contact/gameover.ejs", {
                    highscores: highscores,
                    username: req.query.username,
                    score: req.query.score,
                    highest: userhighest
                });
            }).catch(error => console.error(error));

        })

        //Post request for deleting accounts.
        app.post("/delete", (req, res) => {
            console.log(req.body)
            usersCollection.deleteOne({
                username: req.body.username
            }, ).then(
                res.redirect("/")

            )
            console.log("User Deleted.")
        })

        //Play again button to redirect to character creation
        app.post("/minigame", (req, res) => {
            console.log(req.body.username)
            res.render("pages/zero-contact/characterCreator.ejs", {
                username: req.body.username
            })
        })

        //Rendering character creation first from play
        app.post("/intro", (req, res) => {
            res.render("pages/zero-contact/characterCreator.ejs", {
                username: req.body.username
            })
        })

        //Display Character Creation
        //Send Character creation to main
        app.post("/game", (req, res) => {
            console.log(req.body);
            let usr = req.body.username;
            let genName = req.body.characterName;

            //search username is db, set all new datas
            usersCollection.updateMany({
                username: usr
            }, {
                $set: {
                    playerName: genName,
                    age: req.body.characterAge,
                    gender: req.body.characterGender,
                    pandemic: req.body.pandemicName
                }
            })

            res.render("pages/zero-contact/minigame.ejs", {
                username: usr
            })
        });
        //get request to database to return user as object.
        app.get("/user", (req, res) => {
            // Req only has username
            console.log(req.query.username);

            usersCollection.findOne({
                username: req.query.username
            }, function (err, document) {
                retObj = {};

                for (var prop in document) {
                    retObj[prop] = document[prop];
                }
                //Removing id and pass from object
                delete retObj["_id"];
                delete retObj["password"]

                res.send(retObj);
            })
        });

        app.listen(3000);
    })
    .catch(console.error);
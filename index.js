const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const {
    DB_URL
} = require("./credentials")

const bcrypt = require("bcrypt");
const saltRounds = 10;

let app = express();

MongoClient.connect(DB_URL, {
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


        app.get("/", (req, res) => res.render("pages/landing-page/home.ejs"));
        app.get("/about", (req, res) => res.render("pages/landing-page/about.ejs"));
        app.get("/game", (req, res) => res.render("pages/zero-contact/main.ejs"));
        app.get("/minigame", (req, res) => res.render("pages/zero-contact/minigame.ejs"));
        app.get("/signup", (req, res) => res.render("pages/landing-page/signup.ejs"));
        app.get("/login", (req, res) => res.render("pages/landing-page/login.ejs"));
        app.get("/delete", (req, res) => res.render("pages/landing-page/home.ejs"));

        app.get("/leaderboard", (req, res) => {
            usersCollection.find().sort({
                days: -1
            }).toArray().then((highscores) => {
                console.log(highscores)
                res.render("pages/landing-page/leaderboard.ejs", {
                    highscores: highscores
                })
            }).catch(error => console.error(error));
        })


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
            res.render("pages/landing-page/login.ejs")
        })

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
                            res.render("pages/landing-page/profile.ejs", {
                                username: req.body.username,
                                user: user
                            })
                        } else {
                            console.error(err);
                        }
                    })
                }
            }).catch((error) => console.error(error))
        })

        //Rendering character creation irst from play
        app.post("/game", (req, res) => {
            console.log(req.body.username)
            res.render("pages/zero-contact/characterCreator.ejs", {
                username: req.body.username
            })
        })

        //Add here
        app.get("/main", (req, res) => res.render("pages/zero-contact/characterCreator.ejs"));

        app.post("/main", (req, res) => {
            let usr = req.body.username;
            //search username is db, set all new datas
            usersCollection.updateMany({
                username: usr
            }, {
                $set: {
                    playerName: req.body.characterName,
                    age: req.body.characterAge,
                    gender: req.body.characterGender
                }
            })
            console.log(usersCollection.find({
                username: usr
            }))
            res.render("pages/zero-contact/main.ejs", {
                username: usr
            })
        });

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

        app.post("/delete", (req, res) => {
            console.log(req.body)
            usersCollection.deleteOne({
                username: req.body.username
            }, ).then(
                res.redirect("/")

            )
            console.log("User Deleted.")
        })


        app.get("/", (req, res) => res.render("pages/landing-page/home.ejs"));
        app.get("/about", (req, res) => res.render("pages/landing-page/about.ejs"));
        app.get("/minigame", (req, res) => res.render("pages/zero-contact/minigame.ejs"));
        app.get("/signup", (req, res) => res.render("pages/landing-page/signup.ejs"));
        app.get("/login", (req, res) => res.render("pages/landing-page/login.ejs"));

        app.post('/signup', (req, res) => {
            bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
                highScoreCollection.insertOne({
                        username: req.body.username,
                        password: hash
                    })
                    .then(result => {
                        console.log("Username " + req.body.username + " and password " + req.body.password + " were sent to server.");
                    })
                    .catch(error => console.error(error))
            })

        })

        app.post("/login", (req, res) => {
            bcrypt.compare(req.body.password, db.highScoreCollection.find({
                username: req.body.username
            })).then(function (err, result) {
                if (result == true) {
                    res.render("/zero-contact/main", );
                } else {
                    console.log("Passwords don't match.");
                }
            })
        })
        app.listen(3000);
    })
    .catch(console.error);
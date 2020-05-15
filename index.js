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
        const highScoreCollection = db.collection("high-scores");

        app.use(express.urlencoded({
            extended: true
        }));
        app.use(express.static("public"));
        app.use(express.json());
        app.set("view engine", "ejs");


        app.get("/", (req, res) => res.render("pages/landing-page/home.ejs"));
        app.get("/about", (req, res) => res.render("pages/landing-page/about.ejs"));
        app.get("/game", (req, res) => res.render("pages/zero-contact/characterCreator.ejs"));
        app.post("/game", (req, res) => {
            //Send data here
            res.render("pages/zero-contact/main.ejs")
        });
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
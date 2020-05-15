const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const {
    DB_URL
} = require("./credentials")

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
        //Redirect here
        app.get("/game", (req, res) => res.render("pages/zero-contact/characterCreator.ejs"));
        app.post("/game", (req, res) => {
            res.render("pages/zero-contact/main.ejs")
        })
        app.get("/minigame", (req, res) => res.render("pages/zero-contact/minigame.ejs"));
        app.listen(3000);
    })
    .catch(console.error);
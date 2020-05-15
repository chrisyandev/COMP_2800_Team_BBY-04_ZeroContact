const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { DB_URL } = require("./credentials")
const connectionString = DB_URL;
const bcrypt = require("bcrypt");
const saltRounds = 10;

let app = express();

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }).then(client => {
    console.log("Connected to database.");
    const db = client.db("zero-contact");
    const highScoreCollection = db.collection("high-scores");
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


    app.post('/signup', (req, res) => {
      bcrypt.genSalt(saltRounds).then(salt => {
          console.log("salt " + salt)
          return bcrypt.hash(req.body.password, salt)
      }).then(hash => {
          console.log("hash " + hash)
          usersCollection.insertOne({
              username: req.body.username,
              password: hash
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
          if (!user) {
              res.redirect("/");
              console.log("User not found")
          } else {
              bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                  console.log(result);
                  
                  if (result == true) {
                      res.render("pages/zero-contact/main.ejs", {username: req.body.username})
                  } else {
                    console.error(err);
                  }
              }) 
            }
      }).catch((error) => console.error(error))
    })
    app.listen(3000);
  })
  .catch(console.error);

    

# Zero Contact
> A story-driven game where you survival as long as possible in pandemic quarantine by making choices in the day of a young adult's life.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Content](#content)
* [Inspiration](#inspiration)
* [Setup](#setup)
* [Testing](#testing)

## General Info
Zero Contact is a game that will challenge players to survive in a world affected by a global pandemic. Each decision made in the game will have an impact on the player's physical health, mental health, wealth and supplies. The goal of the game is to provide entertainment and to educate on keeping safe in a pandemic. 

This game was a group project made in BCIT's COMP 2800 course in the span of 5 weeks.

## Technologies
Technologies that were used for this project:

- HTML
- CSS
- JavaScript
- MongoDB
- Bootstrap
- jQuery

## Features
List of features:
- Main gameplay with 50+ event cards
- An inventory system to use items
- A minigame to collect items
- Character profile creation

## Content

Our app is organized in 3 layers. The root folder contains much of the backend with routing and server-side programming in index.js. Inside views/pages/zero-contact are the ejs files used to serve content to the user. Inside the public folder are the assets of the game which includes js, css, images and sounds.

Organization and structure of files:

```
 Top level of project folder: 
├── public                   # Folder containing game assets
├── views/pages              # Folder containing ejs files
├── .gitignore               # Git ignore file
├── README.md                # Readme file
├── credentials.js           # API key to mongoDB
├── index.js                 # Handles routing and server requests
├── package-lock.json        # List of library dependencies
├── package.json             # List of library dependencies

Contains the following subfolders:
├── audio                    # Stores game audio
├── css                      # Stores the game's styling
├── favicons                 # Stores the game favicon images
├── images                   # Stores the game asset images
├── js                       # Stores the game's Javascript files
    
``` 
   
## Inspiration

This game was largely influenced by interactive story games such as Reigns and Sort the Court as well as survival games such as 60 Seconds.

## Setup

The languages we used for our app are HTML, CSS and JS. 

We recommend using a IDE with a built in terminal (Visual Studio Code or IntellliJ IDEA for example) to simplify the installation of the dependencies. You can also use the command line built into your operating system and navigate to the project folder.

MongoDB was used for this project and we recommend that a cluster is created before moving forward.

To start, open a terminal in the root directory. You will need to install the dependencies that are listed in the package.json file in the root directory. Use "npm install" to install the following dependencies:

- ejs
- bcryptjs
- express
- mongodb

Afterwards, you can change the DB_URL constant in the credentials.js file in the root directory to the connection string that points to the MongoDB database of your choice.

## Testing

Here is a link to our testing plan where you can see how our features are tested: 
https://docs.google.com/spreadsheets/d/1FHQnLDFm_F-65WaTcSt2oTP1zsCGz0HJynuOaNg1uOM/edit?usp=sharing

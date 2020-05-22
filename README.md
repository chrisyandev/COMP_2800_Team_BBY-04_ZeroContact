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
- 

## Content
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
   
In the root folder, we have the public folder, views folder, .gitignore file, README file, creadentials.js, index.js, package-lock.json, and package.json files. Inside the views folder, there is a pages folder that contains all of the pages of the website. The public folder contains audio, CSS files, favicons, images, and JS files for the game.

## Inspiration

This game was largely influenced by interactive story games such as Reigns and Sort the Court as well as survival games such as 60 Seconds.

## Setup
We recommend using a IDE with a built in terminal (Visual Studio Code or IntellliJ IDEA for example) to simplify the installation of the dependencies. You can also use the command line built into your operating system and navigate to the project folder.

MongoDB was used for this project and we recommend that a cluster is created before moving forward.

To start, open a terminal in the root directory. You will need to install the dependencies that are listed in the package.json file in the root directory. Use "npm install" to install the following dependencies:

- ejs
- bcryptjs
- express
- mongodb

Afterwards, you can change the DB_URL constant in the credentials.js file in the root directory to the connection string that points to the MongoDB database of your choice. You must also change the Collection and cluster name in the index.js file.

We used Twitter share widget to share tweets to Twitter. No API key is required.

## Testing

Here is a link to our testing plan where you can see how our features are tested: 
https://docs.google.com/spreadsheets/d/1FHQnLDFm_F-65WaTcSt2oTP1zsCGz0HJynuOaNg1uOM/edit?usp=sharing

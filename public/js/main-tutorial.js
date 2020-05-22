let tutorialData;

/* ---------------------------------------------------------------------- */
/* A function to start the tutorial of the main page */
/* -----------------------------------------------------------------------*/

function startMainTutorial() {
    $.getJSON('main-tut-data.json', function (data) {
        tutorialData = data;

        $("#tutorial-container").show();
        $("#tutorial-container").css("opacity", 1);

        let popup = new TutorialPopUp(tutorialData);
    });
}

$(document).ready(function () {
    startMainTutorial();
});

// Tutorial-popup.js has a startgame function intended for the minigame, used here to avoid an error in other pages.
function startGame() {}
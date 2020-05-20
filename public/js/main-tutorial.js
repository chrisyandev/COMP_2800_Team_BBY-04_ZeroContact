let tutorialData;

function startMainTutorial(){
    $.getJSON('main-tut-data.json', function (data) {
        tutorialData = data;

        $("#tutorial-container").show();
        $("#tutorial-container").css("opacity", 1);

        let popup = new TutorialPopUp(tutorialData);
    });
}

$(document).ready(function(){
    startMainTutorial();
});

/* Tutorial-popup.js has a startgame function, needed to be defined in this page to avoid an error.*/
function startGame(){

}
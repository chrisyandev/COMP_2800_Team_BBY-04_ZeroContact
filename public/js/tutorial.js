let tutorialData;

function startMinigameTutorial(){
    $.getJSON('minigame-tut-data.json', function (data) {
        tutorialData = data;

        $("#tutorial-container").show();
        $("#tutorial-container").css("opacity", 1);

        let popup = new TutorialPopUp(tutorialData);
    });
}
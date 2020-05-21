let tutorialData;

function startMinigameTutorial(){
    $.getJSON('minigame-tut-data.json', function (data) {
        tutorialData = data;

        $("#tutorial-container").show();
        $("#tutorial-container").css("opacity", 1);

        let popup = new TutorialPopUp(tutorialData);
    });
}

// Updates the tutorial message box
function resetPopUp(popup, message, top, left, order, width, height){
    if (message != undefined){
        popup.updateMessage(message);
    }

    if (top != undefined && left != undefined){
        popup.updatePosition(top, left);
    }

    if(order != undefined){
        popup.updateOrder(order);
    }

    if(width != undefined){
        popup.updateWidth(width);
    }

    if(height != undefined){
        popup.updateHeight(height);
    }

    fulfill();
}
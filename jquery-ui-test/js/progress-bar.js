// Creates the progress bars. When progress bar changes, checks if game is over.
$('#physical').progressbar({
    value: 50,
    change: function (event) {
        checkGameOver($(event.target).progressbar('value'));
    }
});
$('#mental').progressbar({
    value: 50,
    change: function (event) {
        checkGameOver($(event.target).progressbar('value'));
    }
});
$('#wealth').progressbar({
    value: 50,
    change: function (event) {
        checkGameOver($(event.target).progressbar('value'));
    }
});
$('#supplies').progressbar({
    value: 50,
    change: function (event) {
        checkGameOver($(event.target).progressbar('value'));
    }
});

// Logic when event received
$(document.body).on('update-resources', function (event, choice) {
    updateProgressBars(choice);
});

/** Updates the progress bars' fill. */
function updateProgressBars(choice) {
    let newPhysical = add($('#physical').progressbar('value'), choice.effect.physical);
    $('#physical').progressbar('value', newPhysical);
    changeFillColor($('#physical').find('.ui-progressbar-value'), choice.effect.physical);

    let newFood = add($('#mental').progressbar('value'), choice.effect.mental);
    $('#mental').progressbar('value', newFood);
    changeFillColor($('#mental').find('.ui-progressbar-value'), choice.effect.mental);

    let newRisk = add($('#wealth').progressbar('value'), choice.effect.wealth);
    $('#wealth').progressbar('value', newRisk);
    changeFillColor($('#wealth').find('.ui-progressbar-value'), choice.effect.wealth);

    let newMoney = add($('#supplies').progressbar('value'), choice.effect.supplies);
    $('#supplies').progressbar('value', newMoney);
    changeFillColor($('#supplies').find('.ui-progressbar-value'), choice.effect.supplies);
}

/** Helper method that makes sure result is between 0 and 100. */
function add(a, b) {
    let result = a + b;
    if (result < 0) {
        return 0;
    }
    if (result > 100) {
        return 100;
    }
    return result;
}

/** 
 * Changes progress bar color when it's transitioning.
 * Timeout should match transition: width (time).
 * Color is determine by whether change is positive or negative.
 */
function changeFillColor($fill, choiceStat) {
    if (choiceStat < 0) {
        $fill.css({
            'background-color': '#761F1A',
            'transition': 'width 0.5s'
        });
    } else if (choiceStat > 0) {
        $fill.css({
            'background-color': '#639A7F',
            'transition': 'width 0.5s'
        });
    }
    setTimeout(function() {
        $fill.css({
            'background-color': 'tan',
            'transition': 'background-color 0.2s ease'
        });
    }, 500);
}

/** If game is over, displays a message. */
function checkGameOver(statValue, message1, message2) {
    if (statValue <= 0) {
        console.log('game over');
    }
}
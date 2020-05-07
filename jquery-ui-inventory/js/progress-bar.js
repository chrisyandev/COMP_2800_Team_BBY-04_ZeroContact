// Creates the progress bars. When progress bar changes, checks if game is over.
$('#happiness').progressbar({
    value: 50,
    change: function (event) {
        let statValue = $(event.target).progressbar('value');
        checkGameOver(statValue, 'You were too unhappy', 'You were too happy');
    }
});
$('#food').progressbar({
    value: 50,
    change: function (event) {
        let statValue = $(event.target).progressbar('value');
        checkGameOver(statValue, 'You ran out of food', 'You had too much food');
    }
});
$('#risk').progressbar({
    value: 50,
    change: function (event) {
        let statValue = $(event.target).progressbar('value');
        checkGameOver(statValue, 'You took too few risks', 'You took too many risks');
    }
});
$('#money').progressbar({
    value: 50,
    change: function (event) {
        let statValue = $(event.target).progressbar('value');
        checkGameOver(statValue, 'You ran out of money', 'You had too much money');
    }
});

// Logic when event received
$(document.body).on('update-resources', function (event, choice) {
    updateProgressBars(choice);
});

/** Updates the progress bars' fill. */
function updateProgressBars(choice) {
    let newHappiness = add($('#happiness').progressbar('value'), choice.happiness);
    $('#happiness').progressbar('value', newHappiness);
    changeFillColor($('#happiness').find('.ui-progressbar-value'), choice.happiness);

    let newFood = add($('#food').progressbar('value'), choice.food);
    $('#food').progressbar('value', newFood);
    changeFillColor($('#food').find('.ui-progressbar-value'), choice.food);

    let newRisk = add($('#risk').progressbar('value'), choice.risk);
    $('#risk').progressbar('value', newRisk);
    changeFillColor($('#risk').find('.ui-progressbar-value'), choice.risk);

    let newMoney = add($('#money').progressbar('value'), choice.money);
    $('#money').progressbar('value', newMoney);
    changeFillColor($('#money').find('.ui-progressbar-value'), choice.money);
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
            'background-color': 'gray',
            'transition': 'background-color 0.2s ease'
        });
    }, 500);
}

/** If game is over, displays a message. */
function checkGameOver(statValue, message1, message2) {
    if (statValue <= 0) {
        $('#game-over-message').append('<p>' + message1 + '</p>');
    } else if (statValue >= 100) {
        $('#game-over-message').append('<p>' + message2 + '</p>');
    }
}
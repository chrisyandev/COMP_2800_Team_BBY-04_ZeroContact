// Creates the progress bars with initial value at 50%.
$('#physical').progressbar({
    value: 50
});
$('#mental').progressbar({
    value: 50
});
$('#wealth').progressbar({
    value: 50
});
$('#supplies').progressbar({
    value: 50
});

// Logic when event received
$(document.body).on('update-resources', function (e, data) {
    updateProgressBars(data.effect);
    console.log(data.event);
    if (data.event === 'card-swiped') {
        $(document.body).trigger('pick-next-card', checkGameState());
    }
});

/** Updates the progress bars' fill. */
function updateProgressBars(effect) {
    let newPhysical = add($('#physical').progressbar('value'), effect.physical);
    $('#physical').progressbar('value', newPhysical);
    changeFillColor($('#physical').find('.ui-progressbar-value'), effect.physical);

    let newMental = add($('#mental').progressbar('value'), effect.mental);
    $('#mental').progressbar('value', newMental);
    changeFillColor($('#mental').find('.ui-progressbar-value'), effect.mental);

    let newWealth = add($('#wealth').progressbar('value'), effect.wealth);
    $('#wealth').progressbar('value', newWealth);
    changeFillColor($('#wealth').find('.ui-progressbar-value'), effect.wealth);

    let newSupplies = add($('#supplies').progressbar('value'), effect.supplies);
    $('#supplies').progressbar('value', newSupplies);
    changeFillColor($('#supplies').find('.ui-progressbar-value'), effect.supplies);
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
            'background-color': '#af807c',
            'transition': 'width 0.5s'
        });
    } else if (choiceStat > 0) {
        $fill.css({
            'background-color': '#7caf80',
            'transition': 'width 0.5s'
        });
    }
    setTimeout(function () {
        $fill.css({
            'background-color': '#807caf',
            'transition': 'background-color 0.2s ease'
        });
    }, 500);
}

/** If stat is 0, game lost. If next day is last day, game won. */
function checkGameState() {
    if ($('#physical').progressbar('value') <= 0) {
        return 'lost';
    }
    if ($('#mental').progressbar('value') <= 0) {
        return 'lost';
    }
    if ($('#wealth').progressbar('value') <= 0) {
        return 'lost';
    }
    if ($('#supplies').progressbar('value') <= 0) {
        return 'lost';
    }
    if (day + 1 === lastDay) {
        return 'won';
    }
    return 'none';
}
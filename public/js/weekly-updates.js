let updatesData;
let weeklyUpdateDay = 1;
let updateIndex = 0;
let gameLost = false;
let gameWon = false;
let isLastWeek = false;
let lastDay = undefined;

$(document).ready(() => {
    $.getJSON('weekly-updates.json', data => {
        updatesData = data;
        console.log('Day: ', day);
        if (day === weeklyUpdateDay) {
            showUpdate(updateIndex);
            updateVariables();
        }
    });
});

/**
 * Update shows every 7 days. First update showed right after the game
 * started (day 1, see code above). On day 7, after player swipes, it'll become day 8.
 * At the start of day 8, the second update shows and so on.
 */
$(document.body).on('new-card', () => {
    console.log('Day: ', day);
    if (day === weeklyUpdateDay) {
        showUpdate(updateIndex);
        updateVariables();
    }

    // 'cardNum' will be 0 before losing card is swiped, so
    // 'gameLost' flag is used so that it'll only show
    // game lost message on the second pass.
    if (cardNum === 0 && gameLost) {
        showGameLost();
    } else if (cardNum === 0 && !gameLost) {
        gameLost = true;
    }

    // Does the same thing as above, but for game won
    let lastCardIndex = cardDataArray.length - 1;
    if (cardNum === lastCardIndex && gameWon) {
        showGameWon();
    } else if (cardNum === lastCardIndex && !gameWon) {
        gameWon = true;
    }
});

/**
 * Makes sure other modal is closed then opens the modal 
 * and loads the content.
 */
function showUpdate(index) {
    $('#achievements-window-wrapper').modal('hide');
    $('#weekly-update-wrapper').modal('show');

    let update = updatesData[index];
    let selected = update[randIndex(update.length)];
    $('#weekly-update .modal-title').text(selected.title);
    $('#weekly-update-text').text(selected.text);

    if (index === updatesData.length - 1) {
        isLastWeek = true;
    }
}

/** Generates a random number. */
function randIndex(max) {
    return Math.floor(Math.random() * max);
}

/** 
 * Updates variables which determines when the next update
 * will appear and what text it displays.
 */
function updateVariables() {
    if (!isLastWeek) {
        weeklyUpdateDay += 7;
        updateIndex++;
    } else {
        lastDay = weeklyUpdateDay + 7;
    }
}

/** 
 * Shows the game over modal. Prevents player from closing the modal.
 * Different messages are displayed depending on which stats are at 0.
 */
function showGameLost() {
    $('#achievements-window-wrapper').modal('hide');
    $("#game-over-wrapper").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    // Add here
    $('#game-over .modal-title').text('You failed to survive.');

    let gameOverHtml = '';
    if ($('#physical').progressbar('value') <= 0) {
        gameOverHtml += '<p>You became too weak to stand.</p>';
    }
    if ($('#mental').progressbar('value') <= 0) {
        gameOverHtml += '<p>You became mentally ill.</p>';
    }
    if ($('#wealth').progressbar('value') <= 0) {
        gameOverHtml += '<p>You ran out of money.</p>';
    }
    if ($('#supplies').progressbar('value') <= 0) {
        gameOverHtml += '<p>You ran out of supplies.</p>';
    }

    $('#game-over .modal-body').html('');
    $('#game-over .modal-body').append(gameOverHtml);

    $('#game-over-redirect').click(() => {
        console.log('Clicked Next');
        let redirectURL = "/game-over?username=" + document.getElementById("user").innerHTML + "&score=" + day;
        window.location.assign(redirectURL);
    });

}

/** Shows the game over modal with game won message. */
function showGameWon() {
    $('#achievements-window-wrapper').modal('hide');
    $("#game-over-wrapper").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });

    $('#game-over .modal-title').text('You survived!');
    $('#game-over .modal-body').html('');
    $('#game-over .modal-body').append('<p>A vaccine was discovered.</p>');

    $('#game-over-redirect').click(() => {
        console.log('Clicked Next');
        let redirectURL = "/game-over?username=" + document.getElementById("user").innerHTML + "&score=" + day;
        window.location.assign(redirectURL);
    });
}
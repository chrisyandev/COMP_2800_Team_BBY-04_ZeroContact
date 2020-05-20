let updatesData;
let updateDay = 1;
let updateIndex = 0;

$(document).ready(() => {
    $.getJSON('weekly-updates.json', data => {
        updatesData = data;
        console.log('Day: ', day);
        if (day === updateDay) {
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
    if (day === updateDay) {
        showUpdate(updateIndex);
        updateVariables();
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
}

/** Generates a random number. */
function randIndex(max) {
    return Math.floor(Math.random() * max);
}

/** 
 * Updates variables which determines when the next update
 * will appear and what text it displays. Currently just
 * looping from Week 1 to Week N.
 */
function updateVariables() {
    updateDay += 7;
    updateIndex++;
    if (updateIndex >= updatesData.length) {
        updateIndex = 0;
    }
}
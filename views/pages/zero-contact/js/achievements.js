let playerInfo;

$(document).ready(function () {
    $.getJSON('player-info.json', function (data) {
        playerInfo = data;
        for (let i = 0; i < playerInfo.achievements.length; i++) {
            createAchievement(playerInfo.achievements[i]);
        }
        $('#survived-until').text(`You survived until Day ${playerInfo.highscore}`);
    });
});

function createAchievement(achievement) {
    let $achievement = $(`
    <span class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${achievement.name}</h5>
            <small>Completed ${achievement.progress} of ${achievement.requirement}</small>
        </div>
        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
            risus varius blandit.</p>
        <small>Donec id elit non mi porta.</small>
    </span>
    `);
    $('#achievements-list').append($achievement);
}
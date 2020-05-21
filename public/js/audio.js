const audioBackground = document.querySelector('#audio-background');
const audioCardSwipeLeft = document.querySelector('#audio-card-swipe-left');
const audioCardSwipeRight = document.querySelector('#audio-card-swipe-right');

$(document).ready(() => {
    audioBackground.play();
})

$(document.body).on('update-resources', (e, data) => {
    if (data.event === 'card-swiped') {
        if (data.side === 'left') {
            audioCardSwipeLeft.play();
        } else if (data.side === 'right') {
            audioCardSwipeRight.play();
        }
    }
})
const audioBackground = document.querySelector('#audio-background');
const audioCardSwipe = document.querySelector('#audio-card-swipe');

audioCardSwipe.volume = 0.5;

$(document).ready(() => {
    audioBackground.play();
})

$(document.body).on('update-resources', (e, data) => {
    if (data.event === 'card-swiped') {
        audioCardSwipe.play();
    }
})
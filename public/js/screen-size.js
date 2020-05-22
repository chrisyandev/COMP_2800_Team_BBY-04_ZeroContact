// Wrapper contains all the content. We want to scale the wrapper and
// its content to fill the screen height. These values are simply the
// height and width of the wrapper initially when everything was in proportion
// but the content did not scale to viewport size.
let originalHeight = 530;
let originalWidth = 280;

const WIDTH_TO_HEIGHT = originalWidth / originalHeight;
let gameHeight;

// Set the width using WIDTH_TO_HEIGHT for these
const $statsSpacer = $('#stats-spacer');
const $dotsContainer = $('#dots-container');
const $eventText = $('#event-text');
const $cardContainer = $('#card-container');
const $name = $('#name');
const $bottom = $('#bottom');
const $inventoryContainer = $('#inventory-container');

// Set the height using WIDTH_TO_HEIGHT for these
const $statsContainer = $('#stats-container');
const $statsOverlay = $('#stats-overlay');
const $statsContainerInner = $('#stats-container > div');

// Height ratios
const statsSpacerRatio = 110 / originalHeight;
const dotsContainerRatio = 30 / originalHeight;
const eventTextRatio = 110 / originalHeight;
const cardContainerRatio = 200 / originalHeight;
const nameRatio = 50 / originalHeight;
const bottomRatio = 70 / originalHeight;
const statsContainerRatio = 65 / originalHeight;
const statsOverlayRatio = 65 / originalHeight;
const statsContainerInnerRatio = 53 / originalHeight;

const progressBarWidthRatio = 62 / originalHeight;
const progressBarHeightRatio = 41 / originalHeight;

$(document).ready(function () {
    initValues();
    resizeAll();
    resizeModals();
    $(window).resize(() => {
        initValues();
        resizeAll();
        resizeModals();
    });
});

// Initializes values that should be initialized after window loads.
function initValues() {
    if (WIDTH_TO_HEIGHT * $(window).height() > $(window).width()) {
        gameHeight = ($(window).width()) / WIDTH_TO_HEIGHT;
    } else {
        gameHeight = $(window).height();
    }
}

function resizeAll() {
    setHeight($statsSpacer, statsSpacerRatio * gameHeight - 5);
    setWidth($statsSpacer, WIDTH_TO_HEIGHT * gameHeight);

    setHeight($dotsContainer, dotsContainerRatio * gameHeight);
    setWidth($dotsContainer, WIDTH_TO_HEIGHT * gameHeight);

    setHeight($eventText, eventTextRatio * gameHeight - 5);
    setWidth($eventText, WIDTH_TO_HEIGHT * gameHeight);

    setHeight($cardContainer, cardContainerRatio * gameHeight);
    setWidth($cardContainer, WIDTH_TO_HEIGHT * gameHeight);

    setHeight($name, nameRatio * gameHeight - 5);
    setWidth($name, WIDTH_TO_HEIGHT * gameHeight);

    setHeight($bottom, bottomRatio * gameHeight - 5);
    setWidth($bottom, WIDTH_TO_HEIGHT * gameHeight);

    setWidth($inventoryContainer, WIDTH_TO_HEIGHT * gameHeight / 2);

    setHeight($statsContainer, WIDTH_TO_HEIGHT * gameHeight);
    setWidth($statsContainer, statsContainerRatio * gameHeight);

    setHeight($statsOverlay, WIDTH_TO_HEIGHT * gameHeight);
    setWidth($statsOverlay, statsOverlayRatio * gameHeight);

    setHeight($statsContainerInner, WIDTH_TO_HEIGHT * gameHeight);
    setWidth($statsContainerInner, statsContainerInnerRatio * gameHeight);

    const progressBars = $('.progress-bar');
    $.each(progressBars, function (index, bar) {
        setHeight($(bar), progressBarWidthRatio * gameHeight);
        setWidth($(bar), progressBarHeightRatio * gameHeight);
    });

    $('#card').position({
        my: 'center',
        at: 'center',
        of: $('#card-container')
    });
}

function setHeight($element, value) {
    $element.css('height', value + 'px');
}

function setWidth($element, value) {
    $element.css('width', value + 'px');
}

function resizeModals() {
    $('.modal-dialog').css('width', $('#stats-spacer').width() + 'px');
}
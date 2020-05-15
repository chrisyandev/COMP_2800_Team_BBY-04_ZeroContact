// Wrapper contains all the content. We want to scale the wrapper and
// its content to fill the screen height. This value is simply the
// height of the wrapper initially when everything was in proportion
// but the content did not scale to viewport size.
const WRAPPER_HEIGHT = 530;

// Set the width using WIDTH_RATIO for these
const $statsSpacer = $('#stats-spacer');
const $dotsContainer = $('#dots-container');
const $eventText = $('#event-text');
const $cardContainer = $('#card-container');
const $name = $('#name');
const $bottom = $('#bottom');
const $inventoryContainer = $('#inventory-container');

// Set the height using WIDTH_RATIO for these
const $statsContainer = $('#stats-container');
const $statsOverlay = $('#stats-overlay');
const $statsContainerInner = $('#stats-container > div');

const WIDTH_RATIO = 280 / WRAPPER_HEIGHT;

// Height ratios
const statsSpacerRatio = 110 / WRAPPER_HEIGHT;
const dotsContainerRatio = 45 / WRAPPER_HEIGHT;
const eventTextRatio = 110 / WRAPPER_HEIGHT;
const cardContainerRatio = 200 / WRAPPER_HEIGHT;
const nameRatio = 50 / WRAPPER_HEIGHT;
const bottomRatio = 70 / WRAPPER_HEIGHT;
const statsContainerRatio = 65 / WRAPPER_HEIGHT;
const statsOverlayRatio = 65 / WRAPPER_HEIGHT;
const statsContainerInnerRatio = 53 / WRAPPER_HEIGHT;

const progressBarWidthRatio = 62 / WRAPPER_HEIGHT;
const progressBarHeightRatio = 41 / WRAPPER_HEIGHT;

$(document).ready(function () {
    resizeAll();
    $(window).resize(resizeAll);
});

function resizeAll() {
    setHeight($statsSpacer, statsSpacerRatio * $(window).height() - 5);
    setWidth($statsSpacer, WIDTH_RATIO * $(window).height());

    setHeight($dotsContainer, dotsContainerRatio * $(window).height());
    setWidth($dotsContainer, WIDTH_RATIO * $(window).height());

    setHeight($eventText, eventTextRatio * $(window).height() - 5);
    setWidth($eventText, WIDTH_RATIO * $(window).height());

    setHeight($cardContainer, cardContainerRatio * $(window).height());
    setWidth($cardContainer, WIDTH_RATIO * $(window).height());

    setHeight($name, nameRatio * $(window).height() - 5);
    setWidth($name, WIDTH_RATIO * $(window).height());

    setHeight($bottom, bottomRatio * $(window).height());
    setWidth($bottom, WIDTH_RATIO * $(window).height());

    setWidth($inventoryContainer, WIDTH_RATIO * $(window).height() / 3);

    setHeight($statsContainer, WIDTH_RATIO * $(window).height());
    setWidth($statsContainer, statsContainerRatio * $(window).height());

    setHeight($statsOverlay, WIDTH_RATIO * $(window).height());
    setWidth($statsOverlay, statsOverlayRatio * $(window).height());

    setHeight($statsContainerInner, WIDTH_RATIO * $(window).height());
    setWidth($statsContainerInner, statsContainerInnerRatio * $(window).height());
    
    const progressBars = $('.progress-bar');
    $.each(progressBars, function (index, bar) {
        setHeight($(bar), progressBarWidthRatio * $(window).height());
        setWidth($(bar), progressBarHeightRatio * $(window).height());
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
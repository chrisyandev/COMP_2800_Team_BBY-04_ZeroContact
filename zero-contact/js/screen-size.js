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

const WIDTH_RATIO = 280 / 510;

// Height ratios
const statsSpacerRatio = 110 / 510;
const dotsContainerRatio = 45 / 510;
const eventTextRatio = 110 / 510;
const cardContainerRatio = 200 / 510;
const nameRatio = 50 / 510;
const bottomRatio = 50 / 510;
const statsContainerRatio = 65 / 510;
const statsOverlayRatio = 65 / 510;
const statsContainerInnerRatio = 53 / 510;

const progressBarWidthRatio = 62 / 510;
const progressBarHeightRatio = 41 / 510;

$(document).ready(function () {
    resizeAll();
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

    setWidth($inventoryContainer, WIDTH_RATIO * $(window).height());

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
}

function setHeight($element, value) {
    $element.css('height', value + 'px');
}

function setWidth($element, value) {
    $element.css('width', value + 'px');
}
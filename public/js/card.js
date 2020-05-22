let day = 1;
let currentCard;
let cardDataArray;
let cardNum = 1;

let userref = document.getElementById("user").innerHTML;
console.log(userref);

function Card(leftChoice, rightChoice, image) {
    this.leftChoice = leftChoice;
    this.rightChoice = rightChoice;
    this.$card = $('<div id="card"><div id="card-text"><span class="white-monospace"></span></div></div>');
    this.origin;

    this.$card.css({
        'background': `url(${image}) black no-repeat center center`,
        'background-size': 'cover'
    });

    /** Places card inside center of container. */
    $('#card-container').append(this.$card);
    this.$card.position({
        my: 'center',
        at: 'center',
        of: this.$card.parent()
    });
    // Stores the initial position
    this.origin = this.$card.position().left;

    // Needs the reference because the 'this' keyword inside 'draggable()' will not refer to Card
    const self = this;

    /** 
     * Makes the div draggable.
     * Text and dot size changes based on which size the card is on.
     * If card reaches bounds, force mouse up and fade out card.
     * Draggable's drag event is called every pixel dragged.
     * Draggable's stop event is called after card reverts to the center.
     */
    this.$card.draggable({
        containment: self.$card.parent(),
        scroll: false,
        revert: true,
        revertDuration: 150,
        drag: function () {
            let side = self.getSide();
            if (side === 'left') {
                self.updateChoice(leftChoice);
                updateDots(leftChoice);
            } else if (side === 'right') {
                self.updateChoice(rightChoice);
                updateDots(rightChoice);
            }

            if (self.hasReachedBounds()) {
                self.$card.fadeOut();
                self.$card.mouseup();
                self.choiceMade();
            }
        },
        stop: function () {
            $('#card-text').slideUp({
                duration: 200,
                end: function () {
                    $('#card-text > span').text('');
                }
            });
            $('.dot').hide();
        }
    });

    /** 
     * Determines if card has reached left or right bound.
     * Since cardPosition won't reach rightBound exactly,
     * we check how small the difference is.
     */
    this.hasReachedBounds = function () {
        let cardPosition = this.$card.position().left;
        let leftBound = 0;
        let rightBound = this.$card.parent().width() - this.$card.width();
        if (cardPosition <= leftBound || (rightBound - cardPosition) < 2) {
            return true;
        }
        return false;
    }

    /** Determines which side the card is on based on origin. */
    this.getSide = function () {
        let cardPosition = this.$card.position().left;
        if (cardPosition < this.origin - 5) {
            return 'left';
        } else if (cardPosition > this.origin + 5) {
            return 'right';
        } else {
            return 'neither';
        }
    }

    /** Changes text inside card based on side. */
    this.updateChoice = function (choice) {
        $('#card-text').slideDown({
            duration: 150,
            start: function () {
                $('#card-text').css('display', 'flex');
                $('#card-text > span').text(choice.text);
            }
        });
    }

    /** Triggers resources to update. Creates a new card after fadeOut() finishes. */
    this.choiceMade = function () {
        let side = this.getSide();
        if (side === 'left') {
            $(document.body).trigger('update-resources', {
                effect: this.leftChoice.effect,
                event: 'card-swiped',
                side: 'left'
            });
        } else if (side === 'right') {
            $(document.body).trigger('update-resources', {
                effect: this.rightChoice.effect,
                event: 'card-swiped',
                side: 'right'
            });
        }
        this.$card.promise().done(function () {
            createCard(cardDataArray[cardNum]);
            $(document.body).trigger('new-card');
        });
    }
}

/** Removes old card and message from html and creates new Card. */
function createCard(cardData) {
    $('#card-container').html('');
    $('#event-text > span').text(cardData.text);
    $('#name > span').text(cardData.name);
    currentCard = new Card(cardData.left, cardData.right, cardData.image);
}

/** 
 * Determines what the next card should be based on player choice 
 * for the current card.
 * If game lost, the next card changes to the "losing" card.
 * If game won, the next card changes to the "winning" card.
 * Else a random card is picked.
 */
$(document.body).on('pick-next-card', function (event, gameState) {
    if (gameState === 'lost') {
        cardNum = 0;
        storeHighScore(day);
    } else if (gameState === 'won') {
        cardNum = cardDataArray.length - 1;
        storeHighScore(day + 1);
        $('#day').text('Day ' + (day + 1));
    } else {
        cardNum = pickRandCard();
        updateDay();
    }

    // Highlights the items which are useful to the card
    /*
    if (cardNum === 1) {
        let tempUseCases = ["Food"];
        highlightItem(tempUseCases);
    } else {
        let tempUseCases = ["Nothing"];
        highlightItem(tempUseCases);
    }*/
    let tempUseCases = [cardDataArray[cardNum].event];
    console.log(tempUseCases);
    highlightItem(tempUseCases);
});

/** Picks a random card. Does not pick the first or last card in the array. */
function pickRandCard() {
    const min = 1;
    const max = cardDataArray.length - 1;
    return Math.floor(Math.random() * (max - min) + min);
}

/** Increments day and updates the HTML. */
function updateDay() {
    day++;
    $('#day').text('Day ' + day);
}

/** Sends the day the player survived until. */
function storeHighScore(days) {
    fetch("/longest-days", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("user").innerHTML,
            days: days
        })
    }).then(res => {
        if (res.ok) return res.json()
    })
}

/** Sets the size of each dot. */
function updateDots(choice) {
    let dotPhysical = calculateDot(choice.effect.physical) + 'px';
    $('#dot-physical').css({
        'width': dotPhysical,
        'height': dotPhysical
    })
    let dotMental = calculateDot(choice.effect.mental) + 'px';
    $('#dot-mental').css({
        'width': dotMental,
        'height': dotMental
    })
    let dotWealth = calculateDot(choice.effect.wealth) + 'px';
    $('#dot-wealth').css({
        'width': dotWealth,
        'height': dotWealth
    })
    let dotSupplies = calculateDot(choice.effect.supplies) + 'px';
    $('#dot-supplies').css({
        'width': dotSupplies,
        'height': dotSupplies
    })
    $('.dot').show();
}

/**
 * Helper method that calculates the dot size based on effect value.
 * Makes sure the dot isn't too small by increasing dot size if not 0.
 */
function calculateDot(effect) {
    const sizeIncrease = 3;
    let dotToScreenRatio = (24 / 685); // Makes dot scale to screen size
    const maxDotSize = dotToScreenRatio * $(window).height();
    let dotSize = Math.abs(effect) / 100 * maxDotSize;
    if (dotSize > 0) {
        dotSize += sizeIncrease;
    }
    if (dotSize > maxDotSize) {
        dotSize = maxDotSize;
    }
    return dotSize;
}

/** When the page loads, gets JSON data and creates the first card. */
$(document).ready(function () {
    $.getJSON('cards-data.json', function (data) {
        cardDataArray = data;
        createCard(cardDataArray[cardNum]);
    });
});
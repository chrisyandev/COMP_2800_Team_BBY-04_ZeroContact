let currentCard;
let cardDataArray;
let cardNum = 0;

function Card(leftChoice, rightChoice, image) {
    this.leftChoice = leftChoice;
    this.rightChoice = rightChoice;
    this.$card = $('<div class="card"></div>');
    this.origin;

    this.$card.css('background', `url(${image}) black no-repeat`);

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

    /** Makes the div draggable. */
    this.$card.draggable({
        containment: self.$card.parent(),
        scroll: false,
        revert: true,
        revertDuration: 150,
        drag: function () {
            self.updateChoice();
            if (self.hasReachedBounds()) {
                self.$card.fadeOut();
                self.$card.mouseup();
                self.choiceMade();
            }
        },
        stop: function () {
            self.$card.html('');
        }
    });

    /** Determines if card has reached left or right bound. */
    this.hasReachedBounds = function () {
        let cardPosition = this.$card.position().left;
        let leftBound = 0;
        let rightBound = this.$card.parent().width() - this.$card.width();
        if (cardPosition <= leftBound || cardPosition >= rightBound) {
            return true;
        }
        return false;
    }

    /** Determines which side the card is on based on origin. */
    this.getSide = function () {
        let cardPosition = this.$card.position().left;
        if (cardPosition < this.origin) {
            return 'left';
        } else if (cardPosition > this.origin) {
            return 'right';
        } else {
            return 'neither';
        }
    }

    /** Changes text inside card based on side. */
    this.updateChoice = function () {
        let side = this.getSide();
        if (side === 'left') {
            this.$card.html('<p class="large-font">' + this.leftChoice.text + '</p>');
        } else if (side === 'right') {
            this.$card.html('<p class="large-font">' + this.rightChoice.text + '</p>');
        } else {
            this.$card.html('');
        }
    }

    /** Triggers resources to update. Creates a new card after fadeOut() finishes. */
    this.choiceMade = function () {
        pickNextCard();
        let side = this.getSide();
        if (side === 'left') {
            $(document.body).trigger('update-resources', this.leftChoice);
        } else if (side === 'right') {
            $(document.body).trigger('update-resources', this.rightChoice);
        }
        this.$card.promise().done(function () {
            createCard(cardDataArray[cardNum]);
        });
    }
}

/** Removes old card and message from html and creates new Card. */
function createCard(cardData) {
    $('#card-container').html('');
    $('#event-text > span').text(cardData.event.text);
    currentCard = new Card(cardData.left, cardData.right, cardData.image);
}

/** 
 * Determines what the next card should be based on player choice 
 * for the current card. Currently we're just looping through all cards.
 */
function pickNextCard() {
    cardNum++;
    if (cardNum >= cardDataArray.length) {
        cardNum = 0;
    }
}

/** When the page loads, gets JSON data and creates the first card. */
$(document).ready(function () {
    $.getJSON('cards-data.json', function (data) {
        cardDataArray = data;
        createCard(cardDataArray[cardNum]);
    });
});

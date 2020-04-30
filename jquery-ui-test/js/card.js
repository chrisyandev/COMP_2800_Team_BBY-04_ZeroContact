let currentCard;
const CARD_1_LEFT = {
    text: 'Go shopping',
    happiness: 10,
    food: 30,
    risk: 30,
    money: -10
}
const CARD_1_RIGHT = {
    text: 'Don\'t go shopping',
    happiness: -10,
    food: -10,
    risk: -10,
    money: 10
}
const CARD_2_LEFT = {
    text: 'Visit Bob',
    happiness: 50,
    food: 0,
    risk: 40,
    money: 0
}
const CARD_2_RIGHT = {
    text: 'Don\'t visit Bob',
    happiness: -70,
    food: 0,
    risk: -10,
    money: 0
}

function Card(leftChoice, rightChoice, color) {
    this.leftChoice = leftChoice;
    this.rightChoice = rightChoice;
    this.color = color;
    this.$card = $('<div class="card"></div>');
    this.side = 'neither';
    this.origin;

    this.$card.css('background-color', this.color);

    /** Places card inside center of container. */
    $('#card-container').append(this.$card);
    this.$card.position({
        my: 'center',
        at: 'center',
        of: this.$card.parent()
    });
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
            self.updateSide();
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
    this.updateSide = function () {
        let cardPosition = this.$card.position().left;
        if (cardPosition < this.origin) {
            this.side = 'left';
        } else if (cardPosition > this.origin) {
            this.side = 'right';
        } else {
            this.side = 'neither';
        }
    }

    /** Changes text inside card based on side. */
    this.updateChoice = function () {
        if (this.side === 'left') {
            this.$card.html('<p class="large-font">' + this.leftChoice.text + '</p>');
        } else if (this.side === 'right') {
            this.$card.html('<p class="large-font">' + this.rightChoice.text + '</p>');
        } else {
            this.$card.html('');
        }
    }

    /** Triggers resources to update. Creates a new card after fadeOut() finishes. */
    this.choiceMade = function () {
        if (this.side === 'left') {
            $('#chosen').text(this.leftChoice.text);
            $(document.body).trigger('update-resources', this.leftChoice);
        } else if (this.side === 'right') {
            $('#chosen').text(this.rightChoice.text);
            $(document.body).trigger('update-resources', this.rightChoice);
        }
        this.$card.promise().done(function () {
            createCard(CARD_2_LEFT, CARD_2_RIGHT, 'lightblue');
        });
    }
}

function createCard(leftChoice, rightChoice, color) {
    $('#card-container').html('');
    currentCard = new Card(leftChoice, rightChoice, color);
}

$(document).ready(function () {
    createCard(CARD_1_LEFT, CARD_1_RIGHT, 'lightgreen');
});
/* ----------------------------------------------------------------------------*/
/* A function class to create shopper objects that walk around in the minigame */
/* ----------------------------------------------------------------------------*/

function Shopper(xStart, yStart, direction, moveRate, step) {
    // Indicates how fast the shopper should move
    this.moveRate = moveRate;

    // Which direction the shopper should move in
    this.direction = direction;

    this.$shopperContainer = $("<div class='shopper-container'></div>");

    // The reset point of the shopper if it is moving right
    if (step > 0 && direction === "row") {
        this.xStart = yStart;
        this.yStart = 1;
        this.limit = xLimit;

        // The sprite image of the shopper
        this.$shopperContainer.css({
            "background-image": "url('images/Character_Right.png')",
            "width": "120px",
            "height": "120px",
        });
    } else {
        // The reset point of the shopper if it is moving left
        if (step < 0 && direction === "row") {
            this.xStart = yLimit;
            this.yStart = xLimit;
            this.limit = 1;

            // The sprite image of the shopper
            this.$shopperContainer.css({
                "background-image": "url('images/Character_Left.png')",
                "width": "120px",
                "height": "120px",
            });
        }
    }

    if (step > 0 && direction === "column") {
        // The reset point of the shopper if it is moving down
        this.xStart = 1;
        this.yStart = xStart;
        this.limit = yLimit;

        // The sprite image of the shopper
        this.$shopperContainer.css({
            "background-image": "url('images/Character_Down.png')",
            "width": "120px",
            "height": "120px",
        });
    } else {

        if (step < 0 && direction === "column") {
            // The reset point of the shopper if it is moving up
            this.xStart = yLimit;
            this.yStart = xLimit;
            this.limit = 1;

            // The sprite image of the shopper
            this.$shopperContainer.css({
                "background-image": "url('images/Character_Up.png')",
                "width": "120px",
                "height": "120px",
            });
        }
    }

    this.xValue = xStart;
    this.yValue = yStart;
    this.step = step;
    this.laneOffset = 1;

    // Setters and Getter Functions
    this.getX = function () {
        return (this.xValue);
    }

    this.getY = function () {
        return (this.yValue);
    }

    this.setX = function (value) {
        this.xValue = value;
    }

    this.setY = function (value) {
        this.yValue = value;
    }

    this.setLaneOffset = function (value) {
        this.laneOffset = value;
    }

    // Functions to update the properties of the shoppers
    this.updatePosition = function () {
        this.$shopperContainer.css({
            "grid-area": this.xValue + " / " + this.yValue + " / span 1 / span 1",
        });
    }

    // Indicates the lane the shopper should take items from
    this.updateAffectLane = function () {
        if (direction == "column") {
            this.affectLane = "" + this.xValue + (this.yValue + this.laneOffset);
        } else {
            this.affectLane = (this.xValue + this.laneOffset) + "" + this.yValue;
        }
    }

    this.animateReset = function () {
        this.$shopperContainer.css({
            top: "0px",
            left: "0px",
            transition: "0s"
        });
    }

    this.animateMove = function () {
        if (direction == "column") {
            this.$shopperContainer.css({
                top: (this.step * 120) + "px",
                transition: (this.moveRate / 2) + "ms ease-in-out"
            });
        } else {
            this.$shopperContainer.css({
                left: (this.step * 120) + "px",
                transition: (this.moveRate / 2) + "ms ease-in-out"
            });
        }
    }

    this.updatePosition();
    this.updateAffectLane();

    $("#inventory-grid-container").append(this.$shopperContainer);
}

// Moves the shopper in a certain direction in the grid
function moveShopper(shopper) {
    // Moves the shopper entities
    shopper.moveTimer = setInterval(function () {
        shopper.animateMove();
    }, shopper.moveRate / 2);

    shopper.updateTimer = setInterval(function () {
        shopper.animateReset();
        let value;

        if (shopper.direction === "row") {
            value = shopper.getY();
            value += shopper.step;

            if (value > shopper.limit && shopper.step > 0) {
                shopper.setY(shopper.yStart);
            } else {
                if (value < shopper.limit && shopper.step < 0) {
                    shopper.setY(shopper.yStart);
                } else {
                    shopper.setY(value);
                }
            }

        } else {
            value = shopper.getX();
            value += shopper.step;

            if (value > shopper.limit && shopper.step > 0) {
                shopper.setX(shopper.xStart);
            } else {
                if (value < shopper.limit && shopper.step < 0) {
                    shopper.setX(shopper.xStart);
                } else {
                    shopper.setX(value);
                }
            }
        }

        let randLaneOffset = Math.round(Math.random() * 1 + 1);
        if (randLaneOffset === 1) {
            shopper.setLaneOffset(1);
        } else {
            shopper.setLaneOffset(-1);
        }

        shopper.updatePosition();
        shopper.updateAffectLane();

        shelfItemArray.forEach(function (item) {
            if (shopper.affectLane === item.position) {
                removeShelfItem(item, item.itemData, false, item.quantity, shopper.$shopperContainer);
            }
        });

    }, shopper.moveRate);
}
function Shopper(xStart, yStart, direction, moveRate, step) {
    // The point at which the shopper should loop back to the start
    if (step > 0 && direction === "row") {
        this.xStart = yStart;
        this.yStart = 1;
        this.limit = xLimit;
    } else {
        if (step < 0 && direction === "row") {
            this.xStart = yLimit;
            this.yStart = xLimit;
            this.limit = 1;
        }
    }
    if (step > 0 && direction === "column") {
        this.xStart = 1;
        this.yStart = xStart;
        this.limit = yLimit;
    } else {
        if (step < 0 && direction === "column") {
            this.xStart = yLimit;
            this.yStart = xLimit;
            this.limit = 1;
        }
    }

    this.xValue = xStart;
    this.yValue = yStart;
    this.step = step;
    this.laneOffset = 1;

    // Indicates how fast the shopper should move
    this.moveRate = moveRate;

    // Which direction the shopper should move in
    this.direction = direction;

    this.$shopperContainer = $("<div class='shopper-container'></div>");

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
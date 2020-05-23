const TIME_LIMIT = 12;

// Gets the canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

$(document).ready(function () {
    radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90

    // Create the clock initially
    createTimer(ctx, radius, 0);
});

// Starts the countdown of the clock
function startClock() {
    let start = new Date;

    let clockTimer = setInterval(function () {
        let timeElapsed = (Math.round((new Date - start) / 1000));
        if (timeElapsed == TIME_LIMIT) {
            $("#canvas").css({
                "background-color": "transparent",
                "border-radius": "100px",
                "box-shadow": "0 0 0px rgb(156, 16, 16)",
                "animation-name": "null",
                "animation-duration": "0.0s",
                "animation-iteration-count": "infinite",
            });

            clearInterval(clockTimer);
            createTimer(ctx, radius, timeElapsed);
            endGame();
        } else {
            if (timeElapsed >= TIME_LIMIT - 3 && timeElapsed < TIME_LIMIT) {
                $("#canvas").css({
                    "background-color": "coral",
                    "border-radius": "100px",
                    "box-shadow": "0 0 30px rgb(156, 16, 16)",
                    "animation-name": "clockBounceAnimation",
                    "animation-duration": "0.5s",
                    "animation-iteration-count": "infinite",
                });

                $(".game-grid").css({
                    "box-shadow": "0 0 30px rgb(125, 25, 25)",
                    "outline": "15px double rgb(125, 25, 25)",
                });

                // Play the clock ticking audio
                document.querySelector("#audio-low-time-tick").play();
            }

            if (timeElapsed == 1) {
                $("#dbl-click-handler").on("click touchend", function () {
                    $(".inventory-item img").each(function () {
                        this.src = "images/Paper.png";
                    });
                });
            }
            if (timeElapsed > 1) {
                $("#dbl-click-handler").off("click touchend");
            }

            createTimer(ctx, radius, timeElapsed);

            // Play the clock ticking audio
            document.querySelector("#audio-clock-tick").play();
        }

    }, 1000);
}

// Creates all the components of the clock 
// Adapted from w3school's canvas clock
// Attribution: https://www.w3schools.com/graphics/canvas_clock.asp
function createTimer(ctx, radius, second) {
    drawClock(ctx, radius, second);
    drawPoints(ctx, radius);
    pos = (second * Math.PI / 6);
    drawHand(ctx, pos, radius * 0.85, radius * 0.05);
    drawNumber(ctx, radius, TIME_LIMIT - second);
}

// Draws the base of the clock
// Adapted from w3school's canvas clock
// Attribution: https://www.w3schools.com/graphics/canvas_clock.asp
function drawClock(ctx, radius, second) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);

    // Fill the canvas with white
    ctx.fillStyle = 'white';
    ctx.fill();

    // Set color of the clock outline
    ctx.strokeStyle = "#333";
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // Create the inner circle of the clock
    ctx.fillStyle = "#333";

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.225, 0, 2 * Math.PI);
    ctx.lineWidth = radius * 0.05;
    ctx.stroke();
    ctx.fill();
}

// Draws the number in the middle of the clock
// Adapted from w3school's canvas clock
// Attribution: https://www.w3schools.com/graphics/canvas_clock.asp
function drawNumber(ctx, radius, second) {
    ctx.fillStyle = "#ffffff";
    ctx.font = radius * 0.3 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillText(second, 0, 2);
}

// Draws the little squares in the clock
// Adapted from w3school's canvas clock
// Attribution: https://www.w3schools.com/graphics/canvas_clock.asp
function drawPoints(ctx, radius) {
    let ang;
    let num;

    ctx.fillStyle = "#333";

    // Creates 4 squares around the clock
    for (num = 1; num <= 4; num++) {
        ang = num * Math.PI / 2;
        ctx.rotate(-ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(ang);
        ctx.fillRect(-2.5, -2.5, 5, 5);
        ctx.rotate(-ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(ang);
    }
}

// Draws the hand
// Adapted from w3school's canvas clock
// Attribution: https://www.w3schools.com/graphics/canvas_clock.asp
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
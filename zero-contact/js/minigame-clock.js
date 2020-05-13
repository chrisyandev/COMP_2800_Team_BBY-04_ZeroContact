const TIME_LIMIT = 25;

$(document).ready(function () {
    // Gets the canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90

    // Create the clock initially
    let start = new Date;
    let timeElapsed = (Math.round((new Date - start) / 1000));
    createTimer(ctx, radius, timeElapsed);

    let clockTimer = setInterval(function(){
        let timeElapsed = (Math.round((new Date - start) / 1000));
        if (timeElapsed == TIME_LIMIT){
            clearInterval(clockTimer);
            drawNumber(ctx, radius, 0);
            endGame();
        } else{
            createTimer(ctx, radius, timeElapsed);
        }

    }, 1000);
});

// Creates all the components of the clock
function createTimer(ctx, radius, second) {
    drawClock(ctx, radius, second);
    drawPoints(ctx, radius);
    // second
    pos = (second*Math.PI/12);
    drawHand(ctx, pos, radius*0.85, radius*0.05);
    drawNumber(ctx, radius, TIME_LIMIT - second);
}

// Draws the base of the clock
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
function drawNumber(ctx, radius, second){
    ctx.fillStyle = "#ffffff";
    ctx.font = radius * 0.3 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    ctx.fillText(second, 0, 2);
}

// Draws the little squares in the clock
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
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
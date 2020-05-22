let itemArray = [];
let shelfItemArray = [];
let shopperArray = [];
let itemAnimationArray = [];
let maxTime = 25000;
let minTime = 5000;
let xLimit = 25;
let yLimit = 19;
let validXSpawn = [1, 5, 9, 13, 17, 21, 25];
let validYSpawn = [1, 4, 7, 10, 13, 16, 19];

/* ---------------------------------------------------------------------- */
/* A function to expand the inventory on the main page when it is clicked */
/* -----------------------------------------------------------------------*/

$(document).ready(function () {
    $("#end-results-screen").hide();
    $("#end-results-screen").css("opacity", 0);

    $("#tutorial-container").hide();
    $("#tutorial-container").css("opacity", 0);

    $.getJSON('items-data.json', function (data) {
        itemDataArray = data;

        startMinigameTutorial();
    });
});

function startGame() {
    // Number of rows and columns of shelves
    let rowDimensions = 2;
    let columnDimensions = 3;

    // How much to space each row and column
    let xIncrement = rowDimensions + 1;
    let yIncrement = columnDimensions + 1;

    // Maximum number of rows and columns of shelves
    let maxRows = (6 * xIncrement);
    let maxColumns = (6 * yIncrement);

    for (let x = 2; x < maxRows; x += xIncrement) {
        // Creates columns of shelves
        for (let y = 2; y < maxColumns; y += yIncrement) {
            let shelf = new StoreShelf(rowDimensions, columnDimensions, x, y, itemDataArray.length);
        }
    }

    // A notification to give to the user that they can swipe to move the screen
    let $handIcon = $("#hand-swipe");
    let timer = setTimeout(function () {
        $handIcon.css({
            opacity: 1,
        });
    }, 3000);

    // Adds drag scrolling to the container and allows items to be clicked
    // Attribution: http://davetayls.github.io/jquery.kinetic/
    $("#inventory-grid-container").kinetic({
        stopped: function () {
            timer = setTimeout(function () {
                $handIcon.css({
                    opacity: 1,
                });
            }, 3000);
        },
        moved: function () {
            $handIcon.css({
                opacity: 0,
            });
            clearTimeout(timer);
        },
        maxvelocity: 10000,
    });

    let randX = Math.round(Math.random() * 2000 + 500);
    let randY = Math.round(Math.random() * 2000 + 500);
    $("#inventory-grid-container").kinetic("start", {
        velocity: randX,
        velocityY: randY
    });
    $("#inventory-grid-container").kinetic('stop');

    // Create 2 shopper entites at the edge of the store
    let shopper3 = new Shopper(yLimit, 1, "row", 1000, 1);
    moveShopper(shopper3);
    shopperArray.push(shopper3);

    let shopper4 = new Shopper(1, xLimit, "column", 1000, -1);
    moveShopper(shopper4);
    shopperArray.push(shopper4);

    // Create a number of shopper entities in the store
    for (let i = 0; i < 60; i++) {
        // Randomize the arguements of the shopper entities
        let startY = Math.round(Math.random() * (validYSpawn.length - 1));
        let startX = Math.round(Math.random() * (validXSpawn.length - 1));

        startY = validYSpawn[startY];
        startX = validXSpawn[startX];

        let randDirectionNum = Math.round((Math.random() * 1) + 1);
        let randStepNum = Math.round((Math.random() * 1) + 1);
        let randTime = Math.round(Math.random() * 1500 + 250);

        let shopperDirection = ""
        if (randDirectionNum == 1) {
            shopperDirection = "row";

        } else {
            shopperDirection = "column";
        }

        let shopperStep = 0;
        if (randStepNum == 1) {
            shopperStep = 1;
        } else {
            shopperStep = -1;
        }

        let shopper = new Shopper(startY, startX, shopperDirection, randTime, shopperStep);
        moveShopper(shopper);
        shopperArray.push(shopper);
    }

    // Starts the clock
    startClock();
}

// Tracks the items collected from the store shelves
function trackItem(itemData, quantity) {
    let itemExists = false;
    for (let i = 0; i < itemArray.length; i++) {
        if (itemData.itemName == itemArray[i].itemData.itemName) {
            itemArray[i].quantity = itemArray[i].quantity + quantity;
            itemExists = true;
            break;
        }
    }
    // Creates a new item if it isn't being tracked in the array
    if (itemExists == false) {
        let item = {
            itemData: itemData,
            quantity: quantity
        };
        itemArray.push(item);
    }
}

// Shows a results screen of all the items collected and buttons to continue
function endGame() {
    // Shows the end game prompt and creates the collected item within it
    $("#end-results-screen").show();
    $("#end-results-screen").css("opacity", 1);

    $("#inventory-grid-container").kinetic('stop');

    $("#hand-swipe").css({
        "opacity": 0,
        "display": "none"
    });

    // Conditon for when the user collected no items
    if (itemArray.length != 0) {
        for (let i = 0; i < itemArray.length; i++) {
            createListItem(itemArray[i]);
        }
    } else {
        $("#items-list-container").append("<div class='results-item'><h3>Nothing :(</h3></div>");
    }

    // Stores the collected items array in the session local storage
    sessionStorage.clear();
    sessionStorage.setItem("collectedItems", JSON.stringify(itemArray));

    for (let i = 0; i < shopperArray.length; i++) {
        clearInterval(shopperArray[i].moveTimer);
        clearInterval(shopperArray[i].updateTimer);
        shopperArray[i].$shopperContainer.remove();
    }

    for (let i = 0; i < shelfItemArray.length; i++) {
        removeShelfItem(shelfItemArray[i], shelfItemArray[i].itemData, false, shelfItemArray[i].quantity);
    }

    for (let i = 0; i < itemAnimationArray.length; i++) {
        clearTimeout(itemAnimationArray[i].timer);
        itemAnimationArray[i].itemEntity.remove();
    }

}

// Creates an item in the results items list
function createListItem(item) {
    let $resultsItem = $("<li class='results-item list-group-item'></li>");
    /* let $resultsItem = $("<div class='results-item'></div>");*/
    let $resultsItemIcon = $("<img src=" + item.itemData.itemSprite + ">");
    let $resultsItemName = $("<h2>" + item.itemData.itemName + "</h2>");
    let $resultsItemNum = $("<h3>" + item.quantity + "</h3>");

    $resultsItem.append($resultsItemIcon);
    $resultsItem.append($resultsItemName);
    $resultsItem.append($resultsItemNum);
    $("#items-list-container").append($resultsItem);
}
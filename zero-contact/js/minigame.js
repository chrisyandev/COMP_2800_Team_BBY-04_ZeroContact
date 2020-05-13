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

$(document).ready(function(){
    $("#end-results-screen").hide();
    $("#end-results-screen").css("opacity", 0);

    $.getJSON('items-data.json', function (data) {
        itemDataArray = data;

        // Creates the last 2 items in the json file

        // Number of rows and columns of shelves
        let rowDimensions = 2;
        let columnDimensions = 3;

        // How much to space each row and column
        let xIncrement = rowDimensions + 1;
        let yIncrement = columnDimensions + 1;

        // Maximum number of rows and columns of shelves
        let maxRows = (6 * xIncrement);
        let maxColumns = (6 * yIncrement);

        for (let x = 2; x < maxRows; x += xIncrement ){
            // Creates columns of shelves
            for (let y = 2; y < maxColumns; y += yIncrement){
                let shelf = new StoreShelf(rowDimensions, columnDimensions, x, y, itemDataArray.length);
            }
        }

        // Adds drag scrolling to the container and allows items to be clicked
        $("#inventory-grid-container").kinetic();

        // Create 2 shopper entites at the edge of the store
        let shopper3 = new Shopper(yLimit, 1, "row", 1000, 1);
        moveShopper(shopper3);
        shopperArray.push(shopper3);

        let shopper4 = new Shopper(1, xLimit, "column", 1000, -1);
        moveShopper(shopper4);
        shopperArray.push(shopper4);
        console.log(shopper4.$shopperContainer.position());
        
        // Create a number of shopper entities in the store
        for (let i = 0; i < 30; i++){
            // Randomize the arguements of the shopper entities
            let startY = Math.round(Math.random()*(validYSpawn.length-1));
            let startX = Math.round(Math.random()*(validXSpawn.length-1));

            startY = validYSpawn[startY];
            startX = validXSpawn[startX];

            let randDirectionNum = Math.round((Math.random()*1)+1);
            let randStepNum = Math.round((Math.random()*1)+1);
            let randTime = Math.round(Math.random()*1500+500);

            let shopperDirection = ""
            if (randDirectionNum == 1){
                shopperDirection = "row";

            } else{
                shopperDirection = "column";
            }

            let shopperStep = 0;
            if (randStepNum == 1){
                shopperStep = 1;
            } else{
                shopperStep = -1;
            }

            let shopper = new Shopper(startY, startX, shopperDirection, randTime, shopperStep);
            moveShopper(shopper);
            shopperArray.push(shopper);
        }
    });
});

function moveShopper(shopper){
    // Moves the shopper entities
    shopper.moveTimer = setInterval(function(){
        shopper.animateMove();
    }, shopper.moveRate / 2);

    shopper.updateTimer = setInterval(function(){
        shopper.animateReset();
        let value;

        if (shopper.direction === "row"){
            value = shopper.getY();
            value += shopper.step;

            if(value > shopper.limit && shopper.step > 0){
                shopper.setY(shopper.yStart);
            } else{
                if(value < shopper.limit && shopper.step < 0){
                    shopper.setY(shopper.yStart);
                } else{
                    shopper.setY(value);
                }
            }

        } else{
            value = shopper.getX();
            value += shopper.step;

            if(value > shopper.limit && shopper.step > 0){
                shopper.setX(shopper.xStart);
            } else{
                if(value < shopper.limit && shopper.step < 0){
                    shopper.setX(shopper.xStart);
                } else{
                    shopper.setX(value);
                }
            }
        }

        let randLaneOffset = Math.round(Math.random()*1+1);
        if (randLaneOffset === 1){
            shopper.setLaneOffset(1);
        } else{
            shopper.setLaneOffset(-1);
        }

        shopper.updatePosition();
        shopper.updateAffectLane();

        shelfItemArray.forEach(function(item){
            if (shopper.affectLane === item.position){
                removeShelfItem(item, item.itemData, false, item.quantity, shopper.$shopperContainer);
            }
        });

    }, shopper.moveRate);
}

function Shopper(xStart, yStart, direction, moveRate, step){
    // The point at which the shopper should loop back to the start
    if (step > 0 && direction === "row"){
        this.xStart = yStart;
        this.yStart = 1;
        this.limit = xLimit;
    } else{
        if (step < 0 && direction === "row"){
            this.xStart = yLimit;
            this.yStart = xLimit;
            this.limit = 1;
        }
    }
    if (step > 0 && direction === "column"){
        this.xStart = 1;
        this.yStart = xStart;
        this.limit = yLimit;
    } else{
        if (step < 0 && direction === "column"){
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

    // Functions
    this.getX = function(){
        return(this.xValue);
    }

    this.getY = function() {
        return(this.yValue);
    }

    this.setX = function(value){
        this.xValue = value;
    }

    this.setY = function(value){
        this.yValue = value;
    }

    this.setLaneOffset = function(value){
        this.laneOffset = value;
    }

    this.updatePosition = function(){
        this.$shopperContainer.css({
            "grid-area": this.xValue + " / " + this.yValue + " / span 1 / span 1",
        });
    }

    // Indicates the lane the shopper should take items from
    this.updateAffectLane = function(){
        if (direction == "column"){
            this.affectLane = "" + this.xValue + (this.yValue + this.laneOffset);
        } else{
            this.affectLane = (this.xValue + this.laneOffset) + "" + this.yValue;
        }
    }

    this.animateReset = function(){
        this.$shopperContainer.css({
            top: "0px",
            left: "0px",
            transition: "0s"
        });
    }

    this.animateMove = function(){
        if (direction == "column"){
            this.$shopperContainer.css({
                top: (this.step * 120) + "px",
                transition: (this.moveRate / 2) + "ms ease-in-out"
            });
        } else{
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

// A class for storeshelf items for collecting items
function StoreShelf(rows, columns, xCoord, yCoord, maxItems){
    // Shelf attributes
    this.rows = rows;
    this.columns = columns;
    this.itemWidth = 100;
    this.itemHeight = 100;
    this.gridGap = 20;
    this.gridRow = xCoord + " / span " + (rows);
    this.gridColumn = yCoord + " / span " + (columns);

    this.$shelfContainer = $("<div class='store-shelf-container'></div>");

    this.$shelfContainer.css({
        "grid-template-rows": "repeat("+this.rows+"," + this.itemWidth + "px)",
        "grid-template-columns": "repeat("+this.columns+"," + this.itemHeight + "px)",
        "grid-gap": 20 + "px",
        "grid-row": this.gridRow,
        "grid-column": this.gridColumn,
        "width": this.columns*this.itemWidth+((this.columns-1)*this.gridGap) + "px",
        "height": this.rows*this.itemHeight+((this.rows-1)*this.gridGap) + "px",
    });

    // Creates an item for every row and column in the shelf
    for (let x = 0; x < rows; x++){
        for(let y = 0; y < columns; y++){
            // Which items to create in the shelves
            let num = Math.round((Math.random()* (maxItems-1)));

            // The amount of items in one shelf slot
            let itemNum = Math.round((Math.random()*2)+1);
            createShelfItem(itemDataArray[num], this.$shelfContainer, itemArray, false, itemNum,
                            x + xCoord, y + yCoord);
        }
    }
    $("#inventory-grid-container").append(this.$shelfContainer);
    $("#inventory-grid-container").disableSelection();
};

// A function to create shelf items
function createShelfItem(itemData, container, array, tooltipOn, quantity, gridRow, gridColumn){
    let item = new InventoryItem(itemData.itemSprite, itemData.itemName, 
                                itemData.useableOn, itemData.infectionRisk,
                                itemData.effect, itemData.itemText, container,
                                array, tooltipOn, quantity);

    item.position = "" + gridRow + gridColumn;

    item.itemData = itemData;
    shelfItemArray.push(item);

    // Clears the timer to remove the item and collects it
    item.$itemContainer.on("click touchend",function(){
        removeShelfItem(item, itemData, true, quantity);
    });
};

// A function to remove shelf items
function removeShelfItem(item, itemData, itemReceived, quantity, shopper){
    if (item.$itemImg == null){
        return;
    }

    let $inventory = $("#inventory-item-container");

    // Creates the item in the user's inventory if it is clicked on
    if (itemReceived){
        console.log($inventory.offset());
        console.log(item.$itemContainer.offset());
        console.log($("#inventory-grid-container").scrollTop());
        trackItem(itemData, quantity);
        createItem(itemData, $inventory, inventoryItems, true, quantity);

        let itemAnimation = new ItemAnimation(item, $inventory.offset(),
                                                item.$itemContainer.offset(), true);
        itemAnimationArray.push(itemAnimation);
    } else{
        if(shopper != undefined){
            let itemAnimation = new ItemAnimation(item, shopper.position(),
            item.$itemContainer.position(), false);
            itemAnimationArray.push(itemAnimation);
        }
    }

    item.$itemContainer.off("click touchend");
    item.$itemDisplay.remove();
    item.$itemImg.remove();
    item.$itemImg = null;
}

function ItemAnimation(item, toPosition, fromPosition, inventoryItemReceived){
    this.itemEntity = item.$itemContainer.clone();
    this.toPos = toPosition;
    this.fromPos = fromPosition;

    if (inventoryItemReceived){
        $("#minigame-container").append(this.itemEntity);

        this.itemEntity.css({
            "background-color": "lightgreen"
        });

        this.toPos.top -= 120;
        this.toPos.left += 60;
    } else{
        $("#inventory-grid-container").append(this.itemEntity);

        // Gets the scroll position of the minigame
        let scrollY = $("#inventory-grid-container").scrollTop();
        let scrollX = $("#inventory-grid-container").scrollLeft();

        this.itemEntity.css({
            "background-color": "red"
        });

        this.fromPos.top += scrollY;
        this.fromPos.left += scrollX;
        this.toPos.top += scrollY;
        this.toPos.left += scrollX;
    }

    this.itemEntity.css({
        "position":"absolute",
        "pointer-events": "none",
        "top": fromPosition.top,
        "left": fromPosition.left,
        "opacity": "1",
        "zIndex": "5",
    });

    this.itemEntity.animate({
        opacity: 0,
        top: toPosition.top,
        left: toPosition.left,
    }, 500);

    let clone = this.itemEntity;
    this.timer = setTimeout(function(){
        clone.remove();
    }, 500);

}

// Tracks the items collected from the store shelves
function trackItem(itemData, quantity){
    let itemExists = false;
    for (let i = 0; i < itemArray.length; i++){
        if (itemData.itemName == itemArray[i].itemData.itemName){
            itemArray[i].quantity = itemArray[i].quantity + quantity;
            itemExists = true;
            break;
        }
    }
    // Creates a new item if it isn't being tracked in the array
    if (itemExists == false){
        let item = {itemData: itemData, quantity: quantity};
        itemArray.push(item);
    }
}

// Shows a results screen of all the items collected and buttons to continue
function endGame(){
    // Shows the end game prompt and creates the collected item within it
    $("#end-results-screen").show();
    $("#end-results-screen").css("opacity", 1);

    // Conditon for when the user collected no items
    if (itemArray.length != 0){
        for (let i = 0; i< itemArray.length; i++){
            createListItem(itemArray[i]);
        }
    } else{
        $("#items-list-container").append("<div class='results-item'><h3>Nothing :(</h3></div>");
    }

    // Stores the collected items array in the session local storage
    sessionStorage.clear();
    sessionStorage.setItem("collectedItems", JSON.stringify(itemArray));
    
    for (let i = 0; i < shopperArray.length; i++){
        clearInterval(shopperArray[i].moveTimer);
        clearInterval(shopperArray[i].updateTimer);
        shopperArray[i].$shopperContainer.remove();
    }

    for (let i = 0; i < shelfItemArray.length; i++){
        removeShelfItem(shelfItemArray[i], shelfItemArray[i].itemData, false, shelfItemArray[i].quantity);
    }

    for (let i = 0; i < itemAnimationArray.length; i++){
        clearTimeout(itemAnimationArray[i].timer);
        itemAnimationArray[i].itemEntity.remove();
    }

}

// Creates an item in the results items list
function createListItem(item){
    let $resultsItem = $("<div class='results-item'></div>");
    let $resultsItemIcon = $("<img src="+item.itemData.itemSprite+">");
    let $resultsItemName = $("<h2>"+item.itemData.itemName+"</h2>");
    let $resultsItemNum = $("<h3>"+item.quantity+"</h3>");

    $resultsItem.append($resultsItemIcon);
    $resultsItem.append($resultsItemName);
    $resultsItem.append($resultsItemNum);
    $("#items-list-container").append($resultsItem);
}
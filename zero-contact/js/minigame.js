let itemArray = [];
let shelfItemArray = [];
let maxTime = 25000;
let minTime = 5000;

$(document).ready(function(){
    $("#end-results-screen").hide();
    $("#end-results-screen").css("opacity", 0);

    $.getJSON('items-data.json', function (data) {
        itemDataArray = data;

        // Creates the last 2 items in the json file

        // Number of rows and columns of shelves
        let rowDimensions = 2;
        let columnDimensions = 2;

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

        // Sets the clock timer text every second
        let start = new Date;
        let limit = Math.round(maxTime / 1000);
        $("#clock-timer").text("25 Seconds");
        let clockTimer = setInterval(function(){
            let timeElapsed = (limit - Math.round((new Date - start) / 1000));
            $("#clock-timer").text(timeElapsed + " Second" + ((timeElapsed == 1) ? "":"s"));

            if (timeElapsed == 0){
                clearInterval(clockTimer);
                endGame();
            }
        }, 1000);

        let row = 1;
        let timer = setInterval(function(){
            row++;
            if(row > 18){
                row = 1;
            }
            let shopperCoord = "" + 3 + row;
            let gridArea =  "4 / " + row;
            
            $(".shopper-container").css({
                "grid-area": gridArea + " / span 1 / span 1",
            });

            shelfItemArray.forEach(function(item){
                if (shopperCoord === item.position){
                    console.log(item.position);
                    console.log(shopperCoord);
                    console.log("yes");
                    removeShelfItem(item, item.itemData, false, item.quantity);

                }
            });

        }, 1000);
        
    });
});

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
    for (let x = 0; x < columns; x++){
        for(let y = 0; y < rows; y++){
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

    /*
    // A timer for how long the item stays on the shelf
    let randTime = (Math.random()*(maxTime-minTime) + minTime);
    let timer = setTimeout(function(){
        removeShelfItem(item, itemData, false, quantity);
    }, randTime);
    */

    // Clears the timer to remove the item and collects it
    item.$itemContainer.on("click touchend",function(){
        removeShelfItem(item, itemData, true, quantity);
    });
};

// A function to remove shelf items
function removeShelfItem(item, itemData, itemReceived, quantity){
    console.log(itemData.itemName + " remove!");
    item.$itemContainer.off("click touchend");
    item.$itemDisplay.remove();
    item.$itemImg.remove();

    // Creates the item in the user's inventory if it is clicked on
    if (itemReceived){
        trackItem(itemData, quantity);
        createItem(itemData, "#inventory-item-container", inventoryItems, true, quantity);
    }
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
// A class for storeshelf items for collecting items
function StoreShelf(rows, columns, xCoord, yCoord, maxItems) {
    // Shelf attributes
    this.rows = rows;
    this.columns = columns;
    this.itemWidth = 100;
    this.itemHeight = 100;
    this.gridGap = 25;
    this.gridRow = xCoord + " / span " + (rows);
    this.gridColumn = yCoord + " / span " + (columns);

    this.$shelfContainer = $("<div class='store-shelf-container'></div>");

    this.$shelfContainer.css({
        "grid-template-rows": "repeat(" + this.rows + "," + this.itemWidth + "px)",
        "grid-template-columns": "repeat(" + this.columns + "," + this.itemHeight + "px)",
        "grid-gap": 20 + "px",
        "grid-row": this.gridRow,
        "grid-column": this.gridColumn,
        "width": this.columns * this.itemWidth + ((this.columns - 1) * this.gridGap) + "px",
        "height": this.rows * this.itemHeight + ((this.rows - 1) * this.gridGap) + "px",
    });

    // Creates an item for every row and column in the shelf
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            // The amount of items in one shelf slot
            let itemNum = Math.round((Math.random() * 1.3) + 0.25);

            if (itemNum > 0) {
                // Which items to create in the shelves
                let num = Math.round((Math.random() * (maxItems - 1)));

                createShelfItem(itemDataArray[num], this.$shelfContainer, itemArray, false, itemNum,
                    x + xCoord, y + yCoord, false);
            } else {
                createShelfItem(itemDataArray[0], this.$shelfContainer, itemArray, false, itemNum,
                    x + xCoord, y + yCoord, true);
            }
        }
    }

    $("#inventory-grid-container").append(this.$shelfContainer);
    $("#inventory-grid-container").disableSelection();
};

// A function to create shelf items
function createShelfItem(itemData, container, array, tooltipOn, quantity, gridRow, gridColumn, removeDefault) {
    let item = new InventoryItem(itemData.itemSprite, itemData.itemName,
        itemData.useableOn, itemData.infectionRisk,
        itemData.effect, itemData.itemText, container,
        array, tooltipOn, quantity);

    item.position = "" + gridRow + gridColumn;

    item.itemData = itemData;
    shelfItemArray.push(item);

    // Clears the timer to remove the item and collects it
    item.$itemContainer.on("click touchend", function () {
        removeShelfItem(item, itemData, true, quantity);
    });

    if (removeDefault) {
        removeShelfItem(item, itemData, false, quantity);
    }
};

// A function to remove shelf items
function removeShelfItem(item, itemData, itemReceived, quantity, shopper) {
    if (item.$itemImg == null) {
        return;
    }

    let $inventory = $("#inventory-item-container");

    // Creates the item in the user's inventory if it is clicked on
    if (itemReceived) {
        trackItem(itemData, quantity);
        createItem(itemData, $inventory, inventoryItems, true, quantity);

        let itemAnimation = new ItemAnimation(item, $inventory.offset(),
            item.$itemContainer.offset(), true);
        itemAnimationArray.push(itemAnimation);

        // Play the clock ticking audio
        document.querySelector("#audio-item-taken").cloneNode(true).play();
    } else {
        if (shopper != undefined) {
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
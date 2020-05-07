let itemArray = [];

$(document).ready(function(){
    $.getJSON('items-data.json', function (data) {
        itemDataArray = data;

        // Creates the last 2 items in the json file
        for (let i = 0; i < 3; i++){
            let shelf = new StoreShelf(3,3);
            let shelf2 = new StoreShelf(3,3);
            let shelf3 = new StoreShelf(2,2);
        }

        // Adds drag scrolling to the container and allows items to be clicked
        $("#inventory-grid-container").kinetic();
    });
});

function StoreShelf(rows, columns){
    // Shelf attributes
    this.rows = rows;
    this.columns = columns;
    this.itemWidth = 100;
    this.itemHeight = 100;
    this.gridGap = 20;

    this.$shelfContainer = $("<div class='store-shelf-container'></div>");

    this.$shelfContainer.css({
        "grid-template-rows": "repeat("+this.rows+"," + this.itemWidth + "px)",
        "grid-template-columns": "repeat("+this.columns+"," + this.itemHeight + "px)",
        "grid-gap": 20 + "px",
        "width": this.columns*this.itemWidth+((this.columns-1)*this.gridGap) + "px",
        "height": this.rows*this.itemHeight+((this.rows-1)*this.gridGap) + "px",
    });

    for (let x = 0; x < columns; x++){
        for(let y = 0; y < rows; y++){
            let num = Math.round((Math.random()*1) + 6);
            createShelfItem(itemDataArray[num], this.$shelfContainer, itemArray, false);
        }
    }
    $("#inventory-grid-container").append(this.$shelfContainer);
    $("#inventory-grid-container").disableSelection();
};

function createShelfItem(itemData, container, array, tooltipOn){
    let item = new InventoryItem(itemData.itemSprite, itemData.itemName, 
                                itemData.useableOn, itemData.infectionRisk,
                                itemData.statusEffect, itemData.itemText, container, array, tooltipOn);

    let randTime = (Math.random()*20000 + 5000);
    let timer = setTimeout(function(){
        removeShelfItem(item, itemData);
    }, randTime);

    item.$itemContainer.on("click touchend",function(){
        clearTimeout(timer);
        removeShelfItem(item, itemData, true);
    });
};

function removeShelfItem(item, itemData, itemReceived){
    console.log(itemData.itemName + " remove!");
    item.$itemContainer.off("click touchend");
    item.$itemDisplay.remove();
    item.$itemImg.remove();

    if (itemReceived){
        createItem(itemData, "#inventory-item-container", inventoryItems, true)
    }
}
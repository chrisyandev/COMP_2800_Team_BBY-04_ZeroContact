let itemArray = [];

$(document).ready(function(){
    let shelf = new StoreShelf(3,3);
    let shelf2 = new StoreShelf(3,3);
    let shelf3 = new StoreShelf(2,2);
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
            createShelfItem("https://clipartix.com/wp-content/uploads/2018/09/yellow-clipart-2018-10.png",
            "Bananas", 2, this.$shelfContainer, itemArray);
            console.log("yes");
        }
    }
    $("#inventory-grid-container").append(this.$shelfContainer);
};

function createShelfItem(url, type, use, container, itemArray){
    let item = new InventoryItem(url, type, use, container, itemArray);
};
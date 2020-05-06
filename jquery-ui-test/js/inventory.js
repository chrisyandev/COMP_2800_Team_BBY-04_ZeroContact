let overDropZone = false;
let inventoryItems = [];

// Expands the inventory when the button is clicked
$(document).ready(() => {
    // Highlights the items which are useful to the card
    highlightItem(cardNum);

    $("#item-use-prompt").hide();

    // Adds the event listener to the inventory expand button
    $("#inventory-expand-button").on("click", () => {
        let height = parseInt($("#inventory-container").css("height"));
        let buttonText;
        if (height == 150){
            height = "75%";
            buttonText = "Close";
        } else{
            height = "150px";
            buttonText = "Open";
        }
        $("#inventory-container").height(height);
        $("#inventory-expand-button").text(buttonText);
        console.log(height);
    });

    $(".inventory-drop-zone").droppable({
        accept: ".inventory-item",
        tolerance: "touch",
        drop: function(event, ui){
            // Sets dropped to true if a draggable element is over the drop zone
            overDropZone = true;
        },
        // When an inventory item hovers over and out of a droppable zone
        over: function(){
            $(".inventory-drop-zone").css("background-color", "rgba(23, 235, 23, 0.281)");
        },
        out: function(){
            $(".inventory-drop-zone").css("background-color", "rgba(218, 218, 218, 0.281)")
        }
    });
    
    // Turns the children of this container into sortable elements
    $("#inventory-item-container").sortable({
        scroll: false,
        opacity: 1,
        tolerance: "pointer",
        placeholder: "inventory-item-placeholder",
        cursorAt: [75, 75],
        helper: "clone",
        items: "> div",
        start: function(event, ui){
            $(".inventory-drop-zone").css("opacity", 1);
            // Sets a flag for if this draggable is over the drop zone
            overDropZone = false;
        },

        stop: function(event, ui){
            $(".inventory-drop-zone").css("opacity", 0);
            if (overDropZone){
                let index = $(ui.item).attr('data-id');

                // Uses the item according to its index in the array
                inventoryItems[index].useItem();
                
            } 
        },
    });
});

// Class for dynamically creating items
function InventoryItem(imageName, type, use) {
    // Item attributes
    this.quantity = 1;
    this.index = inventoryItems.length;
    this.rarity = "common";
    this.item = type;
    this.use = use;

    // HTML tags
    this.$itemContainer = $('<div data-id="'+this.index+'" style="grid-column: 0" class="inventory-item"></div>');
    this.$itemImg = $("<img src='" + imageName + "'>");
    this.$itemDisplay = $("<h1>" + this.quantity + "</h1>");

    // Prevents creating a ghost image when dragging the image
    this.$itemImg.attr('draggable', false);

    // Puts the image and quantity into a container
    this.$itemContainer.append(this.$itemImg);
    this.$itemContainer.append(this.$itemDisplay);

    this.useItem = function(){
        console.log("Used Item: " + this.item);
        if (this.quantity == 1){
            // Removes the item if there is only 1 left
            this.$itemContainer.remove();
        } else {
            this.increaseQuantity(-1);
        }
    };

    this.increaseQuantity = function (num){
        this.quantity += num;
        this.$itemDisplay.text(this.quantity);
    }

    // Disable selection of items
    $("#inventory-item-container").disableSelection();

    // Put the image container inside the inventory
    $("#inventory-item-container").append(this.$itemContainer);
}

function highlightItem(use){
    for (let i = 0; i < inventoryItems.length; i++){
        if (inventoryItems[i].use == use){
            inventoryItems[i].$itemContainer.css("box-shadow",
                "0 0 20px rgb(255, 243, 79)");
        } else {
            inventoryItems[i].$itemContainer.css("box-shadow",
            "0 0 0px rgb(255, 243, 79)");
        }
    }
}

function createItem(url, type, use){
    let itemExists = false;
    for (let i = 0; i < inventoryItems.length; i++){
        if (type == inventoryItems[i].item){
            inventoryItems[i].increaseQuantity(1);
            itemExists = true;
        }
    }
    if (itemExists != true){
        let item = new InventoryItem(url, type, use);
        inventoryItems.push(item);
    }
}

for (let i = 0; i < 5; i++){
    createItem("https://clipartix.com/wp-content/uploads/2018/03/orange-clipart-2018-50.png", "orange", 0);
    createItem("https://i.pinimg.com/originals/f1/b2/9e/f1b29ee56628bccf15df81d70c329643.png", "grapes", 1);
    createItem("https://clipartix.com/wp-content/uploads/2018/09/yellow-clipart-2018-10.png", "bananas", 2);
    createItem("https://clipartix.com/wp-content/uploads/2017/06/Teacher-apple-clipart-free-images-2.gif","apples", 3);
}

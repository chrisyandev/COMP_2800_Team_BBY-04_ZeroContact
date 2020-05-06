let overDropZone = false;

// Expands the inventory when the button is clicked
$(document).ready(() => {
    // Adds the event listener to the inventory expand button
    $("#inventory-expand-button").on("click", () => {
        let height = parseInt($("#inventory-container").css("height"));
        let buttonText;
        if (height == 200){
            height = "75%";
            buttonText = "Close";
        } else{
            height = "200px";
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
});

// Class for dynamically creating items
function InventoryItem(imageName) {
    // Item attributes
    this.quantity = 1;
    this.index = 0;
    this.rarity = "common";

    // HTML tags
    this.$itemContainer = $('<div class="inventory-item"></div>');
    this.$itemImg = $("<img src='" + imageName + "'>");
    this.$itemDisplay = $("<h1>" + this.quantity + "</h1>");

    // Prevents creating a ghost image when dragging the image
    this.$itemImg.attr('draggable', false);

    // Puts the image and quantity into a container
    this.$itemContainer.append($itemImg);
    this.$itemContainer.append($itemDisplay);
    
    // Refer to itself
    self = this;

    $("#inventory-item-container").sortable({
        scroll: false,
        opacity: 1,
        tolerance: "pointer",
        placeholder: "inventory-item-placeholder",
        cursorAt: [75, 75],
        helper: "clone",
        start: function(event, ui){
            $(".inventory-drop-zone").css("opacity", 1);
            // Sets a flag for if this draggable is over the drop zone
            overDropZone = false;
        },

        stop: function(event, ui){
            $(".inventory-drop-zone").css("opacity", 0);
            if (overDropZone){
                ui.item.remove();
                // TODO add an effect when the item is used
            }
        },
    });

    this.useItem = function(){
        console.log("woo");
    };

    // Disable selection of items
    $("#inventory-item-container").disableSelection();

    // Put the image container inside the inventory
    $("#inventory-item-container").append($itemContainer);
}

InventoryItem("https://clipartix.com/wp-content/uploads/2018/03/orange-clipart-2018-50.png");
InventoryItem("https://i.pinimg.com/originals/f1/b2/9e/f1b29ee56628bccf15df81d70c329643.png");
InventoryItem("https://clipartix.com/wp-content/uploads/2018/09/yellow-clipart-2018-10.png");
InventoryItem("https://clipartix.com/wp-content/uploads/2017/06/Teacher-apple-clipart-free-images-2.gif");
let itemDataArray = [];

/* ------------------------------------------------------------------- */
/* Functions for the inventory feature only included on the main page  */
/* ------------------------------------------------------------------- */

$(document).ready(function () {
    //-------------------------------------------------------------
    // Inventory prompt functions
    $("#item-use-prompt").hide()

    $("#item-use-decline").on("click", function () {
        $("#item-use-prompt").css("opacity", 0);
        $("#item-use-prompt").hide()
    })

    $("#item-use-close").on("click", function () {
        $("#item-use-prompt").css("opacity", 0);
        $("#item-use-prompt").hide()
    })

    //-------------------------------------------------------------
    // Inventory functions

    $(".inventory-drop-zone").droppable({
        accept: ".inventory-item",
        tolerance: "touch",
        drop: function (event, ui) {
            // Sets dropped to true if a draggable element is over the drop zone
            overDropZone = true;
        },

        // When an inventory item hovers over and out of a droppable zone
        over: function () {
            $(".inventory-drop-zone").css("background-color", "rgba(23, 235, 23, 0.281)");
        },
        out: function () {
            $(".inventory-drop-zone").css("background-color", "rgba(218, 218, 218, 0.281)")
        }
    });

    // Gets data from the json file and puts it into an array
    $.getJSON('items-data.json', function (data) {
        itemDataArray = data;

        // Gets the array of collected items from the minigame
        let items = sessionStorage.getItem('collectedItems');
        let collectedItems = JSON.parse(items);
        console.log(collectedItems);
        console.log(itemDataArray);

        // Creates the inventory items from the collected items
        for (let i = 0; i < collectedItems.length; i++) {
            let itemCreateData = findItemData(collectedItems, i);
            let itemCreateNum = collectedItems[i].quantity;
            createItem(itemCreateData, "#inventory-item-container", inventoryItems, true,
                itemCreateNum);

        }

        let tempUseCases = [cardDataArray[cardNum].event];
        console.log(tempUseCases);
        highlightItem(tempUseCases);
    });

});
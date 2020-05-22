let overDropZone = false;
let inventoryItems = [];

// Expands the inventory when the button is clicked
$(document).ready(() => {
    $(".inventory-drop-zone").hide();

    $("#inventory-container").width((280 / 530) * $(window).height() / 2 + "px");

    // Gets data from the json file and puts it into an array
    $.getJSON('items-data.json', function (data) {
        itemDataArray = data;

    });

    // Turns the children of this container into sortable elements
    // Attribution: https://jqueryui.com/sortable/
    $("#inventory-item-container").sortable({
        scroll: false,
        opacity: 1,
        tolerance: "pointer",
        placeholder: "inventory-item-placeholder",
        cursorAt: [75, 75],
        helper: "clone",
        items: "> div",
        start: function (event, ui) {
            let index = $(ui.item).attr('data-id');
            let item = inventoryItems[index];

            if (item.useable == true) {
                $(".inventory-drop-zone").css("opacity", 1);
                $(".inventory-drop-zone").show();
            } else {
                $(".inventory-drop-zone").css("opacity", 0);
                $(".inventory-drop-zone").hide();
            }

            // Sets a flag for if this draggable is over the drop zone
            overDropZone = false;
        },

        stop: function (event, ui) {
            $(".inventory-drop-zone").css("opacity", 0);
            $(".inventory-drop-zone").hide();
            if (overDropZone) {
                let index = $(ui.item).attr('data-id');

                // Uses the item according to its index in the array
                showPrompt(inventoryItems[index]);
                $("#inventory-item-container").sortable("cancel");
                $(".inventory-drop-zone").css("background-color", "rgba(218, 218, 218, 0.281)");
            }
        },
    });
});

// Finds the item data associated with the item name and returns it
function findItemData(collectedItems, i) {
    for (let k = 0; k < itemDataArray.length; k++) {
        let collectedItemName = collectedItems[i].itemData.itemName;
        let itemDataName = itemDataArray[k].itemName;
        if (collectedItemName == itemDataName) {
            itemCreateData = itemDataArray[k];
            return (itemCreateData);
        }
    }
}

// Shows the prompt to confirm the usage of an item
function showPrompt(item) {
    $("#item-use-accept").off("click");
    $("#item-use-prompt").css("opacity", 1);
    $("#item-use-prompt").show();

    $("#item-use-heading").text("Confirm usage of: " + item.item + "?");
    $("#item-use-description").text("'" + item.desc + "'");

    let effects = item.checkEffect();

    $("#item-use-effect").html("Using this item will affect your: <br>" +
        effects);

    $("#item-use-accept").on("click", function () {
        item.useItem();
        $("#item-use-prompt").css("opacity", 0);
        $("#item-use-prompt").hide()
    });
}

// Class for dynamically creating items
function InventoryItem(imageName, type, use, risk, effect, text, container, array, tooltipOn, quantity) {
    // Item attributes
    this.quantity = quantity;
    this.imageUrl = imageName;
    this.index = array.length;
    this.risk = risk;
    this.effect = effect;
    this.rarity = "common";
    this.item = type;
    this.use = use;
    this.useable = false;
    this.desc = text;
    this.position;
    this.itemData;

    // HTML tags
    this.$itemContainer = $('<div data-id="' + this.index + '" class="inventory-item" ' +
        'data-html="true" data-toggle="tooltip" title="' +
        this.item + ":" + this.desc + '"></div>');
    this.$itemImg = $("<img src='" + this.imageUrl + "'>");
    this.$itemDisplay = $("<h1>" + this.quantity + "</h1>");

    // Prevents creating a ghost image when dragging the image
    this.$itemImg.attr('draggable', false);

    // Puts the image and quantity into a container
    this.$itemContainer.append(this.$itemImg);
    this.$itemContainer.append(this.$itemDisplay);

    // Creates a tooltip using the title of the html element
    this.$itemContainer.tooltip();

    this.useItem = function () {
        console.log("Used Item: " + this.item);

        if (this.quantity == 1) {
            // Removes the item if there is only 1 left
            this.$itemContainer.remove();
        } else {
            this.increaseQuantity(-1);
        }

        // Change resources
        $(document.body).trigger('update-resources', {
            effect: this.effect,
            event: 'item-used'
        });

        let tempUseCases = [cardDataArray[cardNum].event];
        highlightItem(tempUseCases);
    };

    this.increaseQuantity = function (num) {
        this.quantity += num;
        this.$itemDisplay.text(this.quantity);
    };

    this.disableUse = function () {
        this.useable = false;
    };

    this.enableUse = function () {
        this.useable = true;
    };

    this.checkEffect = function () {
        console.log(this.effect);
        let effectString = "";
        if (this.effect.physical != 0) {
            effectString += "Health Points <br>";
        }
        if (this.effect.mental != 0) {
            effectString += "Mental Health Points <br>";
        }
        if (this.effect.supplies != 0) {
            effectString += "Supplies <br>";
        }
        if (this.effect.wealth != 0) {
            effectString += "Wealth <br>";
        }
        return (effectString);
    }

    // Disable selection of items
    $(container).disableSelection();

    // Put the image container inside the inventory
    $(container).append(this.$itemContainer);
}

// Highlights all items in the array if it they are useful to the situation
function highlightItem(tempUse) {
    for (let i = 0; i < inventoryItems.length; i++) {
        // Checks if the item is useful or not
        let isUseful = isItemUseful(inventoryItems[i], tempUse);
        if (isUseful == true) {
            inventoryItems[i].$itemContainer.css("box-shadow",
                "0 0 20px rgb(255, 243, 79)");
            inventoryItems[i].enableUse();
        } else {
            inventoryItems[i].$itemContainer.css("box-shadow",
                "0 0 0px rgb(255, 243, 79)");

            inventoryItems[i].disableUse();
        }
    }

    // For loop for detecting whether to make the open button glow
    let highlightOpenBtn = false;
    for (let i = 0; i < inventoryItems.length; i++) {
        let isUsable = inventoryItems[i].useable;
        if (isUsable == true) {
            highlightOpenBtn = true;
            break;
        }
    }

    if (highlightOpenBtn == true) {
        $("#inventory-expand-button").css("box-shadow",
            "0 0 20px rgb(255, 243, 79)");
    } else {
        $("#inventory-expand-button").css("box-shadow",
            "0 0 0px rgb(255, 243, 79)");
    }
}

// Checks the item against all the usecases if it is useful to the current event card
function isItemUseful(item, useCase) {
    let isUseful = false;
    for (let i = 0; i < item.use.length; i++) {
        for (let x = 0; x < useCase.length; x++) {
            if (item.use[i] == useCase[x]) {
                isUseful = true;
                break;
            }
        }
    }
    return (isUseful);
}

// Creates an item in the inventory or increases its quantity if it already exists
function createItem(itemData, container, array, tooltipOn, quantity) {
    let itemExists = false;
    for (let i = 0; i < array.length; i++) {
        if (itemData.itemName == array[i].item) {
            array[i].increaseQuantity(quantity);
            itemExists = true;
            break;
        }
    }
    if (itemExists != true) {
        let item = new InventoryItem(itemData.itemSprite, itemData.itemName,
            itemData.useableOn, itemData.infectionRisk,
            itemData.effect, itemData.itemText, container,
            array, tooltipOn, quantity);
        array.push(item);
    }
}
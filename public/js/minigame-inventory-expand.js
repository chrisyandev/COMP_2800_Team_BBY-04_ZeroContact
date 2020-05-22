/* ---------------------------------------------------------------------- */
/* A function to expand the inventory in the minigame  when it is clicked */
/* -----------------------------------------------------------------------*/

// Adds the event listener to the inventory expand button
$("#game-inventory-expand-button").on("click", () => {
    let height = parseInt($("#game-inventory-container").css("height"));
    let width;
    let buttonText;
    let topValue;
    let leftValue;
    let inventoryHeight;
    let transform;
    if (height == 50) {
        height = "80%";
        buttonText = "Close";
        topValue = "20%";
        leftValue = "50%";
        inventoryHeight = "100%";
        width = $("#inventory-grid-container").width() + "px";
        transform = "translateX(-50%)";
    } else {
        height = "50px";
        buttonText = "Inventory";
        topValue = "90%";
        inventoryHeight = "0%";
        leftValue = "25%";
        width = "50%";
        transform = "translateX(0%)"
    }

    $("#game-inventory-container").height(height);
    $("#game-inventory-container").width(width);
    $("#game-inventory-container").css({
        "top": topValue,
        "left": leftValue,
        "transform": transform,
    });
    $("#inventory-item-container").css({
        "height": inventoryHeight
    });
    $("game-#inventory-expand-button").text(buttonText);
});
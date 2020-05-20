// Adds the event listener to the inventory expand button
$("#game-inventory-expand-button").on("click", () => {
    let height = parseInt($("#game-inventory-container").css("height"));
    let width;
    let buttonText;
    let topValue;
    let leftValue;
    let inventoryHeight;
    if (height == 50){
        height = "80%";
        buttonText = "Close";
        topValue = "20%";
        inventoryHeight = "100%";
    } else{
        height = "50px";
        buttonText = "Inventory";
        topValue = "90%";
        inventoryHeight = "0%";
    }

    $("#game-inventory-container").height(height);
    $("#game-inventory-container").width(width);
    $("#game-inventory-container").css({
        "top": topValue,
        "left": leftValue,
    });
    $("#inventory-item-container").css({
        "height": inventoryHeight
    });
    $("game-#inventory-expand-button").text(buttonText);
});
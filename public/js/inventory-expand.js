// Adds the event listener to the inventory expand button
$("#inventory-expand-button").on("click", () => {
    let height = parseInt($("#inventory-container").css("height"));
    let width;
    let buttonText;
    let topValue;
    let leftValue;
    if (height == 20){
        height = "80%";
        leftValue = "25%";
        width = "50%";
        buttonText = "Close";
        topValue = "20%"
    } else{
        height = "20px";
        leftValue = "48%";
        width = (280/530) * $(window).height() / 2 + "px";
        buttonText = "Inventory";
        topValue = "95%";
    }

    $("#inventory-container").height(height);
    $("#inventory-container").width(width);
    $("#inventory-container").css({
        "top": topValue,
        "left": leftValue,
    });
    $("#inventory-expand-button").text(buttonText);
});
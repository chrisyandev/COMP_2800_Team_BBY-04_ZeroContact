/* ---------------------------------------------------------------------- */
/* A function to expand the inventory on the main page when it is clicked */
/* -----------------------------------------------------------------------*/

// Adds the event listener to the inventory expand button
$("#inventory-expand-button").on("click", () => {
    let height = parseInt($("#inventory-container").css("height"));
    let width;
    let buttonText;
    let topValue;
    let transform;
    if (height == 20) {
        height = "80%";
        width = $("#card-container").width() + "px";
        buttonText = "Close";
        topValue = "20%"
        transform = "translateX(-50%)";
    } else {
        height = "20px";
        width = (280 / 530) * $(window).height() / 2 + "px";
        buttonText = "Inventory";
        topValue = "95%";
        transform = "translateX(-15%)";
    }

    $("#inventory-container").height(height);
    $("#inventory-container").width(width);
    $("#inventory-container").css({
        "top": topValue,
        "transform": transform,
    });
    $("#inventory-expand-button").text(buttonText);
});
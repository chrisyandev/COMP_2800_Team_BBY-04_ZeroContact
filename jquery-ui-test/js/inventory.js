$(document).ready(() => {
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
});
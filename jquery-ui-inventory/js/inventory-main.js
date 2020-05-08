$(document).ready(function(){
    //-------------------------------------------------------------
    // Inventory prompt functions
    $("#item-use-prompt").hide()

    $("#item-use-decline").on("click", function(){
        $("#item-use-prompt").css("opacity", 0);
        $("#item-use-prompt").hide()
    })

    $("#item-use-close").on("click", function(){
        $("#item-use-prompt").css("opacity", 0);
        $("#item-use-prompt").hide()
    })

    //-------------------------------------------------------------
    // Inventory functions

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
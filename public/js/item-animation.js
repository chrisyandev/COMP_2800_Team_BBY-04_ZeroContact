
function ItemAnimation(item, toPosition, fromPosition, inventoryItemReceived){
    this.itemEntity = item.$itemContainer.clone();
    this.toPos = toPosition;
    this.fromPos = fromPosition;

    if (inventoryItemReceived){
        $("#minigame-container").append(this.itemEntity);

        this.itemEntity.css({
            "background-color": "lightgreen"
        });

        this.toPos.top -= 120;
        this.toPos.left += 60;
    } else{
        $("#inventory-grid-container").append(this.itemEntity);

        // Gets the scroll position of the minigame
        let scrollY = $("#inventory-grid-container").scrollTop();
        let scrollX = $("#inventory-grid-container").scrollLeft();

        this.itemEntity.css({
            "background-color": "red"
        });

        this.fromPos.top += scrollY;
        this.fromPos.left += scrollX;
        this.toPos.top += scrollY;
        this.toPos.left += scrollX;
    }

    this.itemEntity.css({
        "position":"absolute",
        "pointer-events": "none",
        "top": fromPosition.top,
        "left": fromPosition.left,
        "opacity": "1",
        "zIndex": "5",
    });

    this.itemEntity.animate({
        opacity: 0,
        top: toPosition.top,
        left: toPosition.left,
    }, 500);

    let clone = this.itemEntity;
    this.timer = setTimeout(function(){
        clone.remove();
    }, 500);

}

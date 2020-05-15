function TutorialPopUp(properties){
    this.properties = properties;
    console.log(properties);
    this.index = 0;
    this.$messageContainer = $("<div id='message-container'></div>");
    this.$continueButton = $("<button id='tutorial-button'>Continue</button>");
    this.$order = $("<h2></h2>");
    this.$message = $("<h1></h1>");

    // Functions
    this.updateMessage = function(){
        this.message = this.properties[this.index].message;
        this.$message.text(this.message);
    }

    this.updateOrder = function(){
        this.order = this.properties[this.index].order;
        this.$order.text(this.order);
    }

    this.updateWidth = function(){
        this.width = this.properties[this.index].width;
        this.$messageContainer.css({
            "width": this.width +"px",
            "transform": "translate("+ (-this.width / 2) + "px"+", "+ (-this.height / 2) +"px)",
        });
    }

    this.updateHeight = function(){
        this.height = this.properties[this.index].height;
        this.$messageContainer.css({
            "height": this.height + "px",
            "transform": "translate("+ (-this.width / 2) + "px"+", "+ (-this.height / 2) +"px)",
        });
    }

    this.updatePosition = function(){
        this.top = this.properties[this.index].top;
        this.left = this.properties[this.index].left;
        this.$messageContainer.css({
            "top": this.top + "vh",
            "left": this.left + "vw",
        });
    }

    this.update = function(){
        this.updateMessage();
        this.updateOrder();
        this.updateHeight();
        this.updateWidth();
        this.updatePosition();    
    }
    this.update();

    const self = this;
    // Button click function
    this.$continueButton.on("click", function(){
        if(self.index < self.properties.length-1){
            self.index += 1;
            self.update();
        } else{
            endTutorial(self);
        }
    });

    // Append elements together
    this.$messageContainer.append(this.$order);
    this.$messageContainer.append(this.$message);
    this.$messageContainer.append(this.$continueButton);
    $(properties[this.index].container).append(this.$messageContainer);
}

function endTutorial(popup){
    popup.$continueButton.remove();
    popup.$messageContainer.remove();

    $("#tutorial-container").hide();
    $("#tutorial-container").css("opacity", 0);
}
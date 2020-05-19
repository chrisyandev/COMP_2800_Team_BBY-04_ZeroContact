function TutorialPopUp(properties){
    this.properties = properties;
    console.log(properties);
    this.index = 0;
    this.$messageContainer = $("<div id='message-container'></div>");
    this.$topCloseButton = $('<button type="button" class="close" data-dismiss="modal">&times;</button>');
    this.$closeButton = $("<button id='close-container'></button>");
    this.$continueButton = $("<button id='tutorial-button' type='button' class='btn btn-default'>Continue</button>");
    this.$skipButton = $("<button id='tutorial-button' type='button' class='btn btn-default' data-dismiss='modal'>Skip</button>");
    this.$order = $("<h2></h2>");
    this.$message = $("<h1></h1>");

    // Append elements together
    /*
    this.$messageContainer.append(this.$order);
    this.$messageContainer.append(this.$message);
    this.$messageContainer.append(this.$continueButton);
    $("#tutorial-body").append(this.$messageContainer);
    */
   
    $("#tutorial-body").append(this.$order);
    $("#tutorial-body").append(this.$message);
    $("#tutorial-body").append(this.$continueButton);
    $("#tutorial-header").append(this.$topCloseButton);
    $("#tutorial-header").append(this.$order);
    $("#tutorial-footer").append(this.$skipButton);
    $("#tutorial-footer").append(this.$continueButton);

    /*$(properties[this.index].container).append(this.$messageContainer);*/

    // Functions
    this.updateMessage = function(){
        this.message = this.properties[this.index].message;
        this.$message.text(this.message);
    }

    this.updateOrder = function(){
        this.order = this.properties[this.index].order;
        this.$order.text(this.order);
    }

    this.updatePosition = function(){
        this.top = this.properties[this.index].top;
        this.left = this.properties[this.index].left;

        $("#tutorial-container").css({
            "padding-top": this.top + "vh",
            "padding-left": this.left + "vw",
        });
    }

    this.updateContent = function() {
        this.content = this.properties[this.index].content;
    }

    this.update = function(){
        this.updateMessage();
        this.updateOrder();
        this.updatePosition();    
        this.updateContent();
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
}

function endTutorial(popup){
    popup.$continueButton.remove();
    popup.$messageContainer.remove();

    $("#tutorial-container").hide();
    $("#tutorial-container").css("opacity", 0);
}
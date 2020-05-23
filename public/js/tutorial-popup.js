function TutorialPopUp(properties) {
    this.properties = properties;
    console.log(properties);
    this.index = 0;
    this.$content = $("<img class='img-fluid'>");
    this.$topCloseButton = $('<button type="button" class="close" data-dismiss="modal">&times;</button>');
    this.$backButton = $("<button id='tutorial-back-button' type='button' class='btn btn-default'>Back</button>");
    this.$continueButton = $("<button id='tutorial-cont-button' type='button' class='btn btn-primary'>Continue</button>");
    this.$skipButton = $("<button id='skip-button' type='button' class='btn btn-danger' data-dismiss='modal'>Skip</button>");
    this.$order = $("<h2></h2>");
    this.$message = $("<h1></h1>");

    $("#tutorial-body").append(this.$order);
    $("#tutorial-body").append(this.$message);
    $("#tutorial-body").append(this.$content);
    $("#tutorial-header").append(this.$order);
    $("#tutorial-header").append(this.$topCloseButton);
    $("#tutorial-footer").append(this.$skipButton);
    $("#tutorial-footer").append(this.$backButton);
    $("#tutorial-footer").append(this.$continueButton);

    /*$(properties[this.index].container).append(this.$messageContainer);*/

    // Functions
    this.updateMessage = function () {
        this.message = this.properties[this.index].message;
        this.$message.text(this.message);
    }

    this.updateOrder = function () {
        this.order = this.properties[this.index].order;
        this.$order.text(this.order);
    }

    this.updatePosition = function () {
        this.top = this.properties[this.index].top;
        this.left = this.properties[this.index].left;

        $("#tutorial-container").css({
            "padding-top": this.top + "vh",
            "padding-left": this.left + "vw",
        });
    }

    this.updateContent = function () {
        this.$content.attr("src", this.properties[this.index].content);
    }

    this.update = function () {
        this.updateMessage();
        this.updateOrder();
        this.updatePosition();
        this.updateContent();
    }
    this.update();

    const self = this;

    // Button click functions
    this.$continueButton.on("click", function () {
        if (self.index < self.properties.length - 1) {
            self.index += 1;
            self.update();
        } else {
            endTutorial(self);
        }

        if (self.index == self.properties.length - 1) {
            self.$continueButton.text("Start");
        } else {
            self.$continueButton.text("Continue");
        }
    });

    this.$backButton.on("click", function () {
        if (self.index > 0) {
            self.index -= 1;
            self.update();
        }
        if (self.index != self.properties.length - 1) {
            self.$continueButton.text("Continue");
        }
    });

    this.$topCloseButton.on("click", function () {
        endTutorial(self);
    });

    this.$skipButton.on("click", function () {
        endTutorial(self);
    });

}

function endTutorial() {
    $("#tutorial-container").hide();
    $("#tutorial-container").css("opacity", 0);
    startGame();
}
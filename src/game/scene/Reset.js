hero_animated_sprint = {};
BasicGame.Reset = function (game) {

};

BasicGame.Reset.prototype = {

        create: function () {

                this.gameStarted = false;
                this.gameOver = false;
                this.score = 0;
                BasicGame.start = 0;
  	        this.state.start('MainMenu');

    }

};


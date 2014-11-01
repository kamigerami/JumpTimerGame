
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

                // start physics system arcade mode
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                // add gravity to our world
                this.game.physics.arcade.gravity.y = 2600;



                 //////////// load sprites and atlases /////////////////////////

                // loading up the background
                background = this.game.add.tileSprite(0,0, this.world.width, this.world.height, 'bg');
                // autoscroll the spaceBG
                background.autoScroll(-700,0);

                // load foreground
                foreground = this.game.add.sprite(0,0, 'foreground');

                // load topground
                topground = this.game.add.sprite(0,0, 'topground');



                // load hero
                hero_animated_sprint = this.game.add.sprite(0,0, 'hero_sprint');




                ////// enable all physics ////

                this.game.physics.enable( [foreground, topground, hero_animated_sprint ], Phaser.Physics.ARCADE);



                // set specific physic options to the body of each sprite

                hero_animated_sprint.body.collideWorldBounds = true;
                hero_animated_sprint.body.maxVelocity.setTo(500, 500 * 10);


                foreground.body.collideWorldBounds = true;
                foreground.body.allowGravity = false;
                foreground.body.immovable = true;
                foreground.body.enable = true;

                topground.body.collideWorldBounds = true;
                topground.body.immovable = true;
                topground.body.allowGravity = false;




                hero_animated_sprint.animations.add('up',['hero_sprint06_06','hero_sprint07_07','hero_sprint08_08','hero_sprint09_09','hero_sprint10_10','hero_sprint11_11','hero_sprint12_12','hero_sprint13_13','hero_sprint14_14',/*'hero_sprint15_15',*/ 'hero_sprint16_16',/* 'hero_sprint17_17',*/'hero_sprint18_18','hero_sprint19_19','hero_sprint20_20','hero_sprint21_21','hero_sprint22_22','hero_sprint23_23','hero_sprint24_24','hero_sprint25_25','hero_sprint26_26' , 'hero_sprint27_27'], 15, true, false);
                // add animation
                hero_animated_sprint.animations.play('up');
                // check size of screen and set variables
                // check size of hero otherwise use smaller atlas
                if(BasicGame.screen != "large" && BasicGame.screen != "xlarge" && BasicGame.screen != "xxlarge") {
                        console.log(BasicGame.screen, "is smaller than large");
                        hero_animated_sprint.scale.set(0.5);
                }




                // Add Buttons //
                this.game.button_yellow = this.add.button(BasicGame.viewWidth * 0.20, BasicGame.viewHeight / 1.1 , 'yellow_button', this.onClick_yellow, this );
                this.game.button_blue = this.add.button(BasicGame.viewWidth * 0.40, BasicGame.viewHeight / 1.1 , 'blue_button', this.onClick_blue, this);
                this.game.button_red = this.add.button(BasicGame.viewWidth * 0.60, BasicGame.viewHeight / 1.1 , 'red_button', this.onClick_red, this);
                this.game.button_green = this.add.button(BasicGame.viewWidth * 0.80, BasicGame.viewHeight / 1.1 , 'green_button', this.onClick_green, this);



                // anchor points for everything

                this.game.button_yellow.anchor.setTo(0,0.5);
                this.game.button_blue.anchor.setTo(0,0.5);
                this.game.button_red.anchor.setTo(0,0.5);
                this.game.button_green.anchor.setTo(0,0.5);

                topground.anchor.setTo(0,0);

                hero_animated_sprint.anchor.setTo(0,0.9);
                hero_animated_sprint.position.x = 50;
},

        onClick_yellow:function(){
                console.log("yellow button jump");
                this.touchInputIsActive = true;
                this.checkTimeNow();
                },

        onClick_blue:function(){
                console.log("blue button jump");
                this.touchInputIsActive = true;
                },

        onClick_red:function(){
                console.log("red button jump");
                this.touchInputIsActive = true;
                },

        onClick_green:function(){
                console.log("green button jump");
                this.touchInputIsActive = true;
                },


	update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

                this.game.physics.arcade.collide(hero_animated_sprint, topground);
                this.game.physics.arcade.collide(hero_animated_sprint, foreground);
                this.game.physics.arcade.collide(foreground, topground);

/////////////// add button input stuff //////////////////////////////


           // Set a variable that is true when the player is touching the ground
    var onTheGround = hero_animated_sprint.body.touching.down;

    if (onTheGround && this.touchInputIsActive) {

        // Jump when the player is touching the ground and the up arrow is pressed
        hero_animated_sprint.body.velocity.y = -1000;
        this.touchInputIsActive = false;
        // create a var for NOW to check if double tap will occur within a few ms to prevent that
                // test for delay
    }



	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};

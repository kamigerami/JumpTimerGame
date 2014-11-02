/// declaring global vars
	var fontSize = 25;
	var alive = true;

BasicGame.Level_II = function (game) {

};

BasicGame.Level_II.prototype = {

	create: function () {
	// check first what screen size it is to scale stuff accordingly
	if(BasicGame.screen != "large" && BasicGame.screen != "xlarge" && BasicGame.screen != "xxlarge") {
			console.log(BasicGame.screen, "is smaller than large");
			fontSize = 15;
		}
		// start physics system arcade mode
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		// add gravity to our world
		this.game.physics.arcade.gravity.y = 1200;	

		// game physics bound only down and up

		this.game.physics.setBoundsToWorld();


		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		BasicGame.start = 0;
		BasicGame.level = 2;
    		 //////////// load sprites and atlases /////////////////////////
         	
		// loading up the background
                background = this.game.add.tileSprite(0,0, this.world.width, this.world.height, 'bg');
		// autoscroll the spaceBG
		background.autoScroll(-800,0);

		// load foreground
	        foreground = this.game.add.sprite(0,0, 'foreground');

		// load topground	
		topground = this.game.add.sprite(0,this.world.height/1.3, 'topground');	


 //// START TEXT
		this.startText = this.game.add.bitmapText(0,0, 'font', 'Level II', this.fontSize);
		this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
		this.startText.y = this.game.height / 2 - this.startText.textHeight / 2;

	tapToStart = this.game.add.text(this.game.width/2+0.5, this.game.height/2+70, 'Tap or Click to start...', { font: this.fontSize-5+'px Arial', fill: '#fff' });
                tapToStart.anchor.setTo(0.5, 0.5);

labelDeath = this.game.add.text(100, this.game.height / 4, 'Lifes : '+death, { font: this.fontSize-5+'px Arial', fill: '#fff', align: 'center' });
                labelDeath.anchor.setTo(0.5, 0.5);

////// load sounds

		BasicGame.hit_sound = this.game.add.audio('hit');


/////////////////////////////////////////////////////////////////////////////////

		// load hero 
		hero_animated_sprint = this.game.add.sprite(0,0, 'hero_sprint');

 		////// enable all physics ////

		this.game.physics.enable( [foreground, topground, hero_animated_sprint ], Phaser.Physics.ARCADE);

		
		// set specific physic options to the body of each sprite
		hero_animated_sprint.health = 10;
		hero_animated_sprint.body.gravity.y = 200;
//		hero_animated_sprint.body.collideWorldBounds = true;
		hero_animated_sprint.body.maxVelocity.setTo(500, 500 * 10);
		foreground.body.collideWorldBounds = true;
//		foreground.body.allowGravity = false;
//		foreground.body.immovable = true;
//		foreground.body.enable = false;
		
		topground.body.collideWorldBounds = true;
		topground.body.immovable = true;
		topground.body.allowGravity = false;

		// lets load up the atlas animation for the hero 
		
		hero_animated_sprint.animations.add('up',['hero_sprint06_06','hero_sprint07_07','hero_sprint08_08','hero_sprint09_09','hero_sprint10_10','hero_sprint11_11','hero_sprint12_12','hero_sprint13_13','hero_sprint14_14',/*'hero_sprint15_15',*/ 'hero_sprint16_16',/* 'hero_sprint17_17',*/'hero_sprint18_18','hero_sprint19_19','hero_sprint20_20','hero_sprint21_21','hero_sprint22_22','hero_sprint23_23','hero_sprint24_24','hero_sprint25_25','hero_sprint26_26' , 'hero_sprint27_27'], 15, true, false);
		// add animation
		hero_animated_sprint.animations.play('up');
		// check size of screen and set variables
		// check size of hero otherwise use smaller atlas
		if(BasicGame.screen != "large" && BasicGame.screen != "xlarge" && BasicGame.screen != "xxlarge") {
			console.log(BasicGame.screen, "is smaller than large");
			hero_animated_sprint.scale.set(0.5);
		}
			

		//Aligning HUD to view edges


		//
		//   POSITIONING : this.world.height & BasicGame.viewHeight  is the same thing : 480
		//
		// 

		// Add Buttons //
		this.game.button_yellow = this.add.button(BasicGame.viewWidth * 0.20, BasicGame.viewHeight / 1.1 , 'yellow_button', jump, this );
		this.game.button_blue = this.add.button(BasicGame.viewWidth * 0.40, BasicGame.viewHeight / 1.1 , 'blue_button', jump, this );
		this.game.button_red = this.add.button(BasicGame.viewWidth * 0.60, BasicGame.viewHeight / 1.1 , 'red_button', jump, this );
		this.game.button_green = this.add.button(BasicGame.viewWidth * 0.80, BasicGame.viewHeight / 1.1 , 'green_button', jump, this );

		// anchor points for everything

		this.game.button_yellow.anchor.setTo(0,0.5);
		this.game.button_blue.anchor.setTo(0,0.5);
		this.game.button_red.anchor.setTo(0,0.5);
		this.game.button_green.anchor.setTo(0,0.5);
		this.game.button_yellow.alpha = 0.5;	
		this.game.button_red.alpha = 0.5;	
		this.game.button_green.alpha = 0.5;	
		this.game.button_blue.alpha = 0.5;	

		topground.anchor.setTo(0,0);

		hero_animated_sprint.anchor.setTo(0,0.9);
		hero_animated_sprint.position.x = 50;

///// image over function ///////

	// first we enable inputs
	this.game.button_yellow.inputEnabled=true;
	this.game.button_red.inputEnabled=true;
	this.game.button_green.inputEnabled=true;
	this.game.button_blue.inputEnabled=true;

	// then we add hover over and down events
	this.game.button_yellow.events.onInputOver.add(hoverOver, this);
	this.game.button_yellow.events.onInputOut.add(hoverOut, this);

	this.game.button_red.events.onInputOver.add(hoverOver, this);
	this.game.button_red.events.onInputOut.add(hoverOut, this);


	this.game.button_blue.events.onInputOver.add(hoverOver, this);
	this.game.button_blue.events.onInputOut.add(hoverOut, this);


	this.game.button_green.events.onInputOver.add(hoverOver, this);
	this.game.button_green.events.onInputOut.add(hoverOut, this);
////// our functions for hovering over and out ///////////7

		function hoverOver(obj) {
			obj.alpha = 1.0;
		}

		function hoverOut(obj) {
			obj.alpha = 0.5;
		}

/// image out function /////////
/////// jump function //////////

	   // Set a variable that is true when the player is touching the ground
		function jump(obj) {
		console.log ("runnng jump function");
			// gives a true or false statement
			onTheGround = hero_animated_sprint.body.touching.down;

			if (onTheGround) {
        		// Jump when the player is touching the ground and the up arrow is pressed

				BasicGame.jump_sound = this.game.add.audio('jump').play('', 0, 0.1);
				console.log("inside if statement");
        			hero_animated_sprint.body.velocity.y = -600;
				hero_animated_sprint.body.velocity.x += 25;
			}
		}

/////////////// create obstacles ///////////////7
var block_red;

BasicGame.obstacles = this.game.add.group();
BasicGame.obstacles.enableBody = true;
BasicGame.obstacles.physicsBodyType = Phaser.Physics.ARCADE;
BasicGame.obstacles.allowGravity = false;
BasicGame.obstacles.checkWorldBounds = true;
BasicGame.obstacles.setAll('outOfBoundsKill', true);
//obstacles.x++;

		for (var x = 0; x < 5; x++)
		{
 		block_red = BasicGame.obstacles.create(-this.world.width + 5+x * Math.random(),this.world.height / 3, 'block_red');
            	block_red.name = 'block_red' + x.toString();
			block_red.checkWorldBounds = true;
			block_red.events.onOutOfBounds.add(obstacleOut, this);
			block_red.body.velocity.x = 150 + Math.random() * 15+x;
		}

	function obstacleOut(block_red) {
		
		// move obstacle to the right of the screen again
		block_red.reset(this.world.width, block_red.y);

		// give new random velocity

		block_red.body.velocity.x -= 50 + Math.random() * 50;
	}


/////////////////////////////////

           this.emitter = this.game.add.emitter(0, 0, 400);
            this.emitter.makeParticles('hero_pixel');
            this.emitter.gravity = 0;
            this.emitter.minParticleSpeed.setTo(-100, -500);
            this.emitter.maxParticleSpeed.setTo(100, 500);


			

},



	update: function () {

		//	Do some nice funky main menu effect here
			
		// lets see where they are
		
		// make hero collide with ground


		this.game.physics.arcade.collide(hero_animated_sprint, topground);
//		this.game.physics.arcade.collide(hero_animated_sprint, foreground);
		this.game.physics.arcade.collide(topground, foreground);
		this.game.physics.arcade.collide(BasicGame.obstacles, topground);
		this.game.physics.arcade.collide(BasicGame.obstacles, hero_animated_sprint);


		//////// if touch is down remove text and start
		if ( this.game.input.pointer1.isDown && BasicGame.start == 0) {
			console.log("first input down");
		this.game.world.remove(this.startText);
		this.game.world.remove(this.byme);
		this.game.world.remove(this.tapToStart);
		BasicGame.start = 1;
		BasicGame.music = this.game.add.audio('music');
		BasicGame.music.play('', 0, 0.1, true);
	}
 


		// debug overlap
    		this.game.physics.arcade.overlap(BasicGame.obstacles, hero_animated_sprint, heroHitHandler, null, this);

//////// new code above for input control //////////
		var i; // obstacle variable declared above
		for ( i = 0; i < BasicGame.obstacles.length; i++) // 10 obstacles 
		{

			if(BasicGame.obstacles.getAt(i).body.x > this.world.width)
			{
				BasicGame.obstacles.getAt(i).body.x += this.world.randomX;
			}
		 }		
				if (onTheGround && BasicGame.start == 1) {
				hero_animated_sprint.alive = true;
			}	
		/*	if (hero_animated_sprint.x > - this.world.width ) {
			console.log("inside sprintx > this.world.width statement");
				hero_animated_sprint.kill();
				hero_animated_sprint.alive = false;
				if (BasicGame.music != null) {
				BasicGame.music.pause();	
				console.log("stopping music");
				}
			}
*/
			if ( hero_animated_sprint.x > this.world.width + 20) {
			// hero passed to next level
			console.log("welcome to next level");
				if (BasicGame.music != null) BasicGame.music.resume();
				this.state.start('Level_III');
		}
/////// press to start
                this.emitter.forEachAlive(function(particle) 
			{
			particle.alpha = this.game.math.clamp(particle.lifespan / 10, 0, 1);
			
			}, this);

	//		if ( topground.y > hero_animated_sprint) console.log("hero y pos less than topground y pos");
	//		console.log("hero.y : ", hero_animated_sprint.y);
	//		console.log("topground.y : ", topground.y);


		function heroHitHandler (hero, obstacle) {
			console.log("running heroHit function", hero, obstacle);

			if (hero_animated_sprint.alive && death > 0) {
				hero_animated_sprint.alive = false;
				this.emitter.x = hero_animated_sprint.x+hero_animated_sprint.width/2;
				 this.emitter.y = hero_animated_sprint.y+hero_animated_sprint.height/2;
                    		this.emitter.start(true, 3000, 100, 16);
                     		BasicGame.hit_sound.play('', 0, 0.2);
                       		 death -= 1;
                       		 labelDeath.content = death;
					this.state.start('Level12)
				} else { hero_animated_sprint.alive = false;
					if (BasicGame.music != null ) {
					BasicGame.music.pause();	
					}
					BasicGame.start = 0;
					BasicGame.level = 0;
					death = 3;
// GAME OVER TEXtT
		
  		            this.game.world.remove(this.startText);
                	    this.game.world.remove(this.byme);
               		    this.game.world.remove(this.tapToStart);

                this.labelGameOver = this.game.add.bitmapText(0,0, 'font', 'Game Over', this.fontSize);
                this.labelGameOver.x = this.game.width / 2 - this.labelGameOver.textWidth / 2;
                this.labelGameOver.y = this.game.height / 2 - this.labelGameOver.textHeight / 2;
                this.labelGameOver.anchor.setTo(0.5, 0.5);
 
	         this.state.start('MainMenu');

				}
			}




},
	



	startGame: function (pointer) {

		

		//	And start the actual game
		this.state.start('Game');

	}
		// game debug
	
};


BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;
	this.hero = null;
	this.foreground = null;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		
		//this.load.setPreloadSprite(this.preloadBar);
		

		
			//this.load.image('bg', 'assets/'+BasicGame.screen+'/bg.png');
			this.load.image('bg', 'assets/space_pattern.jpg');
			this.load.image('foreground', 'assets/'+BasicGame.screen+'/foreground.png');

		// spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing) → {Phaser.Loader}

		/// PRELOAD FONTS
	this.game.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.fnt');

		            titel = this.game.add.text(this.game.width/2, this.game.height/2-20, 'JumpTimer', { font: BasicGame.fontSize+'px Arial', fill: '#fff' });
            loading = this.game.add.text(Math.floor(this.game.width/2)+0.5, Math.floor(this.game.height/2)+20+0.5, 'loading...', { font: BasicGame.fontSize+'px Arial', fill: '#fff' });
                titel.anchor.setTo(0.5, 0.5);
                loading.anchor.setTo(0.5, 0.5);



		this.load.image('topground', 'assets/'+BasicGame.screen+'/topground.png');
		this.load.image('topground_blue', 'assets/'+BasicGame.screen+'/topground_blue.png');
		this.load.image('topground_green', 'assets/'+BasicGame.screen+'/topground_green.png');
		this.load.image('topground_red', 'assets/'+BasicGame.screen+'/topground_red.png');
		this.load.image('topground_yellow', 'assets/'+BasicGame.screen+'/topground_yellow.png');


		     // load atlas -> key, textureURL, atlasDataUrl.json ->  
					
//	        this.load.atlasJSONArray('buttonyellow', 'assets/sprites_large.png', 'assets/sprites_large.json');


		this.load.image('yellow_button', 'assets/'+BasicGame.screen+'/button_yellow.png');
		this.load.image('red_button', 'assets/'+BasicGame.screen+'/button_red.png');
		this.load.image('green_button', 'assets/'+BasicGame.screen+'/button_green.png');
		this.load.image('blue_button', 'assets/'+BasicGame.screen+'/button_blue.png');




		// texture packer array
		this.load.atlasJSONArray('hero_sprint', 'assets/hero_sprint_json.png', 'assets/hero_sprint.json');

	},

	create: function () {
		//this.preloadBar.cropEnabled = false;
		this.ready = true;
		this.state.start('MainMenu');

	},

	update: function () {

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};

class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loading");
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('mainMenu');
    }
  }

  preload() {
    //FOR LOADING SCREEN
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x5ceb34, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.game.renderer.width;
    let height = this.game.renderer.height;

    let loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'LOADING',
        style: {
            font: '20px monospace',
            fill: '#ebab34'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    let percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", function(value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x22222, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
      });

    this.load.on("complete", function() {
      console.log("complete");
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy()
      percentText.destroy();
      this.ready();  
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image("logo", "./../assets/logo.png");
    for (let i = 0; i < 50; i++) {
      this.load.image("logo" + i, "./../assets/logo.png");
    }
    
    
    //main menu
    this.load.image("background", "assets/background.jpg");
    this.load.image("logoMainScreen", "assets/logo-for-main-screen.png");
    this.load.image("play", "assets/play-logo.png");
    this.load.image("shop", "assets/shop-logo.png");
    this.load.image("cookBook", "assets/cookbooklogo.png");
    this.load.image("soundOn", "assets/soundOn.png");
    this.load.image("soundOff", "assets/soundOff.png");

    //cookbook
    this.load.image("cookBookBg", "assets/cookbookmenu.jpg");

    //shop
    this.load.image("shopBg", "assets/shopBg.jpg");
    this.load.image("coins", "assets/coins.png");
    this.load.image('bibingka', "assets/menuBibingka.png")
    this.load.image('haloHalo', "assets/menuHalo2x.png")
    this.load.image('putoCheese', "assets/menuPutoCheese.png")
    this.load.image('bibingkaPrice', "assets/bibingkaPrice.png")
    this.load.image('haloHaloPrice', "assets/halohaloPrice.png")
    this.load.image('putoCheesePrice', "assets/putoCheesePrice.png")

    //game level tutorial
    this.load.image("tutorialBg", "assets/tutorialBg.jpg");

    //game levels
    this.load.image("back", "assets/back.png");
    this.load.image("levels", "assets/levels-for-main-screen.png");
    this.load.image("levelOne", "assets/levelOne.png");
    this.load.image("levelTwo", "assets/levelTwo.png");
    this.load.image("levelThree", "assets/levelThree.png");

    //scene for each level
    this.load.image("mainBg", "assets/main screen bg.jpg");
    this.load.image("mainBgBorder", "assets/mainScreenBorder.png");
    this.load.image("mainCharacter", "assets/cart.png");
    this.load.image("enemyCart", "assets/enemyCart.png")
    this.load.image(
      "fullProgressBar",
      "assets/fullprogressbar.png"
    );
    this.load.image(
      "emptyProgressBar",
      "assets/emptyprogressbar.png"
    );
    this.load.image(
      "competitorProgressBar",
      "assets/competitor.png"
    );
    this.load.image(
      "enemyEmptyProgressBar",
      "assets/enemyEmptyprogressbar.png"
    );
    this.load.image("character", "assets/charLogo.png");
    this.load.image("enemy", "assets/enemy.png");


    //animation of each villager
    this.load.spritesheet("villagerOne", "assets/villager1.png", {
      frameWidth: 37,
      frameHeight: 60
    });
    this.load.spritesheet("villagerTwo", "assets/villager2.png", {
      frameWidth: 35,
      frameHeight: 57
    });
    this.load.spritesheet("villagerThree", "assets/villager3.png", {
      frameWidth: 46,
      frameHeight: 57
    });
    this.load.spritesheet("villagerFour", "assets/villager4.png", {
      frameWidth: 51,
      frameHeight: 57
    });

    //food menu
    this.load.image("potatoKwekKwek", "assets/potatoKwekKwek.png");
    this.load.image("kamoteLumpia", "assets/kamoteLumpia.png");
    this.load.image("angry", "assets/angry.png");
    this.load.image(
      "potatoKwekKwekMenu",
      "assets/menuPotatoKwekKwek.png"
    );
    this.load.image(
      "kamoteLumpiaMenu",
      "assets/menuKamoteLumpia.png"
    );

    //audio
    this.load.audio('music', ['./../assets/bg-music.mp3']) 

  }

  create() {
    globalThis.music = this.sound.add('music', { loop: true})
    // globalThis.music.play()
    this.add.image(400, 300, "logo");
  }
}


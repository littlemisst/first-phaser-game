//UI
let background, emptyProgressBar,
fullProgressBarMask,
enemyProgressBar,
enemyProgressBarMask,
character, enemy, back, home, ordersCountText

//game levels
let goal = 288,
point = 0,
ordersCount = 0,
menuList = [],
currentLevel = '',
score = 0, enemyScore = 0,
food, order

//groups
let foodMenu, villagers, demands, foodOrders, complaints, timerEvent, enemyPointsGained

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
    this.load.image("angry", "assets/angry.png")
    this.load.image("home", "assets/home.png")
    this.load.image('ordersCountBg', "assets/ordersCount.png" )

    //gameOver
    this.load.image("gameOver", "assets/gameOver.png")
    this.load.image("tryAgain", "assets/tryAgain.png")

    //recipe received
    this.load.image('sparkle', "assets/sparkle.png")
    this.load.image('nextLevel', "assets/nextLevel.png")


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
      frameWidth: 45,
      frameHeight: 57
    });
    this.load.spritesheet("villagerFour", "assets/villager4.png", {
      frameWidth: 51,
      frameHeight: 57
    });
    this.load.spritesheet("sparkles", "assets/sparkle.png", {
      frameWidth: 198,
      frameHeight: 200
    });
    this.load.spritesheet("complain", "assets/complain.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("enemyPoints", "assets/enemyPoints.png", {
      frameWidth: 49,
      frameHeight: 53
    });
    
    //food menu
    this.load.image("tubig", "assets/tubig.png");
    this.load.image("sagotGulaman", "assets/gulaman.png");
    this.load.image("potatoKwekKwek", "assets/potatoKwekKwek.png");
    this.load.image("kamoteLumpia", "assets/kamoteLumpia.png");
    this.load.image("putoCheese", "assets/putoCheese.png")
    this.load.image("halo2x", "assets/halohalo.png")
    
    this.load.image("tubigMenu", "assets/menuTubig.png");
    this.load.image("sagotGulamanMenu", "assets/menuSagotGulaman.png");
    this.load.image(
      "potatoKwekKwekMenu",
      "assets/menuPotatoKwekKwek.png"
    );
    this.load.image(
      "kamoteLumpiaMenu",
      "assets/menuKamoteLumpia.png"
    );
    this.load.image('putoCheeseMenu', "assets/menuPutoCheese.png")
    this.load.image("halo2xMenu", "assets/menuHalo2x.png")
    

    //audio
    this.load.audio('music', ['assets/bg-music.mp3']) 
    this.load.audio('enemyScore', ['assets/enemyScore.mp3']) 
    this.load.audio('tagalSound', ['assets/tagal.mp3']) 
    this.load.audio('eatSound', ['assets/eat.mp3']) 
    this.load.audio('gameOverSound', ['assets/gameOverSound.mp3']) 
    this.load.audio('nextLevelSound', ['assets/nextLevelSound.mp3']) 
  }

  create() {
    globalThis.music = this.sound.add('music', { loop: true})
    // globalThis.music.play()
    this.add.image(400, 300, "logo");
  

    this.anims.create({
      key: "villager1",
      frames: this.anims.generateFrameNumbers("villagerOne", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "villager2",
      frames: this.anims.generateFrameNumbers("villagerTwo", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "villager3",
      frames: this.anims.generateFrameNumbers("villagerThree", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "villager4",
      frames: this.anims.generateFrameNumbers("villagerFour", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "sparkle",
      frames: this.anims.generateFrameNumbers("sparkles", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "tagal",
      frames: this.anims.generateFrameNumbers("complain", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "enemyScores",
      frames: this.anims.generateFrameNumbers("enemyPoints", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

  }

}


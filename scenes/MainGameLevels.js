class MainGameLevels extends Phaser.Scene {
  constructor() {
    super("mainGameLevels");
  }
  preload() {
    this.load.image("back", "./../scenes/assets/back.png");
    this.load.image("levels", "./../scenes/assets/levels-for-main-screen.png");
    this.load.image("levelOne", "./../scenes/assets/levelOne.png");
    this.load.image("levelTwo", "./../scenes/assets/levelTwo.png");
    this.load.image("levelThree", "./../scenes/assets/levelThree.png");

    //scene for each level
    this.load.image("mainBg", "./../scenes/assets/main screen bg.jpg");
    this.load.image("mainBgBorder", "./../scenes/assets/mainScreenBorder.png");
    this.load.image("mainCharacter", "./../scenes/assets/cart.png");
    this.load.image("enemyCart", "./../scenes/assets/enemyCart.png")
    this.load.image(
      "fullProgressBar",
      "./../scenes/assets/fullprogressbar.png"
    );
    this.load.image(
      "emptyProgressBar",
      "./../scenes/assets/emptyprogressbar.png"
    );
    this.load.image(
      "competitorProgressBar",
      "./../scenes/assets/competitor.png"
    );
    this.load.image(
      "enemyEmptyProgressBar",
      "./../scenes/assets/enemyEmptyprogressbar.png"
    );
    this.load.image("character", "./../scenes/assets/charLogo.png");
    this.load.image("enemy", "./../scenes/assets/enemy.png");
    this.load.image("back", "./../scenes/assets/back.png");


    //animation of each villager
    this.load.spritesheet("villagerOne", "./../scenes/assets/villager1.png", {
      frameWidth: 37,
      frameHeight: 60
    });
    this.load.spritesheet("villagerTwo", "./../scenes/assets/villager2.png", {
      frameWidth: 35,
      frameHeight: 57
    });
    this.load.spritesheet("villagerThree", "./../scenes/assets/villager3.png", {
      frameWidth: 46,
      frameHeight: 57
    });
    this.load.spritesheet("villagerFour", "./../scenes/assets/villager4.png", {
      frameWidth: 51,
      frameHeight: 57
    });

  }
  create() {
    this.background = this.add.image(0, 0, "background").setDepth(0);
    this.background.setOrigin(0, 0);
    
    this.levels = this.add.image(this.game.renderer.width / 2, 100, "levels").setDepth(1)

    this.levelOne = this.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height / 2 + 50, "levelOne").setDepth(1).setScale(0.3).setInteractive()
    this.levelOne.on('pointerdown', () => this.scene.switch('levelOneTutorial'), this);

    this.levelTwo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, "levelTwo").setDepth(1).setScale(0.3)
    
    this.levelThree = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height / 2 + 50, "levelThree").setDepth(1).setScale(0.3)
    
    this.back = this.add
      .image(
        this.game.renderer.width - 100,
        this.game.renderer.height - 30,
        "back"
      )
      .setScale(0.8)
      .setDepth(1)
      .setInteractive();
    this.back.on("pointerdown", () => this.scene.switch("mainMenu"), this);


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
  }
}

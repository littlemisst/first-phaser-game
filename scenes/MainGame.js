class MainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }

  preload() {
    this.load.image("mainBg", "./../scenes/assets/main screen bg.jpg");
    this.load.image("mainBgBorder", "./../scenes/assets/mainScreenBorder.png");
    this.load.image("mainCharacter", "./../scenes/assets/cart.png");
    this.load.spritesheet("villagerOne", "./../scenes/assets/villager1.png", {
      frameWidth: 37,
      frameHeight: 60
    });
    this.load.spritesheet("villagerTwo", "./../scenes/assets/villager2.png", {
      frameWidth: 35,
      frameHeight: 57
    });
    this.load.image("potatoKwekKwek", "./../scenes/assets/potatoKwekKwek.png");
    this.load.image("kamoteLumpia", "./../scenes/assets/kamoteLumpia.png");
    this.load.image("angry", "./../scenes/assets/angry.png");
  }

  create() {
    console.log(score)
    this.background = this.add.image(0, 0, "mainBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.backgroundBorder = this.add.image(0, 0, "mainBgBorder").setDepth(2);
    this.backgroundBorder.setOrigin(0, 0);

    this.character = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 + 100,
      "mainCharacter"
    );
    this.character.setScale(0.8, 0.8).setInteractive();
    this.character.input.dropZone = true;

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

    this.villagers = this.add.group();
    this.time.addEvent({
      delay: 10000,
      callback: function() {
        let villager = new VillagerFromRight(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180
        );
        villager.setDepth(1).setInteractive()
        this.villagers.add(villager);
      },
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 5000,
      callback: function() {
        let villager = new VillagerFromLeft(
          this,
          0,
          this.game.renderer.height / 2 + 180
        );
        villager.flipX = true
        villager.setDepth(1).setInteractive()
        this.villagers.add(villager);
      },
      callbackScope: this,
      loop: true
    });
  }

 

}



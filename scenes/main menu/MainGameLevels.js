class MainGameLevels extends Phaser.Scene {
  constructor() {
    super("mainGameLevels");
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

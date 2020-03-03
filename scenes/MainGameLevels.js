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
  }
}

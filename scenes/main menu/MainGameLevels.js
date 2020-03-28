class MainGameLevels extends Phaser.Scene {
  constructor() {
    super("mainGameLevels");
  }

  create() {
    this.background = this.add.image(0, 0, "background").setDepth(0);
    this.background.setOrigin(0, 0);
    
    this.levels = this.add.image(this.game.renderer.width / 2, 100, "levels").setDepth(1)

    this.levelOne = this.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height / 2 + 50, "levelOne").setDepth(1).setScale(0.3).setInteractive()
    this.levelOne.on('pointerdown', () => this.scene.start('levelOneDialogue'), this);

    this.levelTwo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, "levelTwo").setDepth(1).setScale(0.3).setInteractive()
    this.levelTwo.on('pointerdown', function() {
      if (recipes.includes('putoCheese')) {
        this.scene.start('levelTwo')
      }
    } , this);

    this.levelThree = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height / 2 + 50, "levelThree").setDepth(1).setScale(0.3).setInteractive()
    this.levelThree.on('pointerdown', function() {
      if (recipes.includes('halo2x')) {
        this.scene.start('levelThreeDialogue')
      }
    } , this);

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

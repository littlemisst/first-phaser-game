class LevelOneSuccess extends Phaser.Scene {
  constructor() {
    super("levelOneSuccess");
  }

  create(){
    this.putoCheese = this.add.image(0, this.game.renderer.height/2, 'putoCheese')
    this.achievement = new Recipe(this, this.putoCheese)
  }
}

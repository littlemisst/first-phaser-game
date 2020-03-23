class LevelOneSuccess extends Phaser.Scene {
  constructor() {
    super("levelOneSuccess");
  }

  create(){
    this.putoCheese = this.add.image(0, this.game.renderer.height/2, 'putoCheeseMenu').setInteractive()
    this.achievement = new Recipe(this, this.putoCheese)
    recipes.push('putoCheese')
    this.putoCheese.on('pointerdown', function() {
      this.scene.stop()
      this.scene.resume('levelOne')
    } , this);
  }
}

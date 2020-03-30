class LevelOneSuccess extends Phaser.Scene {
  constructor() {
    super("levelOneSuccess");
  }

  create(){
    lvl1.stop()
    this.putoCheese = this.add.image(0, this.game.renderer.height/2, 'putoCheeseMenu').setInteractive()
    this.achievement = new Recipe(this, this.putoCheese)
    recipes.push('putoCheese')
    this.putoCheese.on('pointerdown', function() {
      click.play()
      this.scene.stop()
      this.scene.resume('levelOne')
    } , this);
  }
}

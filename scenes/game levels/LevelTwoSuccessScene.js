class LevelTwoSuccess extends Phaser.Scene {
  constructor() {
    super("levelTwoSuccess");
  }

  create(){
    this.haloHalo = this.add.image(0, this.game.renderer.height/2, 'halo2xMenu').setInteractive()
    this.achievement = new Recipe(this, this.haloHalo)
    recipes.push('halo2x')
    this.haloHalo.on('pointerdown', function() {
      this.scene.stop()
      this.scene.resume('levelTwo')
    } , this);
  }
}

class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create(){
    this.gameOver = this.add.image(0, this.game.renderer.height/2, 'gameOver')
    new BoinkyTransition(this, this.gameOver, this.game.renderer.width/2, 3000, [1.5, 0.5])

    gameOver.play()

    this.time.delayedCall(3300, function() {
      let tryAgain = this.add.image(this.game.renderer.width/2, this.gameOver.y + 100, 'tryAgain').setScale(0.5)
      tryAgain.setInteractive()
      tryAgain.on('pointerdown', function() {
        if (recipes.includes('key')) {
          recipes.pop()
        }
        click.play()
        this.scene.stop()
        this.scene.start(currentLevel)
      } , this);
    }, [], this)
  }
}
  
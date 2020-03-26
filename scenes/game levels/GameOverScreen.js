class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create(){
    this.gameOver = this.add.image(0, this.game.renderer.height/2, 'gameOver').setDepth(3)
    this.tweens.add({
      targets: this.gameOver,
      x: this.game.renderer.width/2,
      duration: 3000,
      ease: 'Elastic',
      easeParams: [ 1.5, 0.5 ],
      delay: 0
    });

    let gameOver =  this.sound.add('gameOverSound', { loop: false})
    gameOver.play()

    this.time.delayedCall(3300, function() {
      let tryAgain = this.add.image(this.game.renderer.width/2, this.gameOver.y + 100, 'tryAgain').setScale(0.5)
      tryAgain.setInteractive()
      tryAgain.on('pointerdown', function() {
        this.scene.stop()
        this.scene.start(currentLevel)
      } , this);
    }, [], this)
  }
}
  
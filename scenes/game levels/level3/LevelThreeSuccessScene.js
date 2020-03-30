class LevelThreeSuccess extends Phaser.Scene {
  constructor() {
    super("levelThreeSuccess");
  }

  create(){
    lvl3.stop()
    let certificateSound =  this.sound.add('lastRoundSound', { loop: false})
    certificateSound.play()

    this.certificate = this.add.image(0, this.game.renderer.height/2 + 30, 'certificate').setInteractive()
    new SlideTransition(this, this.certificate, 1000)

    this.time.delayedCall(1000, function() {
    
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 170, 'congrats')

      this.sparkle = this.add.sprite(this.game.renderer.width/2, this.game.renderer.height/2 + 40, 'sparkles').setDepth(2).setScale(1)
      this.sparkle.play('sparkle')
      this.time.delayedCall(1000, () =>this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 + 200, 'continue'), [], this)
    }, [], this)

    
    this.certificate.on('pointerdown', function() {
      this.scene.stop()
      this.scene.resume('levelThree')
    } , this);
  }
}

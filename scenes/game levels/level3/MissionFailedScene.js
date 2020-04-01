class MissionFailedScene extends Phaser.Scene {
    constructor() {
      super("missionFailed");
    }
  
    create(){
      this.missionFailed = this.add.image(0, this.game.renderer.height/2, 'missionFailed')
      new BoinkyTransition(this, this.missionFailed, this.game.renderer.width/2, 3000, [1.5, 0.5])
      lvl3.pause()
      gameOverSound.play()
  
      this.time.delayedCall(3300, function() {
        let tryAgain = this.add.image(this.game.renderer.width/2, this.missionFailed.y + 100, 'tryAgain').setScale(0.5)
        tryAgain.setInteractive()
        tryAgain.on('pointerdown', function() {
          click.play()
          this.scene.stop()
          this.scene.start(currentLevel)
        } , this);
      }, [], this)
    }
  }
    
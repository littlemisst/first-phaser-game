let situation2
class LevelTwoTutorial extends Phaser.Scene {
  constructor() {
      super('levelTwoTutorial')
  }
  
  create() {
    this.scene.pause('levelTwo')
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
   
   situation2 = this.add.image(0, this.game.renderer.height / 2, 'situation2')
    new SlideTransition(this, situation2, 800)

    this.time.delayedCall(1000, function(){
        this.situation()
      }, [], this)
  }

  situation() {
    this.start = this.add.image(this.game.renderer.width / 2 + 170, this.game.renderer.height / 2 + 120, 'start').setInteractive()
    this.start.on('pointerdown', function() {
      this.scene.stop()
      this.scene.resume('levelTwo')
    }, this)
  }
  
}
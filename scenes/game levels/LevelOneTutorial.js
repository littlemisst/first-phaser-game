let tutorial1, tutorial2
class LevelOneTutorial extends Phaser.Scene {
  constructor() {
      super('levelOneTutorial')
  }
  
  create() {
    this.scene.pause('levelOne')
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
   
    tutorial1 = this.add.image(0, this.game.renderer.height / 2, 'tutorial1').setInteractive()
    tutorial1.on('pointerdown', ()=> this.tutorialTwo())
    new SlideTransition(this, tutorial1, 800)

  }

  tutorialTwo() {
    tutorial1.destroy()
    tutorial2 =  this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'tutorial2').setInteractive()
    tutorial2.on('pointerdown', () => this.situation())
  }

  situation() {
    tutorial2.destroy()
    this.situation = this.add.image(this.game.renderer.width / 2, this.game.renderer.height/2, 'situation1').setInteractive()
  
    this.start = this.add.image(this.game.renderer.width / 2 + 170, this.game.renderer.height / 2 + 120, 'start').setInteractive()
    this.start.on('pointerdown', function() {
      this.scene.stop()
      this.scene.resume('levelOne')
    }, this)
  }
  
}
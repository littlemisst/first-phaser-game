let situation3

class LevelThreeTutorial extends Phaser.Scene {
  constructor() {
      super('levelThreeTutorial')
  }
  
  create() {
    this.scene.pause('levelThree')
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
   
    situation3 = this.add.image(0, this.game.renderer.height / 2, 'situation3').setInteractive()
    new SlideTransition(this, situation3, 800)

    situation3.on('pointerdown', ()=> this.levelThreeGoal())

  }

  levelThreeGoal() {
    situation3.destroy()
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'goal3')
    this.start = this.add.image(this.game.renderer.width / 2 + 170, this.game.renderer.height / 2 + 120, 'start').setInteractive()
    this.start.on('pointerdown', function() {
      this.scene.stop()
      this.scene.resume('levelThree')
    }, this)
   
  }
}
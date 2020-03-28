class LevelOneTutorial extends Phaser.Scene {
  constructor() {
      super('levelOneTutorial')
  }
  
  create() {
    this.base = new MainGameScene(this)
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
    this.tutorial = this.add.image(0, this.game.renderer.height / 2, 'tutorial1').setInteractive()
    
    new SlideTransition(this, this.tutorial, 800)
    this.time.delayedCall(1000, function(){
       this.tutorial.on('pointerdown', ()=>
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'tutorial2'))
        this.time.delayedCall(800, function() {
          this.start = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height / 2 + 70, 'start').setInteractive()
          this.start.on('pointerdown', ()=> this.scene.switch('levelOne'))
        },[], this)
      
    }, [], this)
    
  }
}
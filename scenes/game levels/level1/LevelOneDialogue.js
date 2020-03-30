let frame1, frame2, frame3, frame4, frame5, charFrame1, charFrame2, charFrame3, charFrame4, go

class LevelOneDialogue extends Phaser.Scene {
  constructor() {
    super('levelOneDialogue');
  }

  create() {
    this.base = new MainGameScene(this)
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
    
    charFrame1 = this.add.sprite(0, this.game.renderer.height - 140, "lvl1CharFrame1")
    new BoinkyTransition(this, charFrame1, 200, 2000, [2.0, 0.5])
    this.time.delayedCall(800, function(){
      this.skip = this.add.sprite(80, 50, "skip").setInteractive()
      this.skip.on('pointerdown', ()=> this.scene.start('levelOne'))

      frame1 = this.add.sprite(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 50, "lvl1frame1").setInteractive()
      frame1.on('pointerdown', ()=> this.frameTwo())
    }, [], this)
    
  }

  frameTwo() {
    charFrame1.destroy()
    charFrame2 = this.add.sprite(200, this.game.renderer.height - 140, "lvl1CharFrame2")
    frame2 = this.add.sprite(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 50, "lvl1frame2").setInteractive()
    frame2.on('pointerdown', ()=> this.frameThree())
  }

  frameThree() {
    frame3 = this.add.sprite(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 50, "lvl1frame3").setInteractive()
    frame3.on('pointerdown', ()=> this.frameFour())
  }

  frameFour() {
    charFrame2.destroy()
    charFrame3 = this.add.sprite(200, this.game.renderer.height - 140, "lvl1CharFrame3")
    frame4 = this.add.sprite(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 50, "lvl1frame4").setInteractive()
    frame4.on('pointerdown', ()=> this.frameFive())
  }

  frameFive() {
    charFrame3.destroy()
    charFrame4 = this.add.sprite(200, this.game.renderer.height - 140, "lvl1CharFrame4")
    frame5 = this.add.sprite(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 50, "lvl1frame5").setInteractive()
    this.time.delayedCall(1000, function(){
      go = this.add.sprite(this.game.renderer.width - 170, this.game.renderer.height - 50, "go").setInteractive()
      go.on('pointerdown', ()=> this.scene.start('levelOne'))
    }, [], this)
  }
}
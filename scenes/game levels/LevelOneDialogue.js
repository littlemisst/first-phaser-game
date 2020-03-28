class LevelOneDialogue extends Phaser.Scene {
  constructor() {
    super('levelOneDialogue');
  }

  create() {
    background = this.add.image(0, 0, "mainBg").setDepth(0).setAlpha(0.5)
    background.setOrigin(0, 0);

    this.backgroundBorder = this.add.image(0, 0, "mainBgBorder").setDepth(2);
    this.backgroundBorder.setOrigin(0, 0);

    this.dialogue = this.add.sprite(0, this.game.renderer.height / 2, "dialogue1")
    new SlideTransition(this, this.dialogue, 500)
  
    this.time.delayedCall(500, function(){
      this.dialogue.play('firstDialogue')
      
      this.skip = this.add.image(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2 + 100, 'skip').setInteractive()
      this.skip.on('pointerdown', ()=> this.scene.switch('levelOneTutorial'))

      this.time.delayedCall(2500, function() {
        this.next = this.add.image(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 + 100, 'next').setInteractive()
        this.next.on('pointerdown', () => this.scene.switch('levelOneTutorial'))
      }, [], this)
    }, [], this)
    
  }
}
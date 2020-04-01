class KeyReceived extends Phaser.Scene {
  constructor() {
    super("keyReceived");
  }

  create() {
    recipes.push('key')
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
    this.key = this.add.image(0, this.game.renderer.height / 2, "key").setInteractive();

    new SlideTransition(this, this.key, 2000)

    
    this.time.addEvent({
      delay: 2000,
      callback: function() {
        this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 - 120, 'keyReceived')
        this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 + 120, 'continue')
        this.confetti = this.add.sprite(this.game.renderer.width/2, this.game.renderer.height/2, 'confetti')
        this.confetti.play('confettiDrop')
        lvl3.pause()
        let keyReceivedSound =  this.sound.add('keyReceivedSound', { loop: false})
        keyReceivedSound.play()
      },
      callbackScope: this,
      loop: false
    });
    this.key.on(
      "pointerdown",
      function() {
        click.play()
        this.scene.stop();
        this.scene.resume("levelThree");
        specialVillager.removeInteractive();
        lvl3.resume()
      },
      this
    );
  }
}

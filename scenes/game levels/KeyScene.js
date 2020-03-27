class KeyReceived extends Phaser.Scene {
  constructor() {
    super("keyReceived");
  }

  create() {
    recipes.push('key')
    this.add.image(0, 0, 'pangtabon').setOrigin(0, 0)
    this.key = this.add.image(0, this.game.renderer.height / 2, "key").setInteractive();

    new SlideTransition(this, this.key, 3000)

    this.time.addEvent({
      delay: 2000,
      callback: function() {
        this.confetti = this.add.sprite(this.game.renderer.width/2, this.game.renderer.height/2, 'confetti')
        this.confetti.play('confettiDrop')
      },
      callbackScope: this,
      loop: false
    });
    this.key.on(
      "pointerdown",
      function() {
        this.scene.stop();
        this.scene.resume("levelThree");
      },
      this
    );
  }
}

class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
  }
  
  create() {
    this.background = this.add.image(0,0,'background').setDepth(0)
    this.background.setOrigin(0,0)

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logoMainScreen').setDepth(1)
   
    this.playButtonHere()
    this.shopButtonHere()
    this.soundButtonHere()
    this.updateAudio()
  }

  playButtonHere() {
    this.playButton = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height /2, 'play').setDepth(1).setInteractive()
    this.playButton.on('pointerdown', function() {
      click.play()
      this.scene.switch('mainGameLevels')}, this);
  }
  shopButtonHere() {
    this.shopButton = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height /2 + 100, 'shop').setDepth(1).setInteractive()
    this.shopButton.on('pointerdown', function() {
      click.play()
      this.scene.switch('shop')}, this);
  }

  soundButtonHere() {
    this.musicOn = true;
    this.soundButton = this.add.image(this.game.renderer.width / 2 + 320, this.game.renderer.height /2 + 250, 'soundOn').setDepth(1).setInteractive()
    this.soundButton.on(
      "pointerdown",
      function() {
        this.musicOn = !this.musicOn;
        this.updateAudio();
      }.bind(this)
    );
  }

  updateAudio() {
    if (this.musicOn === false) {
      this.soundButton.setTexture("soundOff");
      music.pause();
    } else {
      this.soundButton.setTexture("soundOn");
      music.resume();
    }
  }

}

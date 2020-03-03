globalThis.coins = 10000

class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
  }

  preload() {
    this.load.image(
      "background",
      "./../scenes/assets/background.jpg"
    );
    this.load.image('logoMainScreen', './../scenes/assets/logo-for-main-screen.png' )
    this.load.image('play', './../scenes/assets/play-logo.png')
    this.load.image('shop', './../scenes/assets/shop-logo.png')
    this.load.image('cookBook', './../scenes/assets/cookbooklogo.png')
    this.load.image("soundOn", "./../scenes/assets/soundOn.png");
    this.load.image("soundOff", "./../scenes/assets/soundOff.png");
  }

  create() {
    this.background = this.add.image(0,0,'background').setDepth(0)
    this.background.setOrigin(0,0)

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logoMainScreen').setDepth(1)
   
    this.playButtonHere()
    this.shopButtonHere()
    this.cookBookButtonHere()
    this.soundButtonHere()
    this.updateAudio()
    // this.creditsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 180, 'credits').setDepth(1)
  }

  playButtonHere() {
    this.playButton = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height /2, 'play').setDepth(1).setInteractive()
    this.playButton.on('pointerdown', () => this.scene.switch('mainGameLevels'), this);
  }
  shopButtonHere() {
    this.shopButton = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height /2 + 100, 'shop').setDepth(1).setInteractive()
    this.shopButton.on('pointerdown', () => this.scene.switch('shop'), this);
  }
  cookBookButtonHere() {
    this.cookBookButton = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height /2 + 200, 'cookBook').setDepth(1).setInteractive()
    this.cookBookButton.on('pointerdown', () => this.scene.switch('cookBook'), this);
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

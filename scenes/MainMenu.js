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
    this.load.image('playButton', './../scenes/assets/play-logo.png' )
    this.load.image('optionsButton', './../scenes/assets/options-logo.png' )
    this.load.image('creditsButton', './../scenes/assets/credits-logo.png' )
  }

  create() {
    this.background = this.add.image(0,0,'background').setDepth(0)
    this.background.setOrigin(0,0)

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logoMainScreen').setDepth(1)
    this.playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, 'playButton').setDepth(1)
    this. optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 90, 'optionsButton').setDepth(1)
    this.creditsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 180, 'creditsButton').setDepth(1)

    this.playButton.setInteractive()

    this.playButton.on('pointerdown', () => this.scene.start('mainGame'));
  }

  
}

class MainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }

  preload() {
    this.load.image("background", "./../scenes/assets/background.jpg");
  }

  create() {
    this.background = this.add.image(0, 0, "background").setDepth(0);
    this.background.setOrigin(0, 0);
  }
}

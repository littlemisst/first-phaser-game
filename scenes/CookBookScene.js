class CookBookScene extends Phaser.Scene {
  constructor() {
    super("cookBook");
  }
  preload() {
    this.load.image("cookBookBg", "./../scenes/assets/cookbookmenu.jpg");
    this.load.image("back", "./../scenes/assets/back.png");
  }
  create() {
    this.background = this.add.image(0, 0, "cookBookBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.back = this.add.image(this.game.renderer.width - 100, this.game.renderer.height - 30, "back").setScale(0.8).setDepth(1).setInteractive()
    this.back.on('pointerdown', () => this.scene.switch('mainMenu'), this)
  }
}

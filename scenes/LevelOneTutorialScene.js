class LevelOneTutorial extends Phaser.Scene {
  constructor() {
    super("levelOneTutorial");
  }
  preload() {
    this.load.image("tutorialBg", "./../scenes/assets/tutorialBg.jpg");
  }
  create(){
    this.background = this.add.image(0, 0, "tutorialBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.input.on('pointerdown', () => this.scene.switch('levelOne'), this);
  }
}

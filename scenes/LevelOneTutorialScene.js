class LevelOneTutorial extends Phaser.Scene {
  constructor() {
    super("levelOneTutorial");
  }
  preload() {
    this.load.image("tutorialBg", "./../scenes/assets/tutorialBg.jpg");
    this.load.spritesheet("villagerOne", "./../scenes/assets/villager1.png", {
      frameWidth: 37,
      frameHeight: 60
    });
    this.load.spritesheet("villagerTwo", "./../scenes/assets/villager2.png", {
      frameWidth: 35,
      frameHeight: 57
    });
    this.load.image("potatoKwekKwek", "./../scenes/assets/potatoKwekKwek.png");
    this.load.image("kamoteLumpia", "./../scenes/assets/kamoteLumpia.png");
    this.load.image("angry", "./../scenes/assets/angry.png");
    this.load.image(
      "potatoKwekKwekMenu",
      "./../scenes/assets/menuPotatoKwekKwek.png"
    );
    this.load.image(
      "kamoteLumpiaMenu",
      "./../scenes/assets/menuKamoteLumpia.png"
    );
  }
  create(){
    this.background = this.add.image(0, 0, "tutorialBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.input.on('pointerdown', () => this.scene.switch('levelOne'), this);
  }
}

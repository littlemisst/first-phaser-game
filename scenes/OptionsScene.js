class OptionsScene extends Phaser.Scene {
  constructor() {
    super("optionsScene");
  }

  preload() {
    this.load.image(
      "optionMainScreen",
      "./../scenes/assets/options-for-main-screen.png"
    );
    this.load.image("musicButton", "./../scenes/assets/music-logo.png");
    this.load.image("checkBox", "./../scenes/assets/checked_checkbox.png");
    this.load.image("uncheckBox", "./../scenes/assets/unchecked_checkbox.png");
    this.load.image("back", "./../scenes/assets/back.png");
  }

  create() {
    this.background = this.add.image(0, 0, "background").setDepth(0);
    this.background.setOrigin(0, 0);

    this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.2,
        "optionMainScreen"
      )
      .setDepth(1);

    this.musicOn = true;

    this.musicOnCheck = this.add.image(
      this.game.renderer.width / 2 - 125,
      this.game.renderer.height / 2,
      "checkBox"
    );
    this.musicButton = this.add.image(
      this.game.renderer.width / 2 + 50,
      this.game.renderer.height / 2,
      "musicButton"
    );

    this.musicOnCheck.setInteractive();

    this.musicOnCheck.on(
      "pointerdown",
      function() {
        this.musicOn = !this.musicOn;
        this.updateAudio();
      }.bind(this)
    );

    this.back = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 + 150,
      "back"
    );
    this.back.setInteractive();
    this.back.on("pointerdown", ()=> 
      this.scene.start("mainMenu")
    );

    this.updateAudio();
  }

  updateAudio() {
    if (this.musicOn === false) {
      this.musicOnCheck.setTexture("uncheckBox");
      music.pause();
    } else {
      this.musicOnCheck.setTexture("checkBox");
      music.resume();
    }
  }
}

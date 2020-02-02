let villager1, villager2, timedEvent, villagers;
class MainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }

  preload() {
    this.load.image("mainBg", "./../scenes/assets/main screen bg.jpg");
    this.load.image("mainCharacter", "./../scenes/assets/cart.png");
    this.load.spritesheet("villagerOne", "./../scenes/assets/villager1.png", {
      frameWidth: 37,
      frameHeight: 60
    });
    this.load.spritesheet("villagerTwo", "./../scenes/assets/villager2.png", {
      frameWidth: 36,
      frameHeight: 58
    });
  }

  create() {
    this.background = this.add.image(0, 0, "mainBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.character = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 + 100,
      "mainCharacter"
    );
    this.character.setScale(0.8, 0.8);

    // villager1 = this.physics.add
    //   .sprite(
    //     this.game.renderer.width,
    //     this.game.renderer.height / 2 + 180,
    //     "villagerOne"
    //   )
    //   .setScale(1.8);
    // villager2 = this.physics.add
    //   .sprite(0, this.game.renderer.height / 2 + 180, "villagerTwo")
    //   .setScale(1.8);

    this.anims.create({
      key: "villager1",
      frames: this.anims.generateFrameNumbers("villagerOne", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "villager2",
      frames: this.anims.generateFrameNumbers("villagerTwo", {
        start: 0,
        end: 3,
        first: 0
      }),
      frameRate: 6,
      repeat: -1
    });

    this.villagers = this.add.group();
    this.time.addEvent({
      delay: 20000,
      callback: function() {
        let villager = new VillagerOne(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180
        );
        this.villagers.add(villager);
      },
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 10000,
      callback: function() {
        let villager = new VillagerTwo(
          this,
          0,
          this.game.renderer.height / 2 + 180
        );
        this.villagers.add(villager);
      },
      callbackScope: this,
      loop: true
    });
  }

}

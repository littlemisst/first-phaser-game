let character, foodOrders, villagers, score, menu, foodMenu;
class MainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }
  preload() {
    this.load.image("mainBg", "./../scenes/assets/main screen bg.jpg");
    this.load.image("mainBgBorder", "./../scenes/assets/mainScreenBorder.png");
    this.load.image("mainCharacter", "./../scenes/assets/cart.png");
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

  create() {
    score = 0;
    this.background = this.add.image(0, 0, "mainBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.backgroundBorder = this.add.image(0, 0, "mainBgBorder").setDepth(2);
    this.backgroundBorder.setOrigin(0, 0);

    this.menuList = ["potatoKwekKwekMenu", "kamoteLumpiaMenu"];
    foodMenu = this.add.group();
    let initialPos = 62;

    for (let i = 0; i < this.menuList.length; i++) {
      let currentPos = initialPos;
      menu = this.add
        .image(currentPos, 60, this.menuList[i])
        .setDepth(2)
        .setScale(0.5);
      initialPos += 90;
      menu.setName(this.menuList[i]);
      foodMenu.add(menu);
      // menu.setInteractive();
    }
    foodMenu.children.each(function(food) {
      food.setInteractive();
      food.on(
        "pointerdown",
        function(pointer) {
          let newFood = this.add
            .image(pointer.x, pointer.y, food.name)
            .setDepth(2)
            .setScale(0.5)
            .setInteractive({ draggable: true })
            .setName(food.name)
        },
        this
      );
    }, this);

    this.input.on("drag", function(pointer, obj, dragX, dragY) {
      obj.setPosition(dragX, dragY);
    });

    this.input.on("drop", function(pointer, obj, dropZone) {
      console.log("menu name " + obj.name);
      console.log("dropzone name " + dropZone.name);
      if (obj.name === dropZone.name) {
        obj.x = dropZone.x;
        obj.y = dropZone.y;
        obj.input.enabled = false;
        score += 10;
        obj.destroy();
        dropZone.destroy()
        console.log("right " + score);
      } else if (obj.name != dropZone.name) {
        console.log("engggg");
        obj.destroy()
        dropZone.destroy()
        score -= 10;
        console.log("minus" + score);
      }

      // obj.destroy();
    });

    character = this.physics.add
      .sprite(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 100,
        "mainCharacter"
      )
      .setScale(0.8, 0.8)
      .setInteractive();
    // character.input.dropZone = true;
    // this.input.on('gameobjectdown', function() {
    //   this.score += 10
    //   console.log(this.score)
    // }, this)
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

    villagers = this.add.group();
    foodOrders = this.add.group();

    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 15000),
      callback: function() {
        let villager = new VillagerFromRight(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180
        );
        villager.setDepth(1).setInteractive();
        villagers.add(villager);
      },
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 15000),
      callback: function() {
        let villager = new VillagerFromLeft(
          this,
          0,
          this.game.renderer.height / 2 + 180
        );
        villager.flipX = true;
        villager.setDepth(1).setInteractive();
        villagers.add(villager);
      },
      callbackScope: this,
      loop: true
    });

    // this.physics.add.collider(foodOrders, character, this.collides, null, this);
  }

  // collides(food, character) {
  //   score += 10
  //   console.log(score);
  // }
}

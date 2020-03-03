let character,
  foodOrders,
  villagers,
  goal,
  menu,
  foodMenu,
  mainProgressBar,
  mainProgressBarMask,
  menuList,
  enemyProgressBar,
  enemyProgressBarMask;

globalThis.score = 0
class LevelOne extends Phaser.Scene {
  constructor() {
    super("levelOne");
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
    this.load.image(
      "fullProgressBar",
      "./../scenes/assets/fullprogressbar.png"
    );
    this.load.image(
      "emptyProgressBar",
      "./../scenes/assets/emptyprogressbar.png"
    );
    this.load.image(
      "competitorProgressBar",
      "./../scenes/assets/competitor.png"
    );
    this.load.image("character", "./../scenes/assets/charLogo.png");
    this.load.image("enemy", "./../scenes/assets/enemy.png");
    this.load.image("back", "./../scenes/assets/back.png");
  }

  create() {
    goal = 360;
    this.back = this.add.image(this.game.renderer.width - 35, this.game.renderer.height - 30, "back").setScale(0.4).setDepth(3).setInteractive()
    this.back.on('pointerdown', () => this.scene.switch('mainMenu'), this)
    
    this.background = this.add.image(0, 0, "mainBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.backgroundBorder = this.add.image(0, 0, "mainBgBorder").setDepth(2);
    this.backgroundBorder.setOrigin(0, 0);

    this.mainProgressBar = this.add
      .image(
        this.game.renderer.width - 55,
        this.game.renderer.height / 2 + 100,
        "fullProgressBar"
      )
      .setDepth(2);

    mainProgressBar = this.add
      .image(
        this.game.renderer.width - 55,
        this.game.renderer.height / 2 + 100,
        "emptyProgressBar"
      )
      .setDepth(2);
    mainProgressBarMask = this.add
      .image(
        this.game.renderer.width - 55,
        this.game.renderer.height / 2 + 100,
        "emptyProgressBar"
      )
      .setDepth(2);
    mainProgressBarMask.visible = false;
    mainProgressBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      mainProgressBarMask
    );

    this.characterLogo = this.add
      .image(
        this.game.renderer.width - 55,
        this.game.renderer.height / 2 + 240,
        "character"
      )
      .setDepth(2)
      .setScale(0.4);

    this.enemyBackgroundProgressBar = this.add
      .image(
        this.game.renderer.width - 20,
        this.game.renderer.height / 2 + 100,
        "competitorProgressBar"
      )
      .setDepth(2);

    enemyProgressBar = this.add
      .image(
        this.game.renderer.width - 20,
        this.game.renderer.height / 2 + 100,
        "emptyProgressBar"
      )
      .setDepth(2);

    enemyProgressBarMask = this.add
      .image(
        this.game.renderer.width - 20,
        this.game.renderer.height / 2 + 100,
        "emptyProgressBar"
      )
      .setDepth(2);
    enemyProgressBarMask.visible = false;
    enemyProgressBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      enemyProgressBarMask
    );

    this.enemyLogo = this.add
      .image(
        this.game.renderer.width - 20,
        this.game.renderer.height / 2 + 240,
        "enemy"
      )
      .setDepth(2)
      .setScale(0.4);

    this.time.addEvent({
      delay: Phaser.Math.Between(3000, 5000),
      callback: function() {
        let randomProgress = Phaser.Math.Between(5, 8);
        enemyProgressBarMask.y -= randomProgress;
      },
      callbackScope: this,
      loop: true
    });

    menuList = ["potatoKwekKwekMenu", "kamoteLumpiaMenu"];
    foodMenu = this.add.group();
    let initialPos = 62;

    for (let i = 0; i < menuList.length; i++) {
      let currentPos = initialPos;
      menu = this.add
        .image(currentPos, 60, menuList[i])
        .setDepth(1)
        .setScale(0.5);
      initialPos += 90;
      menu.setName(menuList[i]);
      foodMenu.add(menu);
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
            .setName(food.name);
        },
        this
      );
    }, this);

    this.input.on("drag", function(pointer, obj, dragX, dragY) {
      obj.setPosition(dragX, dragY);
    });

    this.input.on("drop", function(pointer, obj, dropZone) {
      if (obj.name === dropZone.name) {
        obj.x = dropZone.x;
        obj.y = dropZone.y;
        obj.input.enabled = false;
        coins += 1
        obj.destroy();
        dropZone.destroy();
        score += 5;
        console.log(score)
        if (score < goal) {
          mainProgressBarMask.y -= 8;
        }
      } else if (obj.name != dropZone.name) {
        obj.destroy();
        dropZone.destroy();
        score -= 5;
        mainProgressBarMask.y += 8;
      }
    });
    if (score > 10) {
      this.scene.sleep('levelOne')
      console.log(score)
    }

    character = this.physics.add
      .sprite(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 100,
        "mainCharacter"
      )
      .setScale(0.8, 0.8)
      .setInteractive();

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
  }
}

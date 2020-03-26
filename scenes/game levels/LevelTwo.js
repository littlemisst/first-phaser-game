


class LevelTwo extends Phaser.Scene {
  constructor() {
    super('levelTwo');
  }

  create() {
    this.menuList = ["potatoKwekKwekMenu", "kamoteLumpiaMenu", "putoCheeseMenu"];
    villagers = this.add.group()
    foodMenu = this.add.group()
    demands = this.add.group()
    foodOrders = this.add.group()
    complaints = this.add.group()
    score = 0
    goal = 300

    this.baseScene = new MainGameScene(this)

    //progress bar for main character
    emptyProgressBar = this.add
    .image(
      this.game.renderer.width - 55,
      this.game.renderer.height / 2 + 100,
      "emptyProgressBar"
    )
    .setDepth(2);

    fullProgressBarMask = this.add
    .image(
      this.game.renderer.width - 55,
      this.game.renderer.height / 2 + 100,
      "emptyProgressBar"
    )
    .setDepth(2);

    fullProgressBarMask.visible = false;
    emptyProgressBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      fullProgressBarMask
    );

    //enemy progress bar
    this.enemyProgressBar = this.add
    .image(
      this.game.renderer.width - 20,
      this.game.renderer.height / 2 + 100,
      "enemyEmptyProgressBar"
    )
    .setDepth(2);

    this.enemyProgressBarMask = this.add
    .image(
      this.game.renderer.width - 20,
      this.game.renderer.height / 2 + 100,
      "enemyEmptyProgressBar"
    )
    .setDepth(2);
    this.enemyProgressBarMask.visible = false;
    this.enemyProgressBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.enemyProgressBarMask
    );

    this.enemyProgress = this.time.addEvent({
      delay: Phaser.Math.Between(4000, 5000),
      callback: function() {
        let randomProgress = Phaser.Math.Between(5, 9);
        this.enemyProgressBarMask.y -= randomProgress;
      },
      callbackScope: this,
      loop: true
    });

    //food to be sold
    this.foodMenuDisplay = new FoodMenu(this, this.menuList, foodMenu, menu, demands);

    this.input.on("drag", function(pointer, obj, dragX, dragY) {
      obj.setPosition(dragX, dragY);
    }, this);

    this.input.on("drop", function(pointer, obj, dropZone) {
      if (obj.name === dropZone.name) {
        obj.x = dropZone.x;
        obj.y = dropZone.y;
        obj.input.enabled = false;
        coins += 1
        obj.destroy();
        dropZone.destroy();
        score += 10;
        
        if (score < goal) {
          fullProgressBarMask.y -= 10
        }
        if (score > goal) {
          this.scene.pause();
          villagers.children.each((villager) => villager.destroy())
          foodMenu.children.each((menu) => menu.destroy())
          demands.children.each((demand) => demand.destroy())
          foodOrders.children.each((food) => food.destroy())
          complaints.children.each((complain) => complain.destroy())
          character.destroy()
          enemy.destroy()
          background.setAlpha(0.5)
          this.rightVillagersEvent.remove()
          this.leftVillagersEvent.remove()
          this.enemyProgress.remove()
          this.scene.launch('levelOneSuccess')
          this.time.addEvent({
            delay: 100,
            callback: function() {
              this.scene.switch('mainGameLevels')
            },
            callbackScope: this,
            loop: false
          });
          
        }
      } else if (obj.name != dropZone.name) {
        obj.destroy();
        dropZone.destroy();
        score -= 5;
      }
    }, this);

    this.rightVillagersEvent = this.time.addEvent({
      delay: Phaser.Math.Between(5000, 15000),
      callback: function() {
        let villager = new VillagerFromRight(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180,
          2
        );
        villagers.add(villager)
        villager.setDepth(1).setInteractive();
      },
      callbackScope: this,
      loop: true
    });

    this.leftVillagersEvent = this.time.addEvent({
      delay: Phaser.Math.Between(5000, 15000),
      callback: function() {
        let villager = new VillagerFromLeft(
          this,
          0,
          this.game.renderer.height / 2 + 180,
          2
        );
        villagers.add(villager)
        villager.flipX = true;
        villager.setDepth(1).setInteractive();
      },
      callbackScope: this,
      loop: true
    });

  }
}


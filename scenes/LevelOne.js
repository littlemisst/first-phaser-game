let goal,
  emptyProgressBar,
  fullProgressBarMask,
  menuList,
  enemyProgressBar,
  enemyProgressBarMask,
  menu, foodMenu


menuList = ["potatoKwekKwekMenu", "kamoteLumpiaMenu"];
globalThis.score = 0

class LevelOne extends Phaser.Scene {
  constructor() {
    super('levelOne');
  }

  create() {
    goal = 20
    new MainGameScene(this)

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

    this.time.addEvent({
      delay: Phaser.Math.Between(3000, 5000),
      callback: function() {
        let randomProgress = Phaser.Math.Between(5, 8);
        enemyProgressBarMask.y -= randomProgress;
      },
      callbackScope: this,
      loop: true
    });

    //food to be sold
    new FoodMenu(this, menuList, foodMenu, menu);

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
          fullProgressBarMask.y -= 10
        }
      } else if (obj.name != dropZone.name) {
        obj.destroy();
        dropZone.destroy();
        score -= 5;
        fullProgressBarMask.y += 10
      }
    });

    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 15000),
      callback: function() {
        let villager = new VillagerFromRight(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180,
          1
        );
        villager.setDepth(1).setInteractive();
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
          this.game.renderer.height / 2 + 180,
          1
        );
        villager.flipX = true;
        villager.setDepth(1).setInteractive();
      },
      callbackScope: this,
      loop: true
    });
  }
}


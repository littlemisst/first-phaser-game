class LevelOne extends Phaser.Scene {
  constructor() {
    super('levelOne');
  }

  create() {
    currentLevel = 'levelOne'
    menuList = ["potatoKwekKwekMenu", "kamoteLumpiaMenu"];
    villagers = this.add.group()
    foodMenu = this.add.group()
    demands = this.add.group()
    foodOrders = this.add.group()
    complaints = this.add.group()
    enemyPointsGained = this.add.group()
    score = 0
    enemyScore = 0

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

    let randomProgress = Phaser.Math.Between(200, 250);
    this.enemyProgress = this.time.addEvent({
      delay: Phaser.Math.Between(3000, 5000),
      callback: function() {
        this.enemyProgressBarMask.y -= randomProgress;

        let randomX = Phaser.Math.Between(enemy.x - 90, enemy.x + 90);
        let enemyPoints = this.add.sprite(randomX, enemy.y - 100, "enemyPoints").setScale(0.8)
        enemyPoints.play('enemyScores')
        enemyPointsGained.add(enemyPoints)

        let soundFx =  this.sound.add('enemyScore', { loop: false})
        soundFx.play()

        enemyScore += randomProgress
        console.log(enemyScore)

        if (enemyScore >= goal) {
          this.scene.pause();
          new RemoveEntities(this)
          this.rightVillagersEvent.remove()
          this.leftVillagersEvent.remove()
          this.enemyProgress.remove()
          this.scene.launch('gameOver')
        }
        this.time.delayedCall(800,()=>enemyPoints.destroy(), [], this)
      },
      callbackScope: this,
      loop: true
    });

    //food to be sold
    this.foodMenuDisplay = new FoodMenu(this, menuList, foodMenu, food, demands);

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
        timerEvent.remove()

        let eat =  this.sound.add('eatSound', { loop: false})
        eat.play()

        score += 280;
        console.log(score)
        
        if (score <= goal) {
          fullProgressBarMask.y -= 10
        }
        if (score > goal) {
          this.scene.pause();
          new RemoveEntities(this)
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
      delay: Phaser.Math.Between(5000, 10000),
      callback: function() {
        let villager = new VillagerFromRight(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180,
          1
        );
        villagers.add(villager)
        villager.setDepth(1).setInteractive();
      },
      callbackScope: this,
      loop: true
    });

    this.leftVillagersEvent = this.time.addEvent({
      delay: Phaser.Math.Between(5000, 10000),
      callback: function() {
        let villager = new VillagerFromLeft(
          this,
          0,
          this.game.renderer.height / 2 + 180,
          1
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


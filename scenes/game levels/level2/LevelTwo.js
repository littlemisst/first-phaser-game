class LevelTwo extends Phaser.Scene {
  constructor() {
    super('levelTwo');
  }

  create() {
    music.pause()
    lvl2.play()

    currentLevel = 'levelTwo'
    menuList = ["tubigMenu", "potatoKwekKwekMenu", "kamoteLumpiaMenu", "sagotGulamanMenu", "putoCheeseMenu"];
    score = 0
    enemyScore = 0
    point = 8
    ordersCount = Math.round(goal/point)
    let randomProgress = Phaser.Math.Between(7, 9);

    villagers = this.add.group()
    foodMenu = this.add.group()
    demands = this.add.group()
    foodOrders = this.add.group()
    complaints = this.add.group()
    enemyPointsGained = this.add.group()

    this.scene.launch('levelTwoTutorial')

    this.baseScene = new MainGameScene(this, lvl2)

    //progress bar for main character
    emptyProgressBar = this.add
    .image(
      this.game.renderer.width - 55,
      this.game.renderer.height / 2 + 40,
      "emptyProgressBar"
    )
    .setDepth(2);

    fullProgressBarMask = this.add
    .image(
      this.game.renderer.width - 55,
      this.game.renderer.height / 2 + 40,
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
      this.game.renderer.height / 2 + 40,
      "enemyEmptyProgressBar"
    )
    .setDepth(2);

    this.enemyProgressBarMask = this.add
    .image(
      this.game.renderer.width - 20,
      this.game.renderer.height / 2 + 40,
      "enemyEmptyProgressBar"
    )
    .setDepth(2);
    this.enemyProgressBarMask.visible = false;
    this.enemyProgressBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.enemyProgressBarMask
    );

    
    this.enemyProgress = this.time.addEvent({
      delay: Phaser.Math.Between(4000, 6000),
      callback: function() {
        this.enemyProgressBarMask.y -= randomProgress;

        let randomX = Phaser.Math.Between(enemy.x - 90, enemy.x + 90);
        let enemyPoints = this.add.sprite(randomX, enemy.y - 100, "enemyPoints").setScale(0.8)
        enemyPoints.play('enemyScores')
        enemyPointsGained.add(enemyPoints)

        soundFx.play()

        enemyScore += randomProgress

        if (enemyScore >= goal) {
          this.showGameOver()
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

        eat.play()

        score += point;
      
        ordersCount -= 1
        ordersCountText.setText(ordersCount)
        
        if (score < goal) {
          fullProgressBarMask.y -= point
        }
        if (score >= goal) {
          fullProgressBarMask.y -= point
          this.showSuccess()
        }
      } else if (obj.name != dropZone.name) {
        obj.destroy();
        dropZone.destroy();
        no.play()
      }
    
    }, this);

    this.rightVillagersEvent = this.time.addEvent({
      delay: Phaser.Math.Between(7000, 8000),
      callback: function() {
        let villager = new VillagerFromRight(
          this,
          this.game.renderer.width,
          this.game.renderer.height / 2 + 180,
          2
        );
        villagers.add(villager)
        villager.setDepth(1)
      },
      callbackScope: this,
      loop: true
    });

    this.leftVillagersEvent = this.time.addEvent({
      delay: Phaser.Math.Between(7000, 8000),
      callback: function() {
        let villager = new VillagerFromLeft(
          this,
          0,
          this.game.renderer.height / 2 + 180,
          2
        );
        villagers.add(villager)
        villager.flipX = true;
        villager.setDepth(1)
      },
      callbackScope: this,
      loop: true
    });
  }

  showGameOver() {
    this.scene.pause();
    new RemoveEntities(this)
    this.rightVillagersEvent.remove()
    this.leftVillagersEvent.remove()
    this.enemyProgress.remove()
    home.destroy()
    this.scene.launch('gameOver')
  }

  showSuccess() {
    this.scene.pause();
    new RemoveEntities(this)
    this.rightVillagersEvent.remove()
    this.leftVillagersEvent.remove()
    this.enemyProgress.remove()
    this.scene.launch('levelTwoSuccess')
    this.time.addEvent({
      delay: 100,
      callback: function() {
        this.scene.start('mainGameLevels')
      },
      callbackScope: this,
      loop: false
    });
  }
}


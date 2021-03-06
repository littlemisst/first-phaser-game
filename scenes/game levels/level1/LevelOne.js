class LevelOne extends Phaser.Scene {
  constructor() {
    super('levelOne');
  }

  create() {
    lvl1.play()
    music.pause()
    currentLevel = 'levelOne'
    menuList = ["tubigMenu", "potatoKwekKwekMenu", "kamoteLumpiaMenu"];
    score = 0
    enemyScore = 0
    point = 10
    ordersCount = Math.round(goal/point)
    let randomProgress = Phaser.Math.Between(9, 11);

    villagers = this.add.group()
    foodMenu = this.add.group()
    demands = this.add.group()
    foodOrders = this.add.group()
    complaints = this.add.group()
    enemyPointsGained = this.add.group()

    this.scene.launch('levelOneTutorial')
  
    this.baseScene = new MainGameScene(this, lvl1)

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

    enemyProgress = this.time.addEvent({
      delay: Phaser.Math.Between(5000, 6000),
      callback: function() {
        this.enemyProgressBarMask.y -= randomProgress;

        let randomX = Phaser.Math.Between(enemy.x - 90, enemy.x + 90);
        let enemyPoints = this.add.sprite(randomX, enemy.y - 100, "enemyPoints").setScale(0.8)
        enemyPoints.play('enemyScores')
        enemyPointsGained.add(enemyPoints)

        soundFx.play()

        enemyScore += randomProgress

        if (enemyScore >= goal) {
          new ShowGameOver(this, lvl1)
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
      if (dropZone.name === 'throw') {
        obj.destroy()
      } else {
        if (obj.name === dropZone.name) {
          obj.x = dropZone.x;
          obj.y = dropZone.y;
          obj.input.enabled = false;
          coins += 1
          obj.destroy();
          dropZone.destroy();
          timerEvent.remove(false)
  
          eat.play()
  
          score += point;
  
          ordersCount -= 1
          ordersCountText.setText(ordersCount)
          
          if (score < goal) {
            fullProgressBarMask.y -= point
          }
          if (score >= goal) {
            fullProgressBarMask.y -= point
            new ShowSuccess(this, 1, 'levelOneSuccess')
          }
        } else if (obj.name != dropZone.name) {
          obj.destroy();
          dropZone.destroy();
          no.play()
        }   
      }
      
    }, this);

    rightVillagersEvent = new CustomersEventTimer(this, Phaser.Math.Between(5000, 10000), 'right', 1 )
    leftVillagersEvent = new CustomersEventTimer(this, Phaser.Math.Between(5000, 10000), 'left', 1 )
  }

}


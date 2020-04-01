class LevelThree extends Phaser.Scene {
  constructor() {
    super('levelThree');
  }

  create() {
    lvl3.play()
    music.pause()
    currentLevel = 'levelThree'
    menuList = ["tubigMenu", "potatoKwekKwekMenu", "kamoteLumpiaMenu", "sagotGulamanMenu", "putoCheeseMenu", "halo2xMenu"];
    score = 0
    enemyScore = 0
    point = 5
    ordersCount = Math.round(goal/point)
    let randomProgress = Phaser.Math.Between(5, 7);

    villagers = this.add.group()
    foodMenu = this.add.group()
    demands = this.add.group()
    foodOrders = this.add.group()
    complaints = this.add.group()
    enemyPointsGained = this.add.group()

    this.scene.launch('levelThreeTutorial')
    
    this.baseScene = new MainGameScene(this, lvl3)
  
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
      delay: Phaser.Math.Between(3000, 4000),
      callback: function() {
        this.enemyProgressBarMask.y -= randomProgress;

        let randomX = Phaser.Math.Between(enemy.x - 90, enemy.x + 90);
        let enemyPoints = this.add.sprite(randomX, enemy.y - 100, "enemyPoints").setScale(0.8)
        enemyPoints.play('enemyScores')
        enemyPointsGained.add(enemyPoints)

        soundFx.play()

        enemyScore += randomProgress

        if (enemyScore >= goal) {
          new ShowGameOver(this, lvl3)
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
          timerEvent.remove()
  
          eat.play()
  
          score += point;
          
          ordersCount -= 1
          ordersCountText.setText(ordersCount)
          
          if (score <= goal) {
            fullProgressBarMask.y -= point
          }
          if (score > goal) {
            new ShowSuccess(this, 3, "levelThreeSuccess")
          }
          
        } else if (obj.name != dropZone.name) {
          obj.destroy();
          dropZone.destroy();
          no.play()
        }
      }    
    }, this);

    rightVillagersEvent = new CustomersEventTimer(this, Phaser.Math.Between(5000, 7000), 'right', 3 )
    leftVillagersEvent = new CustomersEventTimer(this, Phaser.Math.Between(5000, 7000), 'left', 3 )
  

    this.specialVillagerEvent = new GenerateSpecialVillager(this)
  }

  
}


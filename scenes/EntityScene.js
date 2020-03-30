class EntityScene extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.setData("type", type);
  }
}

class MainGameScene extends EntityScene {
  constructor(scene, lvlMusic){
    super(scene)
    scene.order = scene.add.image(scene.game.renderer.width - 50, 70, "ordersCountBg").setScale(0.7).setDepth(4)
    ordersCountText = scene.add.text(scene.game.renderer.width - 70, 70, ordersCount, { font: "40px Arial", fill: "#964B00", align: "center"}).setDepth(5)    
    
    
    background = scene.add.image(0, 0, "mainBg").setDepth(0);
    background.setOrigin(0, 0);

    scene.backgroundBorder = scene.add.image(0, 0, "mainBgBorder").setDepth(2);
    scene.backgroundBorder.setOrigin(0, 0);

    new ProgressBar(scene, scene.game.renderer.width - 55, 'character', 'fullProgressBar')
    new ProgressBar(scene, scene.game.renderer.width - 20, 'enemy', 'competitorProgressBar' )

    home = scene.add.image(scene.game.renderer.width - 40, scene.game.renderer.height - 50, "home").setScale(0.2).setDepth(3).setInteractive()
    home.on('pointerdown', function() {
      scene.scene.start('mainMenu')
      music.play()
      lvlMusic.stop()
    }, this)
    

    character = scene.add
      .image(
        scene.game.renderer.width / 2 - 200,
        scene.game.renderer.height / 2 + 100,
        "mainCharacter"
      ).setScale(0.8, 0.8)

    enemy = scene.add
      .image(
        scene.game.renderer.width / 2 + 100,
        scene.game.renderer.height / 2 + 100,
        "enemyCart"
      ).setScale(0.8, 0.8)
  
  }
}


class ProgressBar extends EntityScene {
  constructor(scene, x, logo, progressBar) {
    super(scene)

    scene.fullProgressBar = scene.add
    .image(
      x,
      scene.game.renderer.height / 2 + 40,
      progressBar
    )
    .setDepth(2);

    scene.characterLogo = scene.add
    .image(
      x,
      scene.game.renderer.height / 2 + 170,
      logo
    )
    .setDepth(3)
    .setScale(0.4);
    }
  
}

class FoodMenu extends EntityScene {
  constructor(scene, menuList, foodMenu, food, demands) {
    super(scene)

    let initialPos = 62;

    for (let i = 0; i < menuList.length; i++) {
      let currentPos = initialPos;
      food = scene.add
        .image(currentPos, 60, menuList[i])
        .setDepth(1)
        .setScale(0.5);
      initialPos += 90;
     food.setName(menuList[i]);
      foodMenu.add(food);
    }

    foodMenu.children.each(function(food) {
      food.setInteractive();
      food.on(
        "pointerdown",
        function(pointer) {
          scene.demand = scene.add
            .image(pointer.x, pointer.y, food.name)
            .setDepth(2)
            .setScale(0.5)
            .setInteractive({ draggable: true })
            .setName(food.name);
          demands.add(scene.demand);
        },
        scene
      );
    }, scene);
  }
}


class Recipe extends EntityScene {
  constructor(scene, target) {
    super(scene)
    
    scene.tweens.add({
      targets: target,
      x: scene.game.renderer.width/2,
      duration: 2000,
      ease: 'Elastic',
      easeParams: [ 1.5, 0.5 ],
      delay: 0
    });

    scene.time.addEvent({
      delay: 1000,
      callback: function() {
        scene.sparkle = scene.add.sprite(scene.game.renderer.width/2, scene.game.renderer.height/2, 'sparkles')
        scene.sparkle.play('sparkle')

        scene.add.image(scene.game.renderer.width/2, scene.game.renderer.height/2-120, 'recipeUnlocked')
        let congrats =  scene.sound.add('nextLevelSound', { loop: false})
        congrats.play()
      },
      callbackScope: this,
      loop: false
    });
  }
}

class GenerateSpecialVillager extends EntityScene {
  constructor(scene) {
    super(scene)
    let randomSide = Phaser.Math.Between(0, 1)
    this.specialVillagerEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(25000, 60000),
      callback: function() {
        if (randomSide == 0) {
          let specialVillager = new SpecialVillager(scene, 0, scene.game.renderer.height / 2 + 180, Phaser.Math.Between(10, 50))
          specialVillager.flipX = true
          specialVillager.setDepth(1).setInteractive()
          specialVillager.on('pointerdown', function() {
            scene.scene.pause();
            scene.scene.launch('keyReceived')
          })
        } else {
          let specialVillager = new SpecialVillager(scene, scene.game.renderer.width, scene.game.renderer.height / 2 + 180, Phaser.Math.Between(-50, -10))
          specialVillager.setDepth(1).setInteractive()
          specialVillager.on('pointerdown', function() {
            scene.scene.pause();
            scene.scene.launch('keyReceived')
          })
        }
      },
      callbackScope: this,
      loop: false
    });
  }
}

class RemoveEntities extends EntityScene {
  constructor(scene) {
    super(scene)

    villagers.children.each((villager) => villager.destroy())
    foodMenu.children.each((menu) => menu.destroy())
    demands.children.each((demand) => demand.destroy())
    foodOrders.children.each((food) => food.destroy())
    complaints.children.each((complain) => complain.destroy())
    enemyPointsGained.children.each((point) => point.destroy())
    character.destroy()
    enemy.destroy()
    background.setAlpha(0.5)

  }
}


class SlideTransition extends EntityScene {
  constructor(scene, target, duration) {
    super(scene)

    scene.tweens.add({
      targets: target,
      x: scene.game.renderer.width/2,
      duration: duration,
      ease: 'Power2',
      loop: 0
    });
  }
}

class BoinkyTransition extends EntityScene {
  constructor(scene, target, x, duration, easeParams) {
    super(scene)
    
    scene.tweens.add({
      targets: target,
      x: x,
      duration: duration,
      ease: 'Elastic',
      easeParams: easeParams,
      delay: 0
    });
  }
}
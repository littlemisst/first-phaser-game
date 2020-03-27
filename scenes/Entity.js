const villagerType = ["villager1", "villager2", 'villager3', 'villager4', "villagerSpecial"];
const types = ["villagerOne", "villagerTwo", "villagerThree", "villagerFour", "specialVillager"];
const orders = ["tubig", "potatoKwekKwek", "kamoteLumpia", "sagotGulaman", "putoCheese", "halo2x", "bibingka",];

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
  }
}

class SpecialVillager extends Entity {
  constructor(scene, x, y, velocity) {
    super(scene, x, y, 'villagerSpecial', "specialVillager")
    this.body.setVelocityX(velocity);
    this.anims.play('villagerSpecial')
    order = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x, 3);
    order.setScale(0.5, 0.5).setDepth(1);
    foodOrders.add(order)
  }
}


class VillagerFromLeft extends Entity {
  constructor(scene, x, y, level) {
    const index = Phaser.Math.Between(0, level);
    super(scene, x, y, villagerType[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(20, 40));
    this.anims.play(villagerType[index]);
    order = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x, level);
    order.setScale(0.5, 0.5).setDepth(1);
    foodOrders.add(order)
  }
}

class VillagerFromRight extends Entity {
  constructor(scene, x, y, level) {
    const index = Phaser.Math.Between(0, level);
    super(scene, x, y, villagerType[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(-30, -50));
    this.anims.play(villagerType[index]);
    order = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x, level);
    order.setScale(0.5, 0.5).setDepth(1);
    foodOrders.add(order)
  }
}

class FoodOrder extends Entity {
  constructor(scene, x, y, velocity, level) {
    const order = orders[Phaser.Math.Between(0, level+2)];
    super(scene, x, y, order);
    this.body.setVelocityX(velocity);
    this.setInteractive({dropZone: true}).setName(order+'Menu')

    let width;
    if (x == 0) {
      width = 200
      x = 200
    } else {
      width = -200
    }

    let random = Phaser.Math.Between(x/2, x/2 + width)

    timerEvent = scene.time.addEvent({
      delay: 10000,
      callback: function() {
        this.destroy();
        let complain = scene.add.sprite(random, y - 100, "complain")
        complain.play('tagal')
        complaints.add(complain)
        let soundFx =  scene.sound.add('tagalSound', { loop: false})
        soundFx.play()

        scene.time.delayedCall(800,()=>complain.destroy(), [], this)
      },
      callbackScope: this,
      loop: false
    });
    
  }
}
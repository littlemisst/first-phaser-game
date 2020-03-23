let food;
const villagerType = ["villager1", "villager2", 'villager3', 'villager4'];
const types = ["villagerOne", "villagerTwo", "villagerThree", "villagerFour"];
const orders = ["potatoKwekKwek", "kamoteLumpia"];

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
  }
}

class VillagerFromLeft extends Entity {
  constructor(scene, x, y, level) {
    const index = Phaser.Math.Between(0, level);
    super(scene, x, y, villagerType[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(20, 40));
    this.anims.play(villagerType[index]);
    food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x, level);
    food.setScale(0.5, 0.5).setDepth(1);
  }
}

class VillagerFromRight extends Entity {
  constructor(scene, x, y, level) {
    const index = Phaser.Math.Between(0, level);
    super(scene, x, y, villagerType[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(-30, -50));
    this.anims.play(villagerType[index]);
    food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x, level);
    food.setScale(0.5, 0.5).setDepth(1);
  }
}

class FoodOrder extends Entity {
  constructor(scene, x, y, velocity, level) {
    const order = orders[Phaser.Math.Between(0, level)];
    super(scene, x, y, order);
    this.body.setVelocityX(velocity);
    this.setInteractive({dropZone: true}).setName(order+'Menu')
  
    scene.time.delayedCall(
      10000,
      function(obj) {
        this.destroy();
      },
      [],
      this
    );
  }
}
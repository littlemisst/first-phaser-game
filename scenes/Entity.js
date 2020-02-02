class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
  }
}
const villagers = ['villager1', 'villager2']
const types = ['villagerOne', 'villagerTwo']
class VillagerFromLeft extends Entity {
  constructor(scene, x, y) {
    const index = Phaser.Math.Between(0,1)
    super(scene, x, y, villagers[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(50, 100));
    this.anims.play(villagers[index]);
    let food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x);
    food.setScale(0.5, 0.5)
  }
}

class VillagerFromRight extends Entity {
  constructor(scene, x, y) {
    const index = Phaser.Math.Between(0,1)
    super(scene, x, y, villagers[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(-50, -100));
    this.anims.play(villagers[index]);
    let food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x);
    food.setScale(0.5, 0.5)
  }
  
}
const orders = ['potatoKwekKwek', 'kamoteLumpia']
class FoodOrder extends Entity {
  constructor(scene, x, y, velocity) {
    super(scene, x, y, orders[Phaser.Math.Between(0,1)]);
    this.body.setVelocityX(velocity);
  }
}

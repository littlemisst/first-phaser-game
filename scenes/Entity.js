let food, score = 0;
console.log(score)
class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
  }
}
const villagers = ["villager1", "villager2"];
const types = ["villagerOne", "villagerTwo"];
const orders = ["potatoKwekKwek", "kamoteLumpia"];

class VillagerFromLeft extends Entity {
  constructor(scene, x, y) {
    const index = Phaser.Math.Between(0, 1);
    super(scene, x, y, villagers[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(50, 100));
    this.anims.play(villagers[index]);
    food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x);
    food.setScale(0.5, 0.5).setDepth(1);
  }
}

class VillagerFromRight extends Entity {
  constructor(scene, x, y) {
    const index = Phaser.Math.Between(0, 1);
    super(scene, x, y, villagers[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(-50, -100));
    this.anims.play(villagers[index]);
    food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x);
    food.setScale(0.5, 0.5).setDepth(1);
  }
}
class FoodOrder extends Entity {
  constructor(scene, x, y, velocity) {
    super(scene, x, y, orders[Phaser.Math.Between(0, 1)]);
    this.body.setVelocityX(velocity);
    scene.add.existing(this);
    this.setInteractive();
    scene.input.setDraggable(this, true);

    scene.input.on("dragstart", function(pointer, obj) {
      obj.body.setVelocityX(0);
    });
    scene.input.on("drag", function(pointer, obj, dragX, dragY) {
      obj.setPosition(dragX, dragY);
    });
    scene.input.on("drop", function(pointer, obj, dropZone) {
      score += 10
      obj.x = dropZone.x;
      obj.y = dropZone.y;
      obj.destroy()
    });

    scene.time.delayedCall(5000, function (obj) {
      this.destroy()
    }, [], this)
  }
}

class Angry extends Entity {
  constructor(scene, x, y, velocity) {
    super(scene, x, y, 'angry');
    this.body.setVelocityX(velocity);
  }
}

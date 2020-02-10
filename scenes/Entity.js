let food;
class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
  }
}
const villagerType = ["villager1", "villager2"];
const types = ["villagerOne", "villagerTwo"];
const orders = ["potatoKwekKwek", "kamoteLumpia"];

class VillagerFromLeft extends Entity {
  constructor(scene, x, y) {
    const index = Phaser.Math.Between(0, 1);
    super(scene, x, y, villagerType[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(20, 40));
    this.anims.play(villagerType[index]);
    food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x);
    foodOrders.add(food);
    food.setScale(0.5, 0.5).setDepth(1);
  }
}

class VillagerFromRight extends Entity {
  constructor(scene, x, y) {
    const index = Phaser.Math.Between(0, 1);
    super(scene, x, y, villagerType[index], types[index]);
    this.body.setVelocityX(Phaser.Math.Between(-30, -50));
    this.anims.play(villagerType[index]);
    food = new FoodOrder(this.scene, this.x, this.y - 60, this.body.velocity.x);
    foodOrders.add(food);
    food.setScale(0.5, 0.5).setDepth(1);
  }
}

class FoodOrder extends Entity {
  constructor(scene, x, y, velocity) {
    const order = orders[Phaser.Math.Between(0, 1)];
    super(scene, x, y, order);
    this.body.setVelocityX(velocity);
    this.setInteractive({dropZone: true}).setName(order+'Menu')
  
    scene.time.delayedCall(
      5000,
      function(obj) {
        this.destroy();
      },
      [],
      this
    );
  }
}

class Angry extends Entity {
  constructor(scene, x, y, velocity) {
    super(scene, x, y, "angry");
    this.body.setVelocityX(velocity);
  }
}



// scene.input.setDraggable(this, true);

//     scene.input.on("dragstart", function(pointer, obj) {
//       obj.body.setVelocityX(0);
//     });
//     scene.input.on("drag", function(pointer, obj, dragX, dragY) {
//       obj.setPosition(dragX, dragY);
//     });
//     scene.input.on("drop", function(pointer, obj, dropZone) {
//       obj.x = dropZone.x;
//       obj.y = dropZone.y;
//       obj.input.enabled = false;
//       score += 10
//       console.log(score)
//       // obj.destroy();
//     });
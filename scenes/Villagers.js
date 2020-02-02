class Villagers extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
  }
}

class VillagerOne extends Villagers {
  constructor(scene, x, y) {
    super(scene, x, y, "villager1", "villagerOne");
    this.body.setVelocityX(Phaser.Math.Between(-50, -100));
    this.anims.play("villager1");
  }
}

class VillagerTwo extends Villagers {
  constructor(scene, x, y) {
    super(scene, x, y, "villager2", "villagerTwo");
    this.body.setVelocityX(Phaser.Math.Between(30, 70));
    this.anims.play("villager2");
  }
}
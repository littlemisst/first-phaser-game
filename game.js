const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  scene: LoadingScene
};

const game = new Phaser.Game(config);

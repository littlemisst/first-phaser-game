const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  scene: [LoadingScene, MainMenu, MainGame, OptionsScene]
};

const game = new Phaser.Game(config);

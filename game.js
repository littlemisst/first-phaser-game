const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: 'arcade'
  },
  scene: [LoadingScene, MainMenu, MainGameLevels, ShopScene, CookBookScene, LevelOne, LevelOneSuccess, GameOver, LevelTwo]
};

const game = new Phaser.Game(config);

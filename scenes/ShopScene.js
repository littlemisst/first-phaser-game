const bibingkaPrice = 1500
const putoCheesePrice = 1200
const haloHaloPrice = 1000

class ShopScene extends Phaser.Scene {
  constructor() {
    super("shop");
  }
  preload() {
    this.load.image("shopBg", "./../scenes/assets/shopBg.jpg");
    this.load.image("back", "./../scenes/assets/back.png");
    this.load.image("coins", "./../scenes/assets/coins.png");
    this.load.image('bibingka', "./../scenes/assets/menuBibingka.png")
    this.load.image('haloHalo', "./../scenes/assets/menuHalo2x.png")
    this.load.image('putoCheese', "./../scenes/assets/menuPutoCheese.png")
    this.load.image('bibingkaPrice', "./../scenes/assets/bibingkaPrice.png")
    this.load.image('haloHaloPrice', "./../scenes/assets/halohaloPrice.png")
    this.load.image('putoCheesePrice', "./../scenes/assets/putoCheesePrice.png")

  }
  create() {
    this.background = this.add.image(0, 0, "shopBg").setDepth(0);
    this.background.setOrigin(0, 0);

    this.bibingka = this.add.image(this.game.renderer.width / 2 + 120, this.game.renderer.height / 2, "bibingka").setDepth(1).setScale(0.5).setInteractive();
    this.haloHalo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "haloHalo").setDepth(1).setScale(0.5).setInteractive();
    this.putoCheese = this.add.image(this.game.renderer.width / 2 - 120, this.game.renderer.height / 2, "putoCheese").setDepth(1).setScale(0.5).setInteractive();

    this.bibingka.on('pointerdown', () => {
      if (coins > bibingkaPrice) {
        coins -= bibingkaPrice
        this.coinsText.setText(coins)
      }
      this.bibingka.setTint(0xFF7F50);
    })
    this.bibingka.on('pointerup', () => this.bibingka.clearTint())

    this.haloHalo.on('pointerdown', () => {
      if (coins > haloHaloPrice) {
        coins -= haloHaloPrice
        this.coinsText.setText(coins)
      }
      this.haloHalo.setTint(0xFF7F50);
    })
    this.haloHalo.on('pointerup', () => this.haloHalo.clearTint())

    this.putoCheese.on('pointerdown', () => {
      if (coins > putoCheesePrice) {
        coins -= putoCheesePrice
        this.coinsText.setText(coins)
      }
      this.putoCheese.setTint(0xFF7F50);
    })
    this.putoCheese.on('pointerup', () => this.putoCheese.clearTint())

    this.add.image(this.game.renderer.width / 2 + 120, this.game.renderer.height / 2 + 65, "bibingkaPrice").setDepth(1).setScale(0.3);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 65, "haloHaloPrice").setDepth(1).setScale(0.3);
    this.add.image(this.game.renderer.width / 2 - 120, this.game.renderer.height / 2 + 65, "putoCheesePrice").setDepth(1).setScale(0.3);

    this.back = this.add
      .image(
        this.game.renderer.width - 100,
        this.game.renderer.height - 30,
        "back"
      )
      .setScale(0.8)
      .setDepth(1)
      .setInteractive();
    this.coins = this.add.image(100, this.game.renderer.height - 30, "coins").setScale(0.8).setDepth(1)
    this.coinsText = this.add.text(170, this.game.renderer.height - 45, coins, { font: "25px Arial"})
    this.back.on("pointerdown", () => this.scene.switch("mainMenu"), this);
  }
}

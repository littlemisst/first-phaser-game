class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loading");
  }

  preload() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x5ceb34, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'LOADING',
        style: {
            font: '20px monospace',
            fill: '#ebab34'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    let percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", function(value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x22222, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
      });

    this.load.on("complete", function() {
      console.log("complete");
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy()
      percentText.destroy();
    });

    this.load.image("logo", "./../scenes/assets/logo.png");
    for (let i = 0; i < 500; i++) {
      this.load.image("logo" + i, "./../scenes/assets/logo.png");
    }
  }

  create() {
    this.add.image(400, 300, "logo");
    // this.scene.start('./MainMenu.js')
  }
}

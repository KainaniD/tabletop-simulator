import Phaser from "phaser"
import Bootloader from "./scenes/bootloader.js"
import Game from "./scenes/game.js"



const config = {
  type: Phaser.AUTO,
  useTicker: true,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Bootloader, Game],
  backgroundColor: 0xffffff
};

const game = new Phaser.Game(config);


export default game;
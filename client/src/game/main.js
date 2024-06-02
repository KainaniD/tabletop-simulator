import Phaser from "phaser"
//import Bootloader from "./scenes/bootloader.js"
import Game from "./scenes/game.js"



const config = {
  parent: "game-container",
  type: Phaser.AUTO,
  useTicker: true,
  scale: {
    mode: Phaser.Scale.FIT,
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
  scene: [Game],
  backgroundColor: 0xffffff,

};

const StartGame = (parent) => {
  return new Phaser.Game({... config, parent});

}


export default StartGame;
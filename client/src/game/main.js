import Phaser from "phaser"
//import Bootloader from "./scenes/bootloader.js"
import Game from "./scenes/game.js"



const config = {
  parent: "game-container",
  type: Phaser.AUTO,
  autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
  useTicker: true,
  scale: {
    width: 1600,
    height: 900,
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

const StartGame = (parent, socket) => {
  let phaserGame =  new Phaser.Game({... config, parent});

  setTimeout(
    () => phaserGame.scene.getScene('game').setSocket(socket),
    500
  );
  return phaserGame;
}


export default StartGame;
import Phaser from "phaser";
import Card from "../gameobjects/card"
//import Bootloader from "./bootloader";
import PlayerHand from "../gameobjects/playerHand";
import Deck from "../gameobjects/deck.js"
import io from 'socket.io-client'


class Game extends Phaser.Scene {
    constructor() {
        super({key : 'game'});
        this.deck = new Deck(this);
    }
    card_names = [];
    
    
    
    preload() {
        
        
        for (var card_name of this.deck.card_names) {
            //console.log(card_name)
            this.load.image(card_name, '/assets/Cards/' + card_name+'.png') 
        } 
        this.load.image('card_back', '/assets/Cards/cardBack_blue2.png') //pick card back style here
        //this.load.on("complete", () => {this.scene.start("game")}, this)
    }
    


    create() {
        this.socket = io('http://localhost:4000')

        this.socket.on('connect', () => console.log('Connected!'))
        this.input.mouse.disableContextMenu()
        var playerHand_list = [];
        //card_objects_group = newGroup(this, )
        var table_outline = this.add.graphics()
        table_outline.lineStyle(4, 0x000000)
        table_outline.strokeRect(0,0, this.scale.width, this.scale.height)
        this.deck.loadCards();
        this.loadPlayerHands()
    }
    


    loadPlayerHands() {
        this.playerHand1 = new PlayerHand(this, 200, 800, 'hello', 400, 200)
    }

    update() {
        
    }

}

export default Game;
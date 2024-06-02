import Phaser from "phaser";
import Card from "../gameobjects/card"
//import Bootloader from "./bootloader";
import PlayerHand from "../gameobjects/playerHand";

export default class Game extends Phaser.Scene {
    constructor() {
        super({key : 'game'});
        
    
    }
    card_names = [];
    
    preload() {
        var card_suites = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        var card_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for (var value of card_values) {
            for (var suite of card_suites) {
                this.card_names.push('card'+suite+value);
            }
        }
        
        for (var card_name of this.card_names) {
            //console.log(card_name)
            this.load.image(card_name, '/assets/Cards/' + card_name+'.png') 
            
        } 
        this.load.image('card_back', '/assets/Cards/cardBack_blue2.png') //pick card back style here
        //this.load.on("complete", () => {this.scene.start("game")}, this)
    }
    


    create() {
        
        this.input.mouse.disableContextMenu()
        var playerHand_list = [];
        //card_objects_group = newGroup(this, )
        var table_outline = this.add.graphics()
        table_outline.lineStyle(4, 0x000000)
        table_outline.strokeRect(0,0, this.scale.width, this.scale.height)
        this.loadCards();
        this.loadPlayerHands()
    }
    
    loadCards() {
        var xoffset = 10;
        for (var card_name of this.card_names) {
            var temp_card = new Card(this, 50+xoffset, 100, card_name, 'card_back')
            xoffset += 20;
            
        }   

        //this.card = new Card(this, 200, 100, 'cardClubs4', 'card_back');
        //this.card1 = new Card(this, 100, 100, 'cardClubs3', 'card_back');
    }

    loadPlayerHands() {
        this.playerHand1 = new PlayerHand(this, 200, 200, 'hello', 200, 200)
    }

    update() {
        
    }

}

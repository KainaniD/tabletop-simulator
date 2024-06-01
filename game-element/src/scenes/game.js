import Phaser from "phaser";
import Card from "../gameobjects/card"
//import Bootloader from "./bootloader";
import PlayerHand from "../gameobjects/playerHand";

export default class Game extends Phaser.Scene {
    constructor() {
        super({key : 'game'});
        
    
    }

    preload() {
        var card_suites = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        var card_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        var card_names = []
        for (var value of card_values) {
            for (var suite of card_suites) {
                card_names.push('card'+suite+value);
            }
        }
        
        for (var card_name of card_names) {
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
        this.loadCards();
        this.loadPlayerHands()
    }
    
    loadCards() {
        

        this.card = new Card(this, 200, 100, 'cardClubs4', 'card_back');
        this.card1 = new Card(this, 100, 100, 'cardClubs3', 'card_back');
        
    }

    loadPlayerHands() {
        this.playerHand1 = new PlayerHand(this, 0, 0, 'hello', 400, 200)
    }

}

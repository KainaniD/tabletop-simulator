// import Phaser from "phaser";
import Card from "./card.js";

class Deck {
    card_suites = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    card_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    card_to_value = 
    {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'A': 1,
        'J': 11,
        'Q': 12,
        'K': 13
    };
    card_names=[]
    constructor(scene) {
        this.scene = scene;
        this.init();
    }

    init(){
        this.makeCardNames();

    }

    makeCardNames() {
        for (var value of this.card_values) {
            for (var suite of this.card_suites) {
                this.card_names.push('card'+suite+value);
            }
        }
    }
    card_objects = {};
    loadCards() {
        var xoffset = 10;
        for (var value of this.card_values) {
            for (var suite of this.card_suites) {
                this.card_objects['card'+suite+value] = new Card(this.scene, 50+xoffset, 100, 'card'+suite+value, 'card_back', suite, this.card_to_value[value])
                xoffset += 20;
            }
        }

        //this.card = new Card(this, 200, 100, 'cardClubs4', 'card_back');
        //this.card1 = new Card(this, 100, 100, 'cardClubs3', 'card_back');
    }



}

export default Deck;
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
        let xoffset = 25;
        let offsetMult = 0
        for (let value of this.card_values) {
            for (let suite of this.card_suites) {
                this.card_objects['card'+suite+value] = new Card(this.scene, 800-(26*xoffset)+xoffset*offsetMult, 450, 'card'+suite+value, 'card_back', suite, this.card_to_value[value])
                offsetMult += 1;
                console.log(this.card_objects['card'+suite+value].depth)
            }
        }
        // this.card_objects['hello'] = 'there'
        //this.card = new Card(this, 200, 100, 'cardClubs4', 'card_back');
        //this.card1 = new Card(this, 100, 100, 'cardClubs3', 'card_back');
    }

    shuffleDeck() {
        console.log("Shuffling")
        for(let cardName in this.card_objects) {
            let random_suite_index = Math.floor(Math.random() * 4)
            let random_suite = this.card_suites[random_suite_index]
            let random_value_index = Math.floor(Math.random() * 13)
            let random_value = this.card_values[random_value_index]
            let otherCard = this.card_objects['card'+random_suite+random_value]
            let tempX = otherCard.x
            let tempY = otherCard.y
            otherCard.setX(this.card_objects[cardName].x).setY(this.card_objects[cardName].y)
            this.card_objects[cardName].setX(tempX).setY(tempY)
        }
    }
    cardXOrganizer(card_pair1, card_pair2) {
        return card_pair1[1]-card_pair2[1]
    }
    organizeDeckHeights () {

        let orderedObjects = [];
        for (let cardName in this.card_objects) {
            orderedObjects.push([cardName,this.card_objects[cardName].x])
        }
        orderedObjects.sort(this.cardXOrganizer)
        for (let card_pair of orderedObjects) {
            this.scene.children.bringToTop(this.card_objects[card_pair[0]])
        }

    }

}

export default Deck;
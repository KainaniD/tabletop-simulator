import Phaser from 'phaser'
import Card from './card';
class PlayerHand extends Phaser.GameObjects.Zone{
    cards_in_hand = [];
    constructor(scene, x, y, name, width, height){
        super(scene, x, y, width, height);
        this.name = name;
        
        this.init();
        
    }

    

    init() {
        this.scene.add.existing(this);

        this.scene.add.existing(this);
        var outline = this.scene.add.graphics();
        outline.lineStyle(4, 0x000000);
        outline.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height)
        this.setRectangleDropZone(this.width, this.height)
    }

    addCard(card_object){
        this.cards_in_hand.push(card_object);
        this.handRender()
        
    }
    removeCard(card_object) {
        let removal_index = this.cards_in_hand.indexOf(card_object);
        this.cards_in_hand.splice(removal_index,1);
        this.handRender();
    }


    orderCards(){
        this.cards_in_hand.sort(this.cardComparer)
    }

    cardComparer(card_object_1, card_object_2){
        if (card_object_1.suite < card_object_2.suite) {
            return -1;
        }
        else if (card_object_1.suite > card_object_2.suite) {
            return 1;
        }
        else {
            return (card_object_1.value - card_object_2.value)
        }
    }

    handRender() {
        this.orderCards()
        let number_of_cards = this.cards_in_hand.length
        let spacing = this.width/(number_of_cards + 1)
        let multiplier = 1
        for (let i=0; i<number_of_cards; i++){
            let card_object = this.cards_in_hand[i]
            console.log(this.x - this.width/2 + spacing*multiplier)
            card_object.setX(this.x - this.width/2 + spacing*multiplier);
            card_object.setY(this.y)
            this.scene.children.bringToTop(card_object)
            multiplier += 1;
        }    

    }
}

export default PlayerHand;
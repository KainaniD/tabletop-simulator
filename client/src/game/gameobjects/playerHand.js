import Phaser from 'phaser'
// import Card from './card';
class PlayerHand extends Phaser.GameObjects.Zone {
    cards_in_hand = [];
    constructor(scene, x, y, name, width, height) {
        super(scene, x, y, width, height);
        this.name = name;

        this.init();

    }

    setCardObjects(card_names) {
        //let new_cards = [];
        for (let card of card_names) {
            
            this.cards_in_hand.push(this.scene.deck.card_objects[card])
            this.scene.deck.card_objects[card].playerHand = this;
        }
        //return new_cards;
    }

    getCardNames() {
        console.log("getting card names, this is what cards are in the hand right now:")
        console.log(this.cards_in_hand)
        let card_names = []
        //card is the so must use of
        for (let card of this.cards_in_hand) {
            card_names.push(card.cardFront)
        }
        return card_names
    }


    init() {
        this.scene.add.existing(this);

        this.scene.add.existing(this);
        var outline = this.scene.add.graphics();
        outline.lineStyle(4, 0x000000);
        outline.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
        this.setRectangleDropZone(this.width, this.height)
    }

    // updateHand(cardFront) {
    //     console.log(cardFront)
    //     let card_object = this.scene.deck.card_objects[cardFront]
    //     this.cards_in_hand.push(card_object);
    //     this.handRender()
    // }

    addCard(card_object) {
        this.cards_in_hand.push(card_object);
        this.handRender()
        //emit a server event
        console.log("card added")
        console.log(card_object.cardFront)
        // this.scene.socket.emit("cardAddedToHand", this.name, card_object.cardFront)
    }
    removeCard(card_object) {
        console.log("card removed")
        let removal_index = this.cards_in_hand.indexOf(card_object);
        this.cards_in_hand.splice(removal_index, 1);
        this.handRender();
    }


    orderCards() {
        this.cards_in_hand.sort(this.cardComparer)
    }

    cardComparer(card_object_1, card_object_2) {
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
        let spacing = this.width / (number_of_cards + 1)
        let multiplier = 1
        for (let i = 0; i < number_of_cards; i++) {
            let card_object = this.cards_in_hand[i]
            console.log(card_object.cardFront)
            console.log(this.x - this.width / 2 + spacing * multiplier)
            card_object.setX(this.x - this.width / 2 + spacing * multiplier);
            card_object.setY(this.y)
            this.scene.children.bringToTop(card_object)
            multiplier += 1;
        }

    }
}

export default PlayerHand;
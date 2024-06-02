class PlayerHand extends Phaser.GameObjects.Zone{
    cards_in_hand = {};
    number_of_cards = 0;
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
        this.cards_in_hand[card_object.cardFront] = card_object
        this.number_of_cards += 1;
        
    }
    removeCard(card_object) {
        delete this.cards_in_hand[card_object.cardFront]
        this.number_of_cards -= 1;
    }


}

export default PlayerHand
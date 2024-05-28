class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, cardName) {
        super(scene, x, y, cardName)
        this.scene = scene;
        this.cardName = cardName;
        this.facedown = true;
        this.init()
    }

    init() {
        this.scene.add.existing(this);
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.scene.input.on('drag', 
            function(pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY    
            }
        )
    }





}

export default Card;
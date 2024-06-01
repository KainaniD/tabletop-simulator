class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, cardFront, cardBack) {
        super(scene, x, y, cardFront)
        this.scene = scene;
        this.cardFront = cardFront;
        this.facedown = true;
        this.cardBack = cardBack;
        this.init()
    }

    init() {
        this.setTexture(this.cardBack)
        this.setScale(0.5);
        this.scene.add.existing(this);
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.on('drag', 
            function(pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY    
            }
        )
        this.on('pointerup', 
            function(pointer, gameObject) {
                console.log(pointer.rightButtonReleased())
                console.log(this.cardFront);
                console.log(this.cardBack)
                if (! pointer.rightButtonReleased()) {
                    return;
                }
                if (this.facedown) {
                    this.setTexture(this.cardFront)
                    this.facedown = false
                }
                else {
                    this.setTexture(this.cardBack)
                    this.facedown = true
                }
            }
        )
    }





}

export default Card;
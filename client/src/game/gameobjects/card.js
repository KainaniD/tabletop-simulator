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
                this.scene.children.bringToTop(this);
                this.x = dragX;
                this.y = dragY;    
            }
        );
        this.on('pointerdown', 
            function(pointer, gameObject) {
                if (! pointer.rightButtonDown()) {
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
        );
        this.on('pointerdown', 
            function(pointer, gameObject) {
                this.scene.children.bringToTop(this);
            }
        );

        this.on('drop', 
            function(pointer, target) {
                console.log('hello')
                target.addCard(this);
            }
        )
        
    }






}

export default Card;
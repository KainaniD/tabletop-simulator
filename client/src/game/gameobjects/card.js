import Phaser from 'phaser'
// import PlayerHand from './playerHand';
class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, cardFront, cardBack, cardSuite, cardValue) {
        super(scene, x, y, cardFront)
        this.scene = scene;
        this.cardFront = cardFront;
        this.facedown = true;
        this.cardBack = cardBack;
        this.suite = cardSuite;
        this.value = cardValue;
        this.playerHand = null;
        this.init()
    
    }
    
    card_to_value = {};

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
                this.send_changes()
            }
        );
        this.on('pointerdown', 
            function(pointer, gameObject) {
                if (! pointer.rightButtonDown()) {
                    return;
                }
                this.flip_card();
                this.send_changes();
            }
        );
        this.on('pointerdown', 
            function(pointer, gameObject) {
                this.scene.children.bringToTop(this);
            }
        );

        this.on('drop', 
            function(pointer, target) {
                if (this.playerHand === null || target.name !== this.playerHand.name) {
                    target.addCard(this);
                    this.playerHand=target;
                }
                target.handRender()

                

            }
        )

        this.on('dragleave',
            function(pointer, target) {
                target.removeCard(this);
                this.playerHand=null;

                
            }
        
        )

        
        
    }
    //may cause performance issues, if so do it a different way

    flip_card() {
        if (this.facedown) {
            this.setTexture(this.cardFront)
            this.facedown = false
        }
        else {
            this.setTexture(this.cardBack)
            this.facedown = true
        }
    }

    send_changes() {
        this.scene.socket.emit("cardMoved", this.cardFront, this.x, this.y, this.facedown)
    }

    make_changes (x, y, facedown) {
        this.setX(x).setY(y);
        if (this.facedown !== facedown) {
            this.flip_card()
        }
    }

    update () {
  
    }

    

}

export default Card;
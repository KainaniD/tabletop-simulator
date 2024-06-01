class PlayerHand extends Phaser.GameObjects.Rectangle{
    init() {
        this.setOrigin(0.5, 0)
        this.scene.add.existing(this);
    }



    constructor(scene, x, y, name, width, height, fillColor = 0x005500, fillAlpha = 0.5){
        super(scene, x, y, width, height, fillColor, fillAlpha);
        this.name = name;
        this.init();
    }

    


}

export default PlayerHand
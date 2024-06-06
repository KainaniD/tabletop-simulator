import Phaser from 'phaser'
export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "bootloader"});
    }
    
    

    preload() {
        let card_suites = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        let card_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        let card_names = []
        for (let value of card_values) {
            for (let suite of card_suites) {
               card_names.push('card'+suite+value);
            }
        }
        
        for (let card_name of card_names) {
            console.log(card_name)
            this.load.image(card_name, '/assets/Cards/' + card_name+'.png') 
            
        } 
        this.load.image('card_back', '/assets/Cards/cardBack_blue2.png') //pick card back style here
        this.load.on("complete", () => {this.scene.start("game")}, this)
    }

}   

import Phaser from 'phaser'
export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "bootloader"});
    }
    shuffle(array) {
        console.log("Shuffling")
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }

    
    

    preload() {
        var card_suites = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        var card_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        var card_names = []
        for (var value of card_values) {
            for (var suite of card_suites) {
                card_names.push('card'+suite+value);
            }
        }
        shuffle(card_names);
        
        for (var card_name of card_names) {
            console.log(card_name)
            this.load.image(card_name, '/assets/Cards/' + card_name+'.png') 
            
        } 
        this.load.image('card_back', '/assets/Cards/cardBack_blue2.png') //pick card back style here
        this.load.on("complete", () => {this.scene.start("game")}, this)
    }


    create() {}
    update() {}
}   

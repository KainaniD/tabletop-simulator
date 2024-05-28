import Phaser from "phaser";
import Card from "../gameobjects/card"

export default class Game extends Phaser.Scene {
    constructor() {
        super({key : 'game'});
    }

    create() {
        this.loadCards();
    }
    
    loadCards() {
        this.card = new Card(this, 100, 100, 'cardClubs3');
    }


}

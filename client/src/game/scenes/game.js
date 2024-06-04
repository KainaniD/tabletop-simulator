import Phaser from "phaser";
import Card from "../gameobjects/card"
//import Bootloader from "./bootloader";
import PlayerHand from "../gameobjects/playerHand";
import Deck from "../gameobjects/deck.js"
import io from 'socket.io-client'


class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.deck = new Deck(this);
    }
    card_names = [];
    socket;
    player_dictionary = {}
    
    
    preload() {
        
        
        for (var card_name of this.deck.card_names) {
            //console.log(card_name)
            this.load.image(card_name, '/assets/Cards/' + card_name+'.png') 
        } 
        this.load.image('card_back', '/assets/Cards/cardBack_blue2.png') //pick card back style here
        //this.load.on("complete", () => {this.scene.start("game")}, this)
    }


    create() {
        // this.socket = io('http://localhost:4000')
        // this.socket.on('connect', () => console.log('Connected!'))
        // this.socket.on("cardMoved", (data) => {
        //     data[3].setX(data[0]).setY(data[1])
        // });
        
        this.input.mouse.disableContextMenu()
        var playerHand_list = [];
        //card_objects_group = newGroup(this, )
        var table_outline = this.add.graphics()
        table_outline.lineStyle(4, 0x000000)
        table_outline.strokeRect(0,0, this.scale.width, this.scale.height)
        this.deck.loadCards();
        this.deck.shuffleDeck()
        this.loadPlayerHands()
    }
    
    addPlayerHands(name) {
        this.player_dictionary[name] = new PlayerHand(this, 200, 800, name, 400, 200)
    }

    loadPlayerHands() {
        this.addPlayerHands("hello")
    }

    setSocket(socket) {
        this.socket = socket;
        this.socket.emit("gameClientConnected", `game client connected at: ${this.socket.id}`)
        this.startSocketEvents()
    }

    startSocketEvents(){
        this.socket.on("sendSync", (id) => {
            console.log("sync data request received")
            let card_data = this.getCardData()
            console.log(card_data)
            this.socket.emit("sendSync", id, card_data)
        })
        this.socket.on("getSync", (game_data) => {
            console.log("client received sync data")
            console.log(game_data)
            this.setCardData(game_data)
            console.log("game data set")
        })
        this.socket.on("cardMoved", (card_name, x, y,facedown) => {
            this.deck.card_objects[card_name].make_changes(x,y,facedown)
        })
        this.socket.on("cardAddedToHand", (name, cardFront) => {
            this.player_dictionary[name].updateHand(cardFront)
        })
        this.socket.on("destroyClient", () => {
            this.game.destroy(true);
        })
    }

    getCardData() {
        let data_map = {}
        for (let card_key in this.deck.card_objects) {
            let card_object = this.deck.card_objects[card_key]
            data_map[card_object.cardFront] = {
                'x': card_object.x, 
                'y': card_object.y, 
                'facedown': card_object.facedown
            };
        }
        return data_map;
    }

    setCardData(card_data) {
        console.log(this.deck.card_objects)
        for (let card_key in this.deck.card_objects) {
            let incoming_card_object = card_data[card_key]
            let current_card_object = this.deck.card_objects[card_key]
            current_card_object.setX(incoming_card_object['x']).setY(incoming_card_object['y'])
            
        }
    }

    update() {
        
    }

}

export default Game;
import Phaser from "phaser";
import Card from "../gameobjects/card"
import Bootloader from "./bootloader";
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
    player_dictionary = {} //passing name and object
    
    
    preload() {
        
        this.deck.loadCards();
        console.log("deck loaded")
        this.deck.shuffleDeck()
        this.loadPlayerHands()
        
    
        this.load.on("complete", () => {

            
            
            // this.socket.emit("gameClientConnected", `game client connected at: ${this.socket.id}`);
            // this.startSocketEvents();
        })
        
        

        /* in case preload doesn't work the way i think
        this.events.on('ready', () => {
            this.socket.emit("gameClientConnected", `game client connected at: ${this.socket.id}`)
            this.startSocketEvents()
        })
        //perhaps we may also want to put an even emitter inside loadPlayerHands
        
        */





        // for (var card_name of this.deck.card_names) {
        //     this.load.image(card_name, '/assets/Cards/' + card_name+'.png') 
        // } 
        // this.load.image('card_back', '/assets/Cards/cardBack_blue2.png') //pick card back style here
        // //this.load.on("complete", () => {this.scene.start("game")}, this)
    }


    create() {
      

        this.input.mouse.disableContextMenu()
        //card_objects_group = newGroup(this, )
        var table_outline = this.add.graphics()
        table_outline.lineStyle(4, 0x000000)
        table_outline.strokeRect(0,0, this.scale.width, this.scale.height)
      
        
    }
    gameLoaded = new CustomEvent("gameLoaded")
    firstFrame = true;
    notConnected = true;
    update() {
        if (this.firstFrame) {
            window.dispatchEvent(this.gameLoaded);
            this.firstFrame = false;
        }
        if (this.notConnected && this.socket) {
            console.log("client connecting")
            this.startSocketEvents()
            this.socket.emit("gameClientConnected", `game client connected at: ${this.socket.id}`)
            
            this.notConnected=false;
        }
        
    }
    
    addPlayerHands(name) {
        this.player_dictionary[name] = new PlayerHand(this, 200, 800, name, 400, 200)
    }

    loadPlayerHands() {
        this.addPlayerHands("hello")
        this.deck.loadCards();
        this.deck.shuffleDeck()
    }
    
    addPlayerHand(name, width, height) {
        let length = Object.keys(this.player_dictionary).length;
        switch(length) {
            case 0:
                this.player_dictionary[name] = new PlayerHand(this, width/2, 900-height/2, name, width, height)
                break;
            case 1:
                this.player_dictionary[name] = new PlayerHand(this, width/2, height/2, name, width, height)
                break;
            case 2:
                this.player_dictionary[name] = new PlayerHand(this, 1600-width/2, height/2, name, width, height)
                break;
            case 3:
                this.player_dictionary[name] = new PlayerHand(this, 1600-width/2, 900-height/2, name, width, height)
                break;
            default:
                console.log("shoo ")
        }
        this.socket.emit("playerAdded", name, this.getHandData())
    }

    setSocket(socket) {
        this.socket = socket;
        console.log(`socket set, this socket is ${this.socket}`)
    }

    startSocketEvents(){
        this.socket.on("sendSync", (id) => {
            console.log("sync data request received")
            let card_data = this.getCardData()
            let hand_data = this.getHandData()
            console.log(card_data)
            console.log(hand_data)
            this.socket.emit("sendSync", id, card_data, hand_data)
        })


        this.socket.on("getSync", (card_data, hand_data) => {
            console.log("client received sync data")
            console.log(card_data)
            console.log(hand_data)
            this.setCardData(card_data)
            this.setHandData(hand_data)
            console.log(hand_data)
            console.log("game data set")
        })

        this.socket.on("playerAdded", (name, playerData) => {
            console.log("new player joined")
            this.player_dictionary[name] = new PlayerHand(this, playerData[name]['x'], playerData[name]['y'], name, playerData[name]['width'], playerData[name]['height'])
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

    getHandData() {
        let data_map = {} //playerhand name and properties
        for (let player_name in this.player_dictionary) {
            let player_object = this.player_dictionary[player_name]
            data_map[player_name] = {
                'cards' :player_object.getCardNames(),
                'x':player_object.x,
                'y':player_object.y,
                'width': player_object.width,
                'height':player_object.height,
            }
        }
        return data_map

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
        console.log(data_map)
        return data_map;
    }

    setCardData(card_data) {
        console.log("setting data")
        for (let card_key in this.deck.card_objects) {
            console.log(card_key)
            let incoming_card_object = card_data[card_key]
            let current_card_object = this.deck.card_objects[card_key]
            current_card_object.setX(incoming_card_object['x']).setY(incoming_card_object['y'])
            
            if (incoming_card_object['facedown'] !== current_card_object.facedown){
                current_card_object.flip_card()
            }
            //this is never reached
            console.log("after setting")
            console.log(current_card_object)
        }
    }

    setHandData(hand_data) {
        for (let player_name in hand_data) {
            console.log(hand_data)
            this.player_dictionary[player_name] = new PlayerHand(this, hand_data['x'], hand_data['y'], player_name, hand_data['width'], hand_data['height']);
            let curr_player_object = this.player_dictionary[player_name] //the player hand (the rectangle) image
            
            console.log(player_name)
            console.log("Setting hand data")
      

            let incoming_player_object = hand_data[player_name] 
            console.log("Setting hand data")
            curr_player_object.setCardObjects(incoming_player_object['cards'])

            
        }
        this.addPlayerHand(this.socket.id, 400, 200)
    }


    

}

export default Game;
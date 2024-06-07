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
    standardHandWidth = 400;
    standardHandHeight = 200
    
    
    preload() {
        this.deck.loadCards();
        console.log("deck loaded")
        this.deck.shuffleDeck()        
    
        this.load.on("complete", () => {

            
            // this.startSocketEvents();
            // this.socket.emit("gameClientConnected", `game client connected at: ${this.socket.id}`);
            
        })
        
        
    }



    create() {
      
        this.input.dragDistanceThreshold = 1;
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
            this.socket.emit("gameClientConnected", `game client connected at: ${this.socket.id}`) //game needs to be ready by now
            this.notConnected=false;
        }
        
    }


    loadOurHand(width, height) {
        this.player_dictionary[this.socket.id] = new PlayerHand(this, width/2, 900-height/2, this.socket.id, width, height)
        this.player_dictionary[this.socket.id].setDepth(-1);
    }

    movePlayerHand(name, width, height) {
        let length = Object.keys(this.player_dictionary).length;
        switch(length) {
            case 2:
                this.player_dictionary[name] = new PlayerHand(this, width/2, height/2, name, width, height)
                break;
            case 3:
                this.player_dictionary[name] = new PlayerHand(this, 1600-width/2, height/2, name, width, height)
                break;
            case 4:
                this.player_dictionary[name] = new PlayerHand(this, 1600-width/2, 900-height/2, name, width, height)
                break;
            default:
                console.log("shoo ")
                throw new Error ("move Player Hand failed lmao, probably too many players (only 4 for now)")
        }
        console.log("tell others to add self")
        let our_player_hand = this.player_dictionary[name];
        let playerData = {'x': our_player_hand.x, 'y': our_player_hand.y, 'name':name, 'width': our_player_hand.width, 'height': our_player_hand.height}
        this.socket.emit("playerAdded", name, playerData)
    }

    setSocket(socket) {
        this.socket = socket;
        console.log(`socket set, this socket is ${this.socket.id}`)
    }

    startSocketEvents(){
        this.loadOurHand(this.standardHandWidth, this.standardHandHeight)
        
        this.socket.on("sendSync", (id) => {
            console.log("sync data request received")
            let card_data = this.getCardData()
            let hand_data = this.getHandData()
            console.log("card data to be sent")
            console.log(card_data)
            console.log("hand data to be sent")
            console.log(hand_data)
            this.socket.emit("sendSync", id, card_data, hand_data)
        })


        this.socket.on("getSync", (card_data, hand_data) => {
            console.log("client received sync data")
            console.log("card data received")
            console.log(card_data)
            console.log("hand_data received")
            console.log(hand_data)
            this.setHandData(hand_data) 
            this.setCardData(card_data) //could cause issues if hand data is not set fast enough
            
            
            console.log("game data set")
        })

        this.socket.on("playerAdded", (name, playerData) => {
            console.log("new player joined")
            
            this.player_dictionary[name] = new PlayerHand(this, playerData['x'], playerData['y'], name, playerData['width'], playerData['height'])
            console.log(this.player_dictionary)
        })

        this.socket.on("cardMoved", (card_name, x, y,facedown) => {
            this.deck.card_objects[card_name].make_changes(x,y,facedown)
        })
        // this.socket.on("cardAddedToHand", (name, cardFront) => {
        //     this.player_dictionary[name].updateHand(cardFront)
        // })
        this.socket.on("ownerChanged", (cardFront, playerName, isRemove) => {
            let card_object = this.deck.card_objects[cardFront];
            let playerHand = this.player_dictionary[playerName];
            console.log("player dictionary")
            console.log(this.player_dictionary)
            console.log("player object")
            console.log(playerHand)
            card_object.make_hand_changes(playerHand, isRemove)
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
                'cards' : player_object.getCardNames(),
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
        return data_map;
    }

    setCardData(card_data) {
        console.log("setting card data")
        for (let card_key in this.deck.card_objects) {
            //console.log(card_key)
            let incoming_card_object = card_data[card_key]
            let current_card_object = this.deck.card_objects[card_key]
            current_card_object.setX(incoming_card_object['x']).setY(incoming_card_object['y'])
            
            if (current_card_object.playerHand) {
                console.log("if card is in a player hamd, flipping over")
                if (incoming_card_object.facedown !== false) {
                    current_card_object.flip_card();
                }
            }
            else if (incoming_card_object['facedown'] !== current_card_object.facedown) {
                current_card_object.flip_card();
            }
    
            console.log("after card setting")
            //console.log(current_card_object)
        }
    }

    setHandData(hand_data) {
        console.log("hand_data")
        console.log(hand_data)
        for (let player_name in hand_data) {
            console.log(player_name)
            console.log("Setting hand data")
            let incoming_player_object = hand_data[player_name]
            this.player_dictionary[player_name] = new PlayerHand(this, incoming_player_object['x'], incoming_player_object['y'], player_name, incoming_player_object['width'], incoming_player_object['height']);
            let curr_player_object = this.player_dictionary[player_name] //the player hand (the rectangle) image
    
             

            console.log("incoming player cards")
            console.log(incoming_player_object['cards'])
            curr_player_object.setCardObjects(incoming_player_object['cards']);
            curr_player_object.setDepth(-1);
            
            
        }
        console.log("player dictionary")
        console.log(this.player_dictionary)
        this.movePlayerHand(this.socket.id, this.standardHandWidth, this.standardHandHeight)
    }


    

}

export default Game;
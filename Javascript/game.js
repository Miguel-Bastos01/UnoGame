class Game{
    constructor(){
        this.startScreen = document.getElementById("start-screen")
        this.gameScreen = document.getElementById("game-screen")
        this.gameWin = document.getElementById("win")
        this.gameLose = document.getElementById("lose")

        this.player = null

        this.height = 600
        this.width = 500

        this.cardsLeft = 8
        this.cardsLeftHTML = document.getElementById("card-counters")

        this.gameOver = false
        this.gameIntervalId
        this.gameLoopId = 1000/60

        this.deck = new deck()
    }
    start(){
        this.gameScreen.style.width =  `${this.width}px`
        this.gameScreen.style.height =  `${this.height}px`

        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"

        console.log("Deck before shuffle", this.deck.poplateDeck())
        console.log("Deck after shuffle", this.deck.shuffle())

        let [playerHand, cpuHand] = this.deck.dealCards()
        

        this.gameIntervalId = setInterval(()=> {
            this.gameLoop();},
            this.gameLoopId
        )
    }
    gameLoop(){
        if(this.player){
            this.player.move()
        }
        this.update();
    
        if(this.gameOver){
            clearInterval(this.gameIntervalId)
        }
    }

    update(){
    }
}




class deck{
    constructor(){
        this.deck = []
    }
    
    poplateDeck(){
        const colors = ["purple", "cyan", "pink", "orange"]
        const values =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 

        this.deck = [];

        for(let i = 0; i < colors.length; i++){
            for(let j = 0; j < values.length; j++){
                let card = {
                    color: colors[i],
                    value: values[j]
                }
                this.deck.push(card)
            }
        }
        return this.deck
    }

    shuffle(){
        let shuffleCount = 0

        while (shuffleCount < 100) {
            let i = Math.floor(Math.random() * this.deck.length)
            let j = Math.floor(Math.random() * this.deck.length)

            let temp = this.deck[i]
            this.deck[i]= this.deck[j]
            this.deck[j] = temp

            shuffleCount++
        }
        return this.deck
    }
    
    dealCards(){
        console.log("Dealing " + 8 + " cards")
        

        let playerHand = []
        let cpuHand = []

        for (let i = 0; i < 8; i++){
            let newCard = this.deck.pop()
            playerHand.push(newCard)
        }

        for (let j = 0; j < 8; j++){
            let otherCard = this.deck.pop()
            cpuHand.push(otherCard)
        }
        console.log("Player Hand after dealing:", playerHand)
        console.log("CPU Hand after dealing:", cpuHand)
        return [playerHand, cpuHand]

    }
}

class Game{
    constructor(){
        this.startScreen = document.getElementById("start-screen")
        this.gameScreen = document.getElementById("game-screen")
        this.gameWin = document.getElementById("win")
        this.gameLose = document.getElementById("lose")

        this.player = null
        this.cpuHand = []
        this.turn ="player"
        

        this.height = 600
        this.width = 500

        this.cardsLeft = 8
        this.cardsLeftHTML = document.getElementById("card-counters")

        this.gameOver = false
        this.gameIntervalId
        this.gameLoopId = 1000/60

        this.deck = new deck()
        this.playerHand = []
    }
    start(){
        this.gameScreen.style.width =  `${this.width}px`
        this.gameScreen.style.height =  `${this.height}px`

        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"

        console.log("Deck before shuffle", this.deck.poplateDeck())
        console.log("Deck after shuffle", this.deck.shuffle())

        let [playerHand, cpuHand] = this.deck.dealCards()
        this.playerHand = playerHand
        this.cpuHand = cpuHand

        this.updateHandCount()
        
        
        const cardDrawn = document.getElementById("draw-card")
        cardDrawn.addEventListener('click', () => {
            this.drawCard()
        })
        
        

        this.gameIntervalId = setInterval(()=> {
            this.gameLoop();},
            this.gameLoopId
        )

        this.updatePlayerHand()
    }

    updatePlayerHand(){
        let playerHandDiv = document.getElementById("player-hand")
        playerHandDiv.innerHTML = ""

        this.playerHand.forEach((card, index) => {
            let cardButton = document.createElement("button")
            cardButton.textContent = `${card.color} ${card.value}`
            cardButton.style.backgroundColor = card.color
            cardButton.addEventListener("click", () => {
                this.playCard(card)
            })
            playerHandDiv.appendChild(cardButton)

        })
    }

   

    
    gameLoop(){

        if (this.turn === "player"){
          
        } else if (this.turn !== "player") {
            this.cpuPlayCard()
        }

        this.update()
    
        if(this.gameOver){
            clearInterval(this.gameIntervalId)
        }
    }

    cpuPlayCard(){

        const topDiscardCard = this.deck.discardPile[this.deck.discardPile.length - 1]

        if (!topDiscardCard){
            console.log("No cards skipping turn")
            this.turn = "player"
            return
        }

        let validCard = this.cpuHand.find(card => 
            card.color === this.deck.discardPile[this.deck.discardPile.length - 1].color || 
            card.value === this.deck.discardPile[this.deck.discardPile.length - 1].value
        )

        if(validCard){
            console.log("CPU has valid card")
            this.playCard(validCard)

            let removeCard = this.cpuHand.indexOf(validCard)
        this.cpuHand.splice(removeCard, 1)
        }
        else {
            console.log("CPU has no valid card")
            this.cpuHand.push(this.deck.deck.pop())
        }
        
        this.turn = "player"

        
    }
    

    playCard(card){
        let discardPile = document.getElementById("discard-pile")
        let playedCard = document.getElementById ("played-card")

        discardPile.style.backgroundColor = card.color
        playedCard.textContent = card.value

        this.deck.discardPile.push(card)

        let leavePlayer = this.playerHand.indexOf(card)
        if (leavePlayer > -1){
            this.playerHand.splice(leavePlayer, 1)
            this.updatePlayerHand()
        }

        this.updateHandCount()

        this.turn = "cpu"
    }


    updateHandCount(){
        this.cardsLeftHTML.textContent = `Player hand count: ${this.playerHand.length}`
    }

    drawCard() {

        if (this.deck.deck.length === 0){
            this.deck.reshuffleDeck()
        }


        if(this.deck.deck.length > 0){
            let drawDeck = this.deck.deck.pop()
            this.playerHand.push(drawDeck)
            console.log(`Player drew ${drawDeck.color}, ${drawDeck.value}`)
            this.updateHandCount()
        
        }
        else {
            console.log("No more cards")
        }

        this.turn = "cpu"

    }

    update(){
    }
}




class deck{
    constructor(){
        this.deck = []
        this.discardPile = []
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

        this.discardPile.push(this.deck.pop());


        console.log("Player Hand after dealing:", playerHand)
        console.log("CPU Hand after dealing:", cpuHand)
        return [playerHand, cpuHand]

    }

    reshuffleDeck(){
        if (this.discardPile.length > 1)
            console.log("reshuffling")

        this.deck = [...this.deck, ...this.discardPile.splice(0, this.discardPile.length - 1)]
        this.shuffle()

        console.log("New deck:", this.deck)
    }


}

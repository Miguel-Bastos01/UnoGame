class Game{
    constructor(){
        this.startScreen = document.getElementById("start-screen")
        this.gameScreen = document.getElementById("game-screen")
        this.gameWin = document.getElementById("win")
        this.gameLose = document.getElementById("lose")
        this.cpuDrawCard = document.getElementById ("cpu-no-card")

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
        this.playAgainButton = document.getElementById("play-again")
        if (this.playAgainButton){
            this.playAgainButton.addEventListener("click", () => this.playAgain())
        }

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

        let startingCard = this.deck.deck.pop()
        this.deck.discardPile.push(startingCard)

        let discardPile = document.getElementById("discard-pile")
        let playedCard = document.getElementById("played-card")

        discardPile.style.backgroundColor = startingCard.color
        discardPile.textContent = startingCard.value
        playedCard.style.color = "white"
        playedCard.style.fontWeight ="bold"
        
        
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

        if (this.playerHand.length === 0){
            this.gameWin.style.display = "block"
            this.gameScreen.style.display = "none"
        } else if (this.cpuHand.length === 0){
            this.gameLose.style.display = "block"
            this.gameScreen.style.display = "none"
        }

        this.update()
    
        if(this.gameOver){
            clearInterval(this.gameIntervalId)
        }
    }

    cpuPlayCard(){

        const cpuCounter = document.getElementById("cpu-counter")
        cpuCounter.textContent = `CPU hand count: ${this.cpuHand.length}`

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
            this.cpuDrawCard.style.display = "none"
            this.cpuDrawCard.style.flexdirection ="center"
            

            let removeCard = this.cpuHand.indexOf(validCard)
        this.cpuHand.splice(removeCard, 1)
        }
        else {
            console.log("CPU has no valid card")
            const noCardMsg = this.cpuDrawCard
            noCardMsg.textContent = "CPU Drew card play again"
            noCardMsg.style.display = "flex"
            this.cpuHand.push(this.deck.deck.pop())

            setTimeout(() => {
                this.cpuDrawCard.style.display = "none"
                this.turn = "player"
                
            }, 1000);
        }
        
        this.turn = "player"

        
    }
    

    playCard(card){
        let discardPile = document.getElementById("discard-pile")
        let playedCard = document.getElementById ("played-card")

        if (!playedCard){
            console.error("played card not found")
            return
        }

        let topCard = this.deck.discardPile[this.deck.discardPile.length - 1]


            if (card.color !== topCard.color && card.value !== topCard.value){
                console.log("Invalid card")
            return}   

        discardPile.style.backgroundColor = card.color
        playedCard.textContent = card.value

        this.deck.discardPile.push(card)

        let leavePlayer = this.playerHand.indexOf(card)
        if (leavePlayer > -1){
            this.playerHand.splice(leavePlayer, 1)
            this.updatePlayerHand()
        

        this.updateHandCount()

        this.turn = "cpu"}

        else {
            console.error("Played card not found")
        }
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
            this.updatePlayerHand()


            const cardButton = document.createElement("button")
        cardButton.textContent = `${drawDeck.color} ${drawDeck.value}`
        cardButton.style.backgroundColor = drawDeck.color
        let playerHandDiv = document.getElementById("player-hand")
        playerHandDiv.appendChild(cardButton)

        this.updateHandCount()
        this.updatePlayerHand()
        
        }
        else {
            console.log("No more cards")
        }

        this.turn = "cpu"

    }

    update(){
    }

    playAgain(){
        document.getElementById("win").style.display = "none"
        document.getElementById("lose").style.display = "none"
        document.getElementById("game-screen").style.display = "block"
        document.getElementById("start-screen").style.display ="none"

        this.gameOver = false
        this.turn = "player"
        this.cardsLeft = 8

        this.playerHand = []
        this.cpuHand = []

        this.deck = new deck()
        let [playerHand, cpuHand] = this.deck.dealCards()
        this.playerHand = playerHand
        this.cpuHand = cpuHand

        this.updateHandCount()

        const playedCard = document.getElementById("played-card")
        if (playedCard) playedCard.textContent = ""

        document.getElementById("card-counters").textContent = `Player hand count: ${this.playerHand.length}`
        document.getElementById("cpu-counters").textContent = `Cpu hand count: 8 ${this.cpuHand.length}`

        let discardPile = document.getElementById("discard-pile")
        discardPile.style.backgroundColor = "white"
        discardPile.textContent = ""

        this.updatePlayerHand()

        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopId())

        

    
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

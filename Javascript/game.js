class game{
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
    }
    start(){
        this.gameScreen.style.width =  `${this.width}px`
        this.gameScreen.style.height =  `${this.height}px`

        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"

        this.gameIntervalId = setInterval(()=> {
            this.gameLoop()
            this.gameLoopId
        })
    }
}

gameloop(){
    this.update();

    if(this.gameover){
        clearInterval(this.gameIntervalId)
    }
}

class deck{
    constructor(){}
}
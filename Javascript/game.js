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
    }
    start(){
        this.gameScreen.style.width =  `${this.width}px`
        this.gameScreen.style.height =  `${this.height}px`

        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"

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
    constructor(){}
}
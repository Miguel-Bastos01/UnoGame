window.onload = function(){
    const startButton = document.getElementById("start-button")
    let game

    const playAgain = document.getElementById("play-again")
    
    startButton.addEventListener("click", function(){
        startGame()
    })

    function startGame(){
        
        game = new Game()
        game.start()

        let discardPile = document.getElementById("discard-pile")

        if(!discardPile){
            console.error("Error: Discard pile not found")
            return
        }
        else{
            console.log("Discard pile good")
        }
    }
}
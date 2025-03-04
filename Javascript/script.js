window.onload = function(){
    const startButton = document.getElementById("start-button")
    const playAgain = document.getElementById("play-again")
    let game

    startButton.addEventListener('click', function(){
        startGame()
    })

    function startGame(){
        game = new Game()
        game.start()
    }
}
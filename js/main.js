function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function playRound(playerChoice, computerChoice) {
    if(playerChoice === computerChoice) {
        printText("It's a draw!");
        return 0;
    } else if ((playerChoice + 1) % 3 === computerChoice) {
        printText("Computer wins!");
        return 1;
    } else {
        printText("You won!");
        return 2;
        
    }
}

function playGame() {
    const options = ['rock', 'paper', 'scissors'];

    printText("\n\nWhich one do you choose?")
    
    terminal.eventAwait = _playGame();
    
    function* _playGame() {
        const MAX_ROUNDS = 5;
        let playedRounds = 0;
        let playerScore = 0, computerScore = 0;

        while(true) {
            let choice = options.indexOf(terminal.input);
            if(choice !== -1) {
                let round = playRound(choice, getComputerChoice()) 
                if(round === 0){
                    playerScore++;
                    computerScore++;
                } else if(round === 1){
                    computerScore++;
                } else {
                    playerScore++;
                }

                playedRounds++;

                if(playedRounds === MAX_ROUNDS) {
                    printText(`Final score: ${playerScore} - ${computerScore}`)
                    if(playerScore === computerScore)
                        printText("That's a tie, it was a close game.");
                    else if(playerScore > computerScore)
                        printText("Hats off, you beat a computer in RPS game.");
                    else
                        printText("You got outplayed by a machine, come on. You can do better than this!");

                    printText("End of the game!\nType 'rps' to play again.\n\n")
                    terminal.eventAwait = null;
                    terminal.status = FREE;
                }
            } else {
                printText("Wrong Option!");
            }
            yield;
        }

    }

}
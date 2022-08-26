function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function playRound(playerChoice, computerChoice) {
    if(playerChoice === computerChoice) {
        return "It's a draw!";
    } else if ((playerChoice + 1) % 3 === computerChoice) {
        return "Computer wins!";
    } else {
        return "You won!";
    }
}
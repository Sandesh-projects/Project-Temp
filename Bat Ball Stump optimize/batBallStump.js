// Function to get the computer's choice
function getComputerChoice() {
    const randomNumber = Math.random() * 3;
    if (randomNumber < 1) return 'bat';
    if (randomNumber < 2) return 'ball';
    return 'stump';
}

// Function to get the result message
function getResultMessage(userChoice, computerChoice) {
    if (userChoice === computerChoice) return "It's a tie!";
    if ((userChoice === 'bat' && computerChoice === 'ball') ||
        (userChoice === 'ball' && computerChoice === 'stump') ||
        (userChoice === 'stump' && computerChoice === 'bat')) {
        return "You've Won!";
    }
    return "You've Lost!";
}

// Function to display the computer's choice
function displayComputerChoice(computerChoice) {
    // Hide all choices first
    document.getElementById('computer-bat').style.display = 'none';
    document.getElementById('computer-ball').style.display = 'none';
    document.getElementById('computer-stump').style.display = 'none';

    // Display the chosen image
    if (computerChoice === 'bat') {
        document.getElementById('computer-bat').style.display = 'inline-block';
    } else if (computerChoice === 'ball') {
        document.getElementById('computer-ball').style.display = 'inline-block';
    } else {
        document.getElementById('computer-stump').style.display = 'inline-block';
    }
}

// Function to handle the user's choice
function handleUserChoice(userChoice) {
    const computerChoice = getComputerChoice();
    const resultMsg = getResultMessage(userChoice, computerChoice);

    // Update the result message
    document.getElementById('result-message').textContent = `Computer chose ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}. ${resultMsg}`;

    // Display the computer's choice
    displayComputerChoice(computerChoice);
}

// Adding event listeners to buttons
document.querySelector('.bat').addEventListener('click', () => handleUserChoice('bat'));
document.querySelector('.ball').addEventListener('click', () => handleUserChoice('ball'));
document.querySelector('.stump').addEventListener('click', () => handleUserChoice('stump'));

// Game State
const gameState = {
    score: 0,
    timer: 240,
    streak: 0,
    bestStreak: 0,
    isPlaying: false,
    currentQuestionIndex: 0,
    totalClicks: 0,
    correctClicks: 0,
    currentHammerPosition: 0,
    hammerSpeed: 1200, // milliseconds - starts fast
    questions: [],
    currentRound: 1,
    currentCycle: 0, // Track how many complete cycles (0-5 for 6 cycles)
    movesInCurrentCycle: 0 // Track moves within current cycle
};

// Color configurations
const colors = ['blue', 'green', 'purple', 'red'];
const colorNames = {
    blue: 'Search Engine',
    green: 'Traditional AI',
    purple: 'Gen AI',
    red: 'Agentic AI'
};

// Predefined questions with answers
const predefinedQuestions = [
    { text: "Writing a funny rap song about homework.", color: "purple", aiType: "Gen AI" },
    { text: "Who won the Football World Cup in 2022?", color: "blue", aiType: "Search Engine" },
    { text: "A self-driving car turning the steering wheel.", color: "red", aiType: "Agentic AI" },
    { text: "YouTube recommending a video you might like.", color: "green", aiType: "Traditional AI" },
    { text: "Show me a list of pizza restaurants nearby.", color: "blue", aiType: "Search Engine" },
    { text: "Drawing a picture of a cat wearing astronaut gear.", color: "purple", aiType: "Gen AI" },
    { text: "Your email marking a message as 'Spam'.", color: "green", aiType: "Traditional AI" },
    { text: "A bot actually booking and paying for your movie ticket.", color: "red", aiType: "Agentic AI" },
    { text: "Find the exact date of the next full moon.", color: "blue", aiType: "Search Engine" },
    { text: "Scanning your face to unlock your phone.", color: "green", aiType: "Traditional AI" },
    { text: "Summarizing a 20-page story into three sentences.", color: "purple", aiType: "Gen AI" },
    { text: "A smart home system automatically locking the doors at night.", color: "red", aiType: "Agentic AI" }
];

// Scoring system based on cycles (not attempts)
// Cycles 1-2: 5 points, Cycles 3-4: 3 points, Cycles 5-6: 2 points
function getPointsForCurrentCycle() {
    if (gameState.currentCycle < 2) return 5;
    if (gameState.currentCycle < 4) return 3;
    if (gameState.currentCycle < 6) return 2;
    return 0;
}

function getSpeedForCurrentCycle() {
    if (gameState.currentCycle < 2) return 1200; // Fast
    if (gameState.currentCycle < 4) return 1800; // Medium
    if (gameState.currentCycle < 6) return 2500; // Slow
    return 2500;
}

// DOM Elements
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const streakDisplay = document.getElementById('streak');
const questionText = document.getElementById('questionText');
const questionCard = document.getElementById('questionCard');
const questionFeedback = document.getElementById('questionFeedback');
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreDisplay = document.getElementById('finalScore');
const bestStreakDisplay = document.getElementById('bestStreak');
const accuracyDisplay = document.getElementById('accuracy');
const hammer = document.getElementById('hammer');
const moleContainers = document.querySelectorAll('.mole-container');
const mole = document.getElementById('mole');

// Initialize Game
function initGame() {
    generateQuestions();
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);
    playAgainBtn.addEventListener('click', restartGame);
    
    // Add click listeners to mole containers
    moleContainers.forEach(container => {
        container.addEventListener('click', handleMoleClick);
    });
}

// Generate questions from predefined list
function generateQuestions() {
    gameState.questions = predefinedQuestions.map(q => ({
        ...q,
        completed: false,
        correct: null
    }));
}

// No longer need to render questions list since we show only current question

// Update current question display
function updateCurrentQuestion() {
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        endGame();
        return;
    }
    
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const questionNumber = gameState.currentQuestionIndex + 1;
    questionText.textContent = `Q${questionNumber}. ${currentQuestion.text}`;
    questionFeedback.textContent = '';
    
    // Reset question card styling
    questionCard.classList.remove('correct', 'incorrect');
    
    // Reset cycle counter for new question
    gameState.currentCycle = 0;
    gameState.movesInCurrentCycle = 0;
    
    // Update speed based on current cycle
    gameState.hammerSpeed = getSpeedForCurrentCycle();
}

// Start Game
function startGame() {
    gameState.score = 0;
    gameState.timer = 240;
    gameState.streak = 0;
    gameState.bestStreak = 0;
    gameState.currentQuestionIndex = 0;
    gameState.totalClicks = 0;
    gameState.correctClicks = 0;
    gameState.isPlaying = true;
    gameState.currentHammerPosition = 0;
    gameState.hammerSpeed = 1200;
    
    generateQuestions();
    updateCurrentQuestion();
    updateDisplay();
    
    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    
    // Start timer
    const timerInterval = setInterval(() => {
        if (!gameState.isPlaying) {
            clearInterval(timerInterval);
            return;
        }
        
        gameState.timer--;
        timerDisplay.textContent = gameState.timer;
        
        if (gameState.timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    
    // Set initial hammer position before starting movement
    setInitialHammerPosition();
    
    // Start hammer movement
    startHammerMovement();
}

// Set initial hammer position
function setInitialHammerPosition() {
    const panelRect = document.querySelector('.moles-section').getBoundingClientRect();
    const moleGrid = document.querySelector('.moles-grid').getBoundingClientRect();
    
    // Calculate center of the grid
    const centerX = (moleGrid.left + moleGrid.right) / 2 - panelRect.left;
    const centerY = (moleGrid.top + moleGrid.bottom) / 2 - panelRect.top;
    
    // Position hammer at center of grid
    hammer.style.left = `${centerX}px`;
    hammer.style.top = `${centerY}px`;
}

// Hammer movement
function startHammerMovement() {
    if (!gameState.isPlaying) return;
    
    moveHammer();
}

function moveHammer() {
    if (!gameState.isPlaying) return;
    
    const molePositions = Array.from(moleContainers);
    const currentContainer = molePositions[gameState.currentHammerPosition];
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Remove active class and reset position
    mole.classList.remove('active', 'blue', 'green', 'purple', 'red');
    
    // Remove inline styles to let CSS handle positioning
    mole.style.left = '';
    mole.style.top = '';
    
    // Move mole to current container
    currentContainer.appendChild(mole);
    
    // Add color class based on current hole
    const holeColor = currentContainer.dataset.color;
    mole.classList.add(holeColor);
    
    // Make mole pop up
    setTimeout(() => {
        mole.classList.add('active');
    }, 50);
    
    // Move to next position
    gameState.currentHammerPosition = (gameState.currentHammerPosition + 1) % molePositions.length;
    gameState.movesInCurrentCycle++;
    
    // Check if we completed a full cycle (visited all 4 moles)
    if (gameState.movesInCurrentCycle >= 4) {
        gameState.currentCycle++;
        gameState.movesInCurrentCycle = 0;
        
        // Update speed for next cycle
        gameState.hammerSpeed = getSpeedForCurrentCycle();
        
        // Check if we've completed 6 cycles without an answer
        if (gameState.currentCycle >= 6) {
            handleUnansweredQuestion();
            // Don't return - continue moving hammer
        }
    }
    
    setTimeout(moveHammer, gameState.hammerSpeed);
}

// Handle mole click
function handleMoleClick(event) {
    if (!gameState.isPlaying) return;
    
    const clickedContainer = event.currentTarget;
    const clickedColor = clickedContainer.dataset.color;
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    if (!currentQuestion) return;
    
    // Check if mole is currently in this hole
    const moleRect = mole.getBoundingClientRect();
    const containerRect = clickedContainer.getBoundingClientRect();
    
    // Simple overlap check
    const isInHole = (
        moleRect.left < containerRect.right &&
        moleRect.right > containerRect.left &&
        moleRect.top < containerRect.bottom &&
        moleRect.bottom > containerRect.top &&
        mole.classList.contains('active')
    );
    
    if (!isInHole) return;
    
    gameState.totalClicks++;
    
    // Animate hammer to mole position and hit
    animateHammerToMole(clickedContainer);
    
    if (clickedColor === currentQuestion.color) {
        // Correct answer!
        handleCorrectAnswer(clickedContainer);
    } else {
        // Wrong color
        handleWrongColor(clickedContainer);
    }
}

// Animate hammer to mole and strike
function animateHammerToMole(container) {
    const panelRect = document.querySelector('.moles-section').getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate position to move hammer to
    const targetX = containerRect.left + containerRect.width / 2 - panelRect.left;
    const targetY = containerRect.top + containerRect.height / 2 - panelRect.top;
    
    // Move hammer to target position
    hammer.style.transition = 'left 0.15s ease, top 0.15s ease';
    hammer.style.left = `${targetX}px`;
    hammer.style.top = `${targetY}px`;
    
    // Add hitting class with rotation
    hammer.classList.add('hitting');
    
    // Return to center and remove hitting class
    setTimeout(() => {
        hammer.classList.remove('hitting');
        
        // Move back to center
        const moleGrid = document.querySelector('.moles-grid').getBoundingClientRect();
        const centerX = (moleGrid.left + moleGrid.right) / 2 - panelRect.left;
        const centerY = (moleGrid.top + moleGrid.bottom) / 2 - panelRect.top;
        
        hammer.style.left = `${centerX}px`;
        hammer.style.top = `${centerY}px`;
    }, 300);
}

// Handle correct answer
function handleCorrectAnswer(container) {
    mole.classList.add('hit');
    setTimeout(() => mole.classList.remove('hit'), 500);
    
    // Get points based on current cycle
    const points = getPointsForCurrentCycle();
    
    gameState.score += points;
    gameState.streak++;
    gameState.correctClicks++;
    
    if (gameState.streak > gameState.bestStreak) {
        gameState.bestStreak = gameState.streak;
    }
    
    // Show correct feedback
    questionCard.classList.add('correct');
    questionFeedback.textContent = '✅';
    
    // Mark question as completed and correct
    gameState.questions[gameState.currentQuestionIndex].completed = true;
    gameState.questions[gameState.currentQuestionIndex].correct = true;
    gameState.questions[gameState.currentQuestionIndex].pointsEarned = points;
    
    // Update display immediately
    updateDisplay();
    
    // Move to next question after a delay
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        updateCurrentQuestion();
        renderQuestionsList();
    }, 1000);
}

// Handle wrong color
function handleWrongColor(container) {
    const mole = container.querySelector('.mole');
    mole.classList.add('hit');
    setTimeout(() => mole.classList.remove('hit'), 500);
    
    // Only reset streak, don't deduct points
    gameState.streak = 0;
    
    // Show incorrect feedback
    questionCard.classList.add('incorrect');
    questionFeedback.textContent = '❌';
    
    // Mark question as completed but wrong
    gameState.questions[gameState.currentQuestionIndex].completed = true;
    gameState.questions[gameState.currentQuestionIndex].correct = false;
    gameState.questions[gameState.currentQuestionIndex].pointsEarned = 0;
    
    // Update display immediately
    updateDisplay();
    
    // Move to next question after a delay
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        updateCurrentQuestion();
        renderQuestionsList();
    }, 1000);
}

// Handle unanswered question (after 6 cycles)
function handleUnansweredQuestion() {
    if (!gameState.isPlaying) return;
    
    // Mark question as completed but wrong (no answer after 6 cycles)
    gameState.questions[gameState.currentQuestionIndex].completed = true;
    gameState.questions[gameState.currentQuestionIndex].correct = false;
    gameState.questions[gameState.currentQuestionIndex].pointsEarned = 0;
    
    gameState.streak = 0;
    
    // Move to next question
    gameState.currentQuestionIndex++;
    
    // Check if there are more questions
    if (gameState.currentQuestionIndex < gameState.questions.length) {
        updateCurrentQuestion();
        renderQuestionsList();
    } else {
        // No more questions, end the game
        endGame();
    }
}

// Handle wrong mole (hammer not on clicked mole)
function handleWrongMole() {
    // Only reset streak, don't deduct points
    gameState.streak = 0;
    updateDisplay();
}

// Update display
function updateDisplay() {
    scoreDisplay.textContent = gameState.score;
    streakDisplay.textContent = gameState.streak;
}

// End Game
function endGame() {
    gameState.isPlaying = false;
    
    const accuracy = gameState.totalClicks > 0 
        ? Math.round((gameState.correctClicks / gameState.totalClicks) * 100) 
        : 0;
    
    finalScoreDisplay.textContent = gameState.score;
    bestStreakDisplay.textContent = gameState.bestStreak;
    accuracyDisplay.textContent = accuracy;
    
    gameOverModal.classList.add('show');
}

// Restart Game
function restartGame() {
    // Stop the game
    gameState.isPlaying = false;
    
    // Clear intervals
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    if (gameState.hammerInterval) {
        clearInterval(gameState.hammerInterval);
        gameState.hammerInterval = null;
    }
    
    // Hide modal
    gameOverModal.classList.remove('show');
    
    // Show start button, hide restart button
    startBtn.style.display = 'block';
    restartBtn.style.display = 'none';
    
    // Reset all game state
    gameState.score = 0;
    gameState.timer = 240;
    gameState.streak = 0;
    gameState.currentQuestionIndex = 0;
    gameState.hammerSpeed = 1200;
    gameState.currentHammerPosition = 0;
    gameState.currentCycle = 0;
    gameState.movesInCurrentCycle = 0;
    
    // Hide and reset mole
    mole.classList.remove('active', 'blue', 'green', 'purple', 'red');
    mole.style.left = '';
    mole.style.top = '';
    
    // Reset question display
    questionText.textContent = 'Click Start to Begin!';
    questionFeedback.textContent = '';
    questionCard.classList.remove('correct', 'incorrect');
    
    // Update displays
    updateDisplay();
    timerDisplay.textContent = 240;
    
    // Generate new questions
    generateQuestions();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

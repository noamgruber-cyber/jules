const quizData = [
    {
        question: "Which chart type shows the Open, High, Low, and Close prices?",
        options: ["Line Chart", "Bar Chart (OHLC)", "Area Chart", "Pie Chart"],
        answer: 1 // Index of the correct option
    },
    {
        question: "A Head and Shoulders pattern typically signals what?",
        options: ["A bullish continuation", "A bearish continuation", "A bearish reversal", "A bullish reversal"],
        answer: 2
    },
    {
        question: "What does an RSI above 70 typically indicate?",
        options: ["The asset is oversold", "The asset is overbought", "A strong downtrend", "Low volatility"],
        answer: 1
    },
    {
        question: "Which level acts as a 'floor' where price tends to stop falling?",
        options: ["Resistance", "Moving Average", "Support", "MACD"],
        answer: 2
    },
    {
        question: "In technical analysis, what should rising price trends ideally be accompanied by?",
        options: ["Decreasing volume", "Rising volume", "Flat volume", "No volume"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOptionIndex = null;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const quizProgress = document.getElementById('quiz-progress');
const quizBody = document.getElementById('quiz-body');
const quizFooter = document.getElementById('quiz-footer');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    selectedOptionIndex = null;
    submitBtn.disabled = true;
    submitBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';

    const currentQuizData = quizData[currentQuestion];
    questionText.innerText = currentQuizData.question;
    quizProgress.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;

    optionsContainer.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectOption(index, button) {
    // Deselect all previously selected options
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => opt.classList.remove('selected'));

    // Select the clicked option
    button.classList.add('selected');
    selectedOptionIndex = index;
    submitBtn.disabled = false;
}

submitBtn.addEventListener('click', () => {
    if (selectedOptionIndex === null) return;

    const options = document.querySelectorAll('.option-btn');
    const correctIndex = quizData[currentQuestion].answer;

    options.forEach((opt, index) => {
        opt.disabled = true; // Disable further clicking
        if (index === correctIndex) {
            opt.classList.add('correct');
        } else if (index === selectedOptionIndex && selectedOptionIndex !== correctIndex) {
            opt.classList.add('wrong');
        }
    });

    if (selectedOptionIndex === correctIndex) {
        score++;
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
});

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizBody.style.display = 'none';
    quizFooter.style.display = 'none';
    document.getElementById('quiz-header').style.display = 'none';

    resultContainer.style.display = 'block';
    scoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;

    quizBody.style.display = 'block';
    quizFooter.style.display = 'block';
    document.getElementById('quiz-header').style.display = 'block';
    resultContainer.style.display = 'none';

    loadQuestion();
});

// Initialize the quiz
if (questionText && optionsContainer) {
    loadQuestion();
}

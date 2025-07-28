const words = [
    "develop", "keyboard", "speed", "project", "coffee", "challenge", "energy", "code", "focus", "learning",
    "javascript", "github", "function", "variable", "object", "array", "loop", "return", "debug", "console"
  ];
  
  let currentWord = '';
  let score = 0;
  let totalTyped = 0;
  let timeLeft = 60;
  let interval;
  
  const wordDisplay = document.getElementById('wordDisplay');
  const wordInput = document.getElementById('wordInput');
  const timer = document.getElementById('timer');
  const wpm = document.getElementById('wpm');
  const accuracy = document.getElementById('accuracy');
  const startBtn = document.getElementById('startBtn');
  
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  
  function startGame() {
    score = 0;
    totalTyped = 0;
    timeLeft = 60;
    wordInput.value = '';
    wordInput.disabled = false;
    wordInput.focus();
  
    currentWord = getRandomWord();
    wordDisplay.innerText = currentWord;
  
    timer.innerText = `Time: ${timeLeft}s`;
    wpm.innerText = `WPM: 0`;
    accuracy.innerText = `Accuracy: 100%`;
  
    clearInterval(interval);
    interval = setInterval(() => {
      timeLeft--;
      timer.innerText = `Time: ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        endGame();
      }
    }, 1000);
  }
  
  function endGame() {
    wordInput.disabled = true;
    wordDisplay.innerText = 'Game over! Click start to try again.';
  }
  
  wordInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const typedWord = wordInput.value.trim();
      totalTyped++;
  
      if (typedWord === currentWord) {
        score++;
      }
  
      currentWord = getRandomWord();
      wordDisplay.innerText = currentWord;
      wordInput.value = '';
  
      const minutes = (60 - timeLeft) / 60;
      const wpmValue = Math.round(score / minutes || 0);
      const accuracyValue = Math.round((score / totalTyped) * 100 || 100);
  
      wpm.innerText = `WPM: ${wpmValue}`;
      accuracy.innerText = `Accuracy: ${accuracyValue}%`;
    }
  });
  
  startBtn.addEventListener('click', startGame);
  
const word = document.querySelector('#word'),
  text = document.querySelector('#text'),
  scoreEl = document.querySelector('#score'),
  timeEl = document.querySelector('#time'),
  endgameEl = document.querySelector('#end-game-container'),
  settingsBtn = document.querySelector('#settings-btn'),
  settings = document.querySelector('#settings'),
  settingsForm = document.querySelector('#settings-form'),
  difficultySelect = document.querySelector('#difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlord',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let randomWord,
  score = 0,
  time = 10,
  difficulty =
    localStorage.getItem('difficulty') !== null
      ? localStorage.getItem('difficulty')
      : 'medium';

difficultySelect.value = difficulty;

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function displayRandomWord() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="location.reload()">Try again</button>
  `;
  endgameEl.style.display = 'flex';
}

displayRandomWord();

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    displayRandomWord();
    updateScore();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

// ============================================================
// APP LOGIC - shouldn't need to change this to add questions.
// Edit questions.js instead.
// ============================================================

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const completeScreen = document.getElementById('complete-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const backBtn = document.getElementById('back-btn');

const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const imagePlaceholder = document.getElementById('image-placeholder');
const answersGrid = document.getElementById('answers-grid');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const retryBtn = document.getElementById('retry-btn');
const imageBox = document.getElementById('image-box');

const MOBILE_BREAKPOINT = 600;

// Lets question/answer text use **bold** (like Markdown) without allowing raw HTML.
function renderRichText(el, text) {
  const escaped = text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  el.innerHTML = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

let currentIndex = 0;
let questionSolved = false;
let quizQuestions = QUESTIONS;

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function showScreen(screen) {
  [startScreen, quizScreen, completeScreen].forEach(s => s.classList.add('hidden'));
  quizScreen.classList.remove('fade-out');
  screen.classList.remove('hidden');
}

function loadQuestion(index) {
  questionSolved = false;
  const question = quizQuestions[index];

  renderRichText(questionText, question.text);

  feedbackOverlay.classList.add('hidden');
  feedbackOverlay.classList.remove('correct', 'incorrect');
  feedbackOverlay.removeAttribute('style');
  nextBtn.classList.add('hidden');
  retryBtn.classList.add('hidden');

  if (question.image) {
    questionImage.src = question.image;
    questionImage.alt = question.text;
    questionImage.classList.remove('hidden');
    imagePlaceholder.classList.add('hidden');
    questionImage.onerror = () => {
      questionImage.classList.add('hidden');
      imagePlaceholder.classList.remove('hidden');
    };
  } else {
    questionImage.removeAttribute('src');
    questionImage.classList.add('hidden');
    imagePlaceholder.classList.remove('hidden');
  }

  answersGrid.innerHTML = '';
  shuffle(question.answers).forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';

    const badge = document.createElement('span');
    badge.className = 'answer-badge';
    badge.textContent = String.fromCharCode(65 + i); // A, B, C, D...
    btn.appendChild(badge);
    btn.appendChild(document.createTextNode(answer.text));

    btn.addEventListener('click', () => selectAnswer(btn, answer));
    answersGrid.appendChild(btn);
  });
}

// On mobile, the overlay grows to cover the answers too, so it needs to be
// sized/positioned in JS to match the combined area of the image and answers.
function positionFeedbackOverlay() {
  if (window.innerWidth > MOBILE_BREAKPOINT) return;
  const imageRect = imageBox.getBoundingClientRect();
  const gridRect = answersGrid.getBoundingClientRect();
  feedbackOverlay.style.top = `${imageRect.top}px`;
  feedbackOverlay.style.left = `${imageRect.left}px`;
  feedbackOverlay.style.width = `${imageRect.width}px`;
  feedbackOverlay.style.height = `${gridRect.bottom - imageRect.top}px`;
}

window.addEventListener('resize', () => {
  if (!feedbackOverlay.classList.contains('hidden')) positionFeedbackOverlay();
});

function selectAnswer(button, answer) {
  // Clear any previous selection highlight so only the latest pick is shown.
  answersGrid.querySelectorAll('.answer-btn').forEach(btn => {
    btn.classList.remove('correct', 'incorrect');
  });

  feedbackOverlay.classList.remove('hidden', 'correct', 'incorrect');
  renderRichText(feedbackText, answer.explanation);
  positionFeedbackOverlay();

  if (answer.correct) {
    questionSolved = true;
    button.classList.add('correct');
    feedbackOverlay.classList.add('correct');
    feedbackTitle.textContent = 'Correct!';
  } else {
    button.classList.add('incorrect');
    feedbackOverlay.classList.add('incorrect');
    feedbackTitle.textContent = 'Incorrect..';
  }

  // Once solved, keep letting the user explore other answers and always offer to move on.
  nextBtn.classList.toggle('hidden', !questionSolved);
  retryBtn.classList.toggle('hidden', questionSolved);
}

retryBtn.addEventListener('click', () => {
  feedbackOverlay.classList.add('hidden');
});

const FADE_MS = 250;
const MAX_IMAGE_WAIT_MS = 500;

function goToNextQuestion() {
  currentIndex++;
  if (currentIndex >= quizQuestions.length) {
    showScreen(completeScreen);
  } else {
    transitionToQuestion(currentIndex);
  }
}

// Fades the current question out, swaps in the next one, then fades back in
// once its image has loaded (or after a timeout, so a slow image can't stall it).
function transitionToQuestion(index) {
  quizScreen.classList.add('fade-out');
  setTimeout(() => {
    loadQuestion(index);
    fadeInWhenImageReady();
  }, FADE_MS);
}

function fadeInWhenImageReady() {
  const fadeIn = () => quizScreen.classList.remove('fade-out');
  if (!quizQuestions[currentIndex].image) {
    fadeIn();
    return;
  }
  const timer = setTimeout(fadeIn, MAX_IMAGE_WAIT_MS);
  const done = () => {
    clearTimeout(timer);
    fadeIn();
  };
  questionImage.addEventListener('load', done, { once: true });
  questionImage.addEventListener('error', done, { once: true });
}

function startQuiz() {
  quizQuestions = shuffle(QUESTIONS);
  currentIndex = 0;
  loadQuestion(currentIndex);
  showScreen(quizScreen);
}

startBtn.addEventListener('click', startQuiz);

restartBtn.addEventListener('click', startQuiz);

backBtn.addEventListener('click', () => {
  showScreen(startScreen);
});

nextBtn.addEventListener('click', goToNextQuestion);

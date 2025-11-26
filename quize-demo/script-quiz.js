// script-quiz.js
document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let totalScore_a = 0;
  let totalScore_b = 0;

  const quizContent = document.getElementById('quiz-content');
  const quizStatus = document.getElementById('quiz-status');
  const nextButton = document.getElementById('next-button');
  const resultScreen = document.getElementById('result-screen');
  const restartButton = document.getElementById('restart-button');

  // === 1. クイズの描画 ===
  function renderQuestion() {
      if (currentQuestionIndex >= QUIZ_CONFIG.QUESTIONS.length) {
          showResult();
          return;
      }

      const q = QUIZ_CONFIG.QUESTIONS[currentQuestionIndex];
      quizStatus.textContent = `質問 ${currentQuestionIndex + 1} / ${QUIZ_CONFIG.QUESTIONS.length}`;
      quizContent.innerHTML = `
          <h4>${q.text}</h4>
          <div class="answers">
              ${q.answers.map((ans, index) => `
                  <label>
                      <input type="radio" name="answer" value="${index}" data-score-a="${ans.score_a}" data-score-b="${ans.score_b}">
                      ${ans.text}
                  </label>
              `).join('<br>')}
          </div>
      `;

      nextButton.style.display = 'none'; // 回答するまでボタンを隠す
      document.querySelectorAll('input[name="answer"]').forEach(radio => {
          radio.addEventListener('change', () => {
              nextButton.style.display = 'block';
          });
      });
  }

  // === 2. 次の質問へ進む処理 ===
  nextButton.addEventListener('click', () => {
      const selectedAnswer = document.querySelector('input[name="answer"]:checked');
      if (!selectedAnswer) return;

      // スコアの加算
      totalScore_a += parseInt(selectedAnswer.getAttribute('data-score-a'));
      totalScore_b += parseInt(selectedAnswer.getAttribute('data-score-b'));

      currentQuestionIndex++;
      renderQuestion();
  });

  // === 3. 結果の表示 ===
  function showResult() {
      quizContent.style.display = 'none';
      quizStatus.style.display = 'none';
      nextButton.style.display = 'none';
      
      // AとBの差分で結果を判定 (ここではシンプルにAスコアの大きさに依存)
      const finalScore = totalScore_a; 

      let result = QUIZ_CONFIG.RESULTS.find(r => finalScore >= r.min_score);

      // 結果をDOMに反映
      document.getElementById('result-title').textContent = result.title;
      document.getElementById('result-description').textContent = result.description;

      resultScreen.style.display = 'block';
      restartButton.style.display = 'block';
  }

  // === 4. リスタート処理 ===
  restartButton.addEventListener('click', () => {
      currentQuestionIndex = 0;
      totalScore_a = 0;
      totalScore_b = 0;

      resultScreen.style.display = 'none';
      restartButton.style.display = 'none';
      quizContent.style.display = 'block';
      quizStatus.style.display = 'block';
      renderQuestion();
  });

  // 初回実行
  renderQuestion();
});
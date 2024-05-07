function submitExam() {
  const form = document.getElementById('exam-form');
  const resultsDiv = document.getElementById('results');
  const questions = form.querySelectorAll('.question');
  let score = 0;

  resultsDiv.innerHTML = '';

  questions.forEach((question, index) => {
    const selectedOption = question.querySelector('input[type="radio"]:checked');

    if (selectedOption && selectedOption.value === correctAnswers[index]) {
      score++;
      question.classList.add('correct');
      resultsDiv.innerHTML += `<p>Question ${index + 1}: Correct!</p>`;
    } else {
      question.classList.add('wrong');
      const correctOption = question.querySelector(`input[value="${correctAnswers[index]}"]`);
      if (correctOption) correctOption.parentNode.classList.add('correct');
      resultsDiv.innerHTML += `<p>Question ${index + 1}: Incorrect! Correct answer: ${correctAnswers[index]}</p>`;
    }
  });

  const percentage = (score / questions.length) * 100;
  resultsDiv.innerHTML += `<p>Your score: ${score}/${questions.length} (${percentage.toFixed(2)}%)</p>`;

  // Send data to server-side script (POST request)
  fetch('submit_exam.php', {
    method: 'POST',
    body: new URLSearchParams({
      score: score,
      totalQuestions: questions.length,
      percentage: percentage,
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Display success or error message from the server
  })
  .catch(error => {
    console.error('Error submitting exam results:', error);
    // Display an error message to the user
  });
}
const correctAnswers = ['int numbers[10]', 'arr[2]', 'O(1)'];
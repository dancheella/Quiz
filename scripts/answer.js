(function () {
  const Answer = {
    quiz: null,
    right: null,
    answersElement: null,
    currentQuestionIndex: 1,
    questionTitleElement: null,
    results: null,
    // answerInfo: null,
    init() {
      const url = new URL(location.href);
      const testId = url.searchParams.get('testId');

      if (testId) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
        xhr.send();
        if (xhr.status === 200 && xhr.responseText) {
          try {
            this.quiz = JSON.parse(xhr.responseText);
          } catch (e) {
            location.href = 'index.html';
          }
        } else {
          location.href = 'index.html';
        }
      } else {
        location.href = 'index.html';
      }

      if (testId) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
        xhr.send();
        if (xhr.status === 200 && xhr.responseText) {
          try {
            this.right = JSON.parse(xhr.responseText);
          } catch (e) {
            location.href = 'index.html';
          }
        } else {
          location.href = 'index.html';
        }
      } else {
        location.href = 'index.html';
      }

      this.showQuestion();
      this.history();
    },
    showQuestion() {
      document.getElementById('pre-title').innerText = this.quiz.name;
      // this.fields = document.getElementById('answer-info').innerHTML = name + ' ' + lastName + ', ' + email;

      this.optionsElement = document.getElementById('answers');

      this.optionsElement.innerHTML = '';

      this.quiz.questions.forEach(question => {
        this.questionTitleElement = document.createElement('div');
        this.questionTitleElement.className = 'common-question-title';
        this.questionTitleElement.classList.add('answer-question-title');

        const optionElement = document.createElement('div');
        optionElement.className = 'common-question-options';

        this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + question.question;
        this.currentQuestionIndex++;
        optionElement.appendChild(this.questionTitleElement);

        question.answers.forEach(answer => {
          const answerItem = document.createElement('div');
          answerItem.className = 'common-question-option';

          const inputId = 'answer-' + answer.id;

          const inputElement = document.createElement('input');
          inputElement.className = 'option-answer';
          inputElement.setAttribute('id', inputId);
          inputElement.setAttribute('type', 'radio');
          inputElement.setAttribute('name', 'answer');
          inputElement.setAttribute('value', answer.id);

          const labelElement = document.createElement('label');
          labelElement.setAttribute('for', inputId);
          labelElement.innerText = answer.answer;

          answerItem.appendChild(inputElement);
          answerItem.appendChild(labelElement);

          optionElement.appendChild(answerItem);
        });

        this.optionsElement.appendChild(optionElement);
      });
      this.result();
    },
    result() {
      const url = new URL(location.href);
      const results = url.searchParams.get('results').split(',');

      const that = this;
      let optionElementsId = Array.from(document.getElementsByClassName('option-answer'));

      console.log(results);
      console.log(that.right);

      for (let i = 0; i < that.right.length; i++) {

        const right = that.right[i];
        optionElementsId.forEach(optionElementsId => {

          if (Number(results[i]) === Number(optionElementsId.value)) {
            if (Number(results[i]) === Number(right)) {
              optionElementsId.classList.add('correct');
            } else {
              optionElementsId.classList.add('incorrect');
            }
          }
        });
      }
    },
    history() {
      const backButton = document.querySelector('#result');
      backButton.addEventListener('click', () => {
        history.back();
      });
    }
  }
  Answer.init();
})();
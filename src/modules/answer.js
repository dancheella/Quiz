import {UrlManager} from "../utils/url-manager.js";

export class Answer {

  constructor() {
    this.quiz = null;
    this.right = null;
    this.currentQuestionIndex = 1;
    this.questionTitleElement = null;
    this.results = null;
    this.answerInfo = null;

    this.routeParams = UrlManager.getQueryParams();
    UrlManager.checkUserData(this.routeParams);

    if (this.routeParams.id) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://testologia.site/get-quiz?id=' + this.routeParams.id, false);
      xhr.send();

      if (xhr.status === 200 && xhr.responseText) {
        try {
          this.quiz = JSON.parse(xhr.responseText);
        } catch (e) {
          location.href = '#/';
        }
        this.answerInfo = this.routeParams.name + ' ' + this.routeParams.lastName + ', ' + this.routeParams.email;
        document.getElementById('answer-info').innerHTML = this.answerInfo;
      } else {
        location.href = '#/';
      }
    } else {
      location.href = '#/';
    }

    if (this.routeParams.id) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + this.routeParams.id, false);
      xhr.send();
      if (xhr.status === 200 && xhr.responseText) {
        try {
          this.right = JSON.parse(xhr.responseText);
        } catch (e) {
          location.href = '#/';
        }
      } else {
        location.href = '#/';
      }
    } else {
      location.href = '#/';
    }

    this.showQuestion();
    this.history();
  }

  showQuestion() {
    document.getElementById('pre-title').innerText = this.quiz.name;

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
  }

  result() {
    this.routeParams.results = this.routeParams.results.split(',');

    const that = this;
    let optionElementsId = Array.from(document.getElementsByClassName('option-answer'));

    for (let i = 0; i < that.right.length; i++) {

      const right = that.right[i];
      optionElementsId.forEach(optionElementsId => {

        if (Number(this.routeParams.results[i]) === Number(optionElementsId.value)) {
          if (Number(this.routeParams.results[i]) === Number(right)) {
            optionElementsId.classList.add('correct');
          } else {
            optionElementsId.classList.add('incorrect');
          }
        }
      });
    }
  }

  history() {
    const backButton = document.querySelector('#results');
    backButton.addEventListener('click', () => {
      history.back();
    });
  }
}
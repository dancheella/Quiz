import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {QueryParamsType} from "../types/query-params.type";
import {QuizAnswersType, QuizQuestionType, QuizResponseType} from "../types/quiz.type";
import {DefaultResponseType} from "../types/default-response.type";
import {UserInfoType} from "../types/user-info.type";

export class Answer {
  private quiz: QuizResponseType | null;
  private optionsElement: HTMLElement | null;
  private questionTitleElement: HTMLElement | null;
  private currentQuestionIndex: number;
  private routeParams: QueryParamsType;

  constructor() {
    this.quiz = null;
    this.optionsElement = null;
    this.questionTitleElement = null;
    this.currentQuestionIndex = 1;
    this.routeParams = UrlManager.getQueryParams();

    this.init();

    const that: Answer = this;
    const resultElement: HTMLElement | null = document.getElementById('results');
    if (resultElement) {
      resultElement.onclick = function (): void {
        that.history();
      }
    }
  }

  private async init(): Promise<void> {
    const userInfo: UserInfoType | null = Auth.getUserInfo();
    if (!userInfo) {
      location.href = '#/';
      return;
    }

    if (this.routeParams.id) {
      try {
        const result: DefaultResponseType | QuizResponseType = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);
        if (result) {
          if ((result as DefaultResponseType).error !== undefined) {
            throw new Error((result as DefaultResponseType).message);
          }

          const answerInfoElement: HTMLElement | null = document.getElementById('answer-info');
          if (answerInfoElement) {
            answerInfoElement.innerText = userInfo.fullName + ', ' + userInfo.email;
          }

          this.quiz = result as QuizResponseType;
          this.showQuestion();
          return;
        }
      } catch (error) {
        console.log(error)
      }
    }
    location.href = "#/"
  }

  private showQuestion(): void {
    if (!this.quiz) return;

    const preTitleElement: HTMLElement | null = document.getElementById('pre-title');
    if (preTitleElement) {
      preTitleElement.innerText = this.quiz.test.name;
    }

    this.optionsElement = document.getElementById('answers');
    if (this.optionsElement) {
      this.optionsElement.innerHTML = '';
    }

    this.quiz.test.questions.forEach((question: QuizQuestionType) => {
      this.questionTitleElement = document.createElement('div');
      this.questionTitleElement.className = 'common-question-title';
      this.questionTitleElement.classList.add('answer-question-title');

      const optionElement: HTMLElement | null = document.createElement('div');
      optionElement.className = 'common-question-options';


      if (this.questionTitleElement) {
        this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
          + ':</span> ' + question.question;
      }

      this.currentQuestionIndex++;
      optionElement.appendChild(this.questionTitleElement);

      question.answers.forEach((answer: QuizAnswersType) => {
        const answerItem: HTMLElement | null = document.createElement('div');
        answerItem.className = 'common-question-option';

        const inputId: number = answer.id;

        const inputElement: HTMLElement | null = document.createElement('input');
        inputElement.className = 'option-answer';
        inputElement.setAttribute('id', inputId.toString());
        inputElement.setAttribute('type', 'radio');
        inputElement.setAttribute('name', 'answer');
        inputElement.setAttribute('value', answer.id.toString());

        const labelElement: HTMLElement | null = document.createElement('label');
        labelElement.setAttribute('for', inputId.toString());
        labelElement.innerText = answer.answer;

        if (answer.correct === true) {
          labelElement.classList.add('answer-correct');
          inputElement.className = 'correct';
        }
        if (answer.correct === false) {
          labelElement.classList.add('answer-incorrect');
          inputElement.className = 'incorrect';
        }

        answerItem.appendChild(inputElement);
        answerItem.appendChild(labelElement);
        optionElement.appendChild(answerItem);
      });

      if (this.optionsElement) {
        this.optionsElement.appendChild(optionElement);
      }
    });
  }

  private history(): void {
    location.href = '#/result?id=' + this.routeParams.id;
  }
}
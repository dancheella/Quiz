import {Form} from "./modules/form.js";
import {Choice} from "./modules/choice.js";
import {Test} from "./modules/test.js";
import {Result} from "./modules/result.js";
import {Answer} from "./modules/answer.js";

export class Router {
  constructor() {
    this.routes = [
      {
        route: '#/',
        title: 'Главная',
        template: 'templates/index.html',
        styles: 'styles/index.css',
        load: () => {
        }
      },
      {
        route: '#/form',
        title: 'Регистрация',
        template: 'templates/form.html',
        styles: 'styles/form.css',
        load: () => {
          new Form();
        }
      },
      {
        route: '#/choice',
        title: 'Выбор теста',
        template: 'templates/choice.html',
        styles: 'styles/choice.css',
        load: () => {
          new Choice();
        }
      },
      {
        route: '#/test',
        title: 'Прохождение теста',
        template: 'templates/test.html',
        styles: 'styles/test.css',
        load: () => {
          new Test();
        }
      },
      {
        route: '#/result',
        title: 'Результаты',
        template: 'templates/result.html',
        styles: 'styles/result.css',
        load: () => {
          new Result();
        }
      },
      {
        route: '#/answer',
        title: 'Правильные ответы',
        template: 'templates/answer.html',
        styles: 'styles/answer.css',
        load: () => {
          new Answer();
        }
      },
    ]
  }

  async openRote() {
    const newRoute = this.routes.find(item => {
      return item.route === window.location.hash.split('?')[0];
    });

    if (!newRoute) {
      window.location.href = '#/';
      return;
    }

    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
    document.getElementById('styles').setAttribute('href', newRoute.styles);
    document.getElementById('title').innerText = newRoute.title;
    newRoute.load()
  }
}
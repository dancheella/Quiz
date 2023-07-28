import {Form} from "./modules/form";
import {Choice} from "./modules/choice";
import {Test} from "./modules/test";
import {Result} from "./modules/result";
import {Answer} from "./modules/answer";
import {Auth} from "./services/auth";
import {RouteType} from "./types/route.type";
import {UserInfoType} from "./types/user-info.type";

export class Router {
  readonly contentElement: HTMLElement | null;
  readonly stylesElement: HTMLElement | null;
  readonly titleElement: HTMLElement | null;
  readonly profileElement: HTMLElement | null;
  readonly profileFullNElement: HTMLElement | null;

  private routes: RouteType[];

  constructor() {

    this.contentElement = document.getElementById('content');
    this.stylesElement = document.getElementById('styles');
    this.titleElement = document.getElementById('title');
    this.profileElement = document.getElementById('profile');
    this.profileFullNElement = document.getElementById('profile-full-name');

    const currentYear: number = new Date().getFullYear();
    const yearElement: HTMLElement | null = document.querySelector('.current-year');

    if (yearElement) {
      yearElement.textContent = currentYear.toString();
    }

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
        route: '#/signup',
        title: 'Регистрация',
        template: 'templates/signup.html',
        styles: 'styles/form.css',
        load: () => {
          new Form('signup');
        }
      },
      {
        route: '#/login',
        title: 'Вход в систему',
        template: 'templates/login.html',
        styles: 'styles/form.css',
        load: () => {
          new Form('login');
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

  public async openRote(): Promise<void> {
    const urlRoute: string = window.location.hash.split('?')[0];
    if (urlRoute === '#/logout') {
      const result: boolean = await Auth.logout();
      if (result) {
        window.location.href = '#/';
        return;
      } else {
        // ...
      }
    }

    const newRoute: RouteType | undefined = this.routes.find(item => {
      return item.route === urlRoute;
    });

    if (!newRoute) {
      window.location.href = '#/';
      return;
    }

    if (!this.contentElement || !this.stylesElement
      || !this.titleElement || !this.profileElement || !this.profileFullNElement) {
      if (urlRoute === '#/') {
        return
      } else {
        window.location.href = '#/';
        return;
      }
    }

    this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
    this.stylesElement.setAttribute('href', newRoute.styles);
    this.titleElement.innerText = newRoute.title;

    const userInfo: UserInfoType | null = Auth.getUserInfo();
    const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);
    if (userInfo && accessToken) {
      this.profileElement.style.display = 'flex';
      this.profileFullNElement.innerText = userInfo.fullName;
    } else {
      this.profileElement.style.display = 'none';
    }

    newRoute.load();
  }
}
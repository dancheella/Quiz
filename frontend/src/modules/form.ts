import {CustomHttp} from "../services/custom-http";
import {Auth} from "../services/auth";
import config from "../../config/config";
import {FormFieldType} from "../types/form-field.type";
import {SignupResponseType} from "../types/signup-response.type";
import {LoginResponseType} from "../types/login-response.type";

export class Form {
  readonly agreeElement: HTMLInputElement | null;
  readonly processElement: HTMLElement | null;
  readonly page: 'signup' | 'login';
  private fields: FormFieldType[] = [];

  constructor(page: 'signup' | 'login') {
    this.agreeElement = null;
    this.processElement = null;
    this.page = page;

    const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);
    if (accessToken) {
      location.href = '#/choice';
      return;
    }

    this.fields = [
      {
        name: 'email',
        id: 'email',
        element: null,
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        valid: false,
      },
      {
        name: 'password',
        id: 'password',
        element: null,
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        valid: false,
      }
    ];

    if (this.page === 'signup') {
      this.fields.unshift({
          name: 'name',
          id: 'name',
          element: null,
          regex: /^[А-ЯA-Z][а-яa-z]+\s*$/,
          valid: false,
        },
        {
          name: 'lastName',
          id: 'last-name',
          element: null,
          regex: /^[А-ЯA-Z][а-яa-z]+\s*$/,
          valid: false,
        });
    }

    const that: Form = this;
    this.fields.forEach((item: FormFieldType) => {
      item.element = document.getElementById(item.id) as HTMLInputElement;
      if (item.element) {
        item.element.onchange = function (): void {
          that.validateField.call(that, item, <HTMLInputElement>this);
        }
      }
    });

    this.processElement = document.getElementById('process');
    if (this.processElement) {
      this.processElement.onclick = function (): void {
        that.processForm();
      }
    }

    if (this.page === 'signup') {
      this.agreeElement = document.getElementById('agree') as HTMLInputElement;
      if (this.agreeElement) {
        this.agreeElement.onchange = function (): void {
          that.validateForm();
        }
      }
    }
  }

  private validateField(field: FormFieldType, element: HTMLInputElement): void {
    const parentNode: HTMLElement = element.parentNode as HTMLElement;
    const errorElement: HTMLElement | null = document.getElementById(`${element.id}-error`);

    if (!element.value || !element.value.match(field.regex)) {
      parentNode.style.borderColor = 'red';
      field.valid = false;
    } else {
      parentNode.removeAttribute('style');
      field.valid = true;
    }

    if (errorElement) {
      errorElement.style.display = field.valid ? 'none' : 'block';
    }

    this.validateForm();
  }

  private validateForm(): boolean {
    const validForm: boolean = this.fields.every((item: FormFieldType) => item.valid);
    const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
    if (this.processElement) {
      if (isValid) {
        this.processElement.removeAttribute('disabled');
      } else {
        this.processElement.setAttribute('disabled', 'disabled');
      }
    }

    return isValid;
  }

  private async processForm(): Promise<void> {
    if (this.validateForm()) {
      const email = this.fields.find((item: FormFieldType) => item.name === 'email')?.element?.value;
      const password = this.fields.find((item: FormFieldType) => item.name === 'password')?.element?.value;

      if (this.page === 'signup') {
        try {
          const result: SignupResponseType = await CustomHttp.request(config.host + '/signup', 'POST', {
            name: this.fields.find((item: FormFieldType) => item.name === 'name')?.element?.value,
            lastName: this.fields.find((item: FormFieldType) => item.name === 'lastName')?.element?.value,
            email: email,
            password: password,
          })

          if (result) {
            if (result.error || !result.user) {
              throw new Error(result.message);
            }
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }

      try {
        const result: LoginResponseType = await CustomHttp.request(config.host + '/login', 'POST', {
          email: email,
          password: password,
        })

        if (result) {
          if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
            throw new Error(result.message);
          }

          const userEmail: string = email || ''; // потом проверить

          Auth.setTokens(result.accessToken, result.refreshToken);
          Auth.setUserInfo({
            fullName: result.fullName,
            userId: result.userId,
            email: userEmail,
          });
          location.href = '#/choice'
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
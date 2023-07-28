/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    host: 'http://localhost:3000/api'
};


/***/ }),

/***/ "./src/modules/answer.ts":
/*!*******************************!*\
  !*** ./src/modules/answer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Answer = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Answer = /** @class */ (function () {
    function Answer() {
        this.quiz = null;
        this.optionsElement = null;
        this.questionTitleElement = null;
        this.currentQuestionIndex = 1;
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
        var that = this;
        var resultElement = document.getElementById('results');
        if (resultElement) {
            resultElement.onclick = function () {
                that.history();
            };
        }
    }
    Answer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, answerInfoElement, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            answerInfoElement = document.getElementById('answer-info');
                            if (answerInfoElement) {
                                answerInfoElement.innerText = userInfo.fullName + ', ' + userInfo.email;
                            }
                            this.quiz = result;
                            this.showQuestion();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        location.href = "#/";
                        return [2 /*return*/];
                }
            });
        });
    };
    Answer.prototype.showQuestion = function () {
        var _this = this;
        if (!this.quiz)
            return;
        var preTitleElement = document.getElementById('pre-title');
        if (preTitleElement) {
            preTitleElement.innerText = this.quiz.test.name;
        }
        this.optionsElement = document.getElementById('answers');
        if (this.optionsElement) {
            this.optionsElement.innerHTML = '';
        }
        this.quiz.test.questions.forEach(function (question) {
            _this.questionTitleElement = document.createElement('div');
            _this.questionTitleElement.className = 'common-question-title';
            _this.questionTitleElement.classList.add('answer-question-title');
            var optionElement = document.createElement('div');
            optionElement.className = 'common-question-options';
            if (_this.questionTitleElement) {
                _this.questionTitleElement.innerHTML = '<span>Вопрос ' + _this.currentQuestionIndex
                    + ':</span> ' + question.question;
            }
            _this.currentQuestionIndex++;
            optionElement.appendChild(_this.questionTitleElement);
            question.answers.forEach(function (answer) {
                var answerItem = document.createElement('div');
                answerItem.className = 'common-question-option';
                var inputId = answer.id;
                var inputElement = document.createElement('input');
                inputElement.className = 'option-answer';
                inputElement.setAttribute('id', inputId.toString());
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id.toString());
                var labelElement = document.createElement('label');
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
            if (_this.optionsElement) {
                _this.optionsElement.appendChild(optionElement);
            }
        });
    };
    Answer.prototype.history = function () {
        location.href = '#/result?id=' + this.routeParams.id;
    };
    return Answer;
}());
exports.Answer = Answer;


/***/ }),

/***/ "./src/modules/choice.ts":
/*!*******************************!*\
  !*** ./src/modules/choice.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Choice = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Choice = /** @class */ (function () {
    function Choice() {
        this.quizzes = [];
        this.testResult = null;
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Choice.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1, userInfo, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests')];
                    case 1:
                        _a.quizzes = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 3:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) return [3 /*break*/, 7];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/results?userId=' + userInfo.userId)];
                    case 5:
                        result = _b.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.testResult = result;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/];
                    case 7:
                        this.processQuizzes();
                        return [2 /*return*/];
                }
            });
        });
    };
    Choice.prototype.processQuizzes = function () {
        var _this = this;
        // console.log(this.quizzes)
        var choiceOptionsElement = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0 && choiceOptionsElement) {
            this.quizzes.forEach(function (quiz) {
                var that = _this;
                var choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice-option';
                choiceOptionElement.setAttribute('data-id', quiz.id.toString());
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                };
                var choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice-option-text';
                choiceOptionTextElement.innerText = quiz.name;
                var choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice-option-arrow';
                if (_this.testResult) {
                    var result = _this.testResult.find(function (item) { return item.testId === quiz.id; });
                    if (result) {
                        var choiceOptionResultElement = document.createElement('div');
                        choiceOptionResultElement.className = 'choice-option-result';
                        choiceOptionResultElement.innerHTML = '<div>Результат</div><div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement);
                    }
                }
                var choiceOptionImageElement = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', '/images/arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'Arrow');
                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    };
    Choice.prototype.chooseQuiz = function (element) {
        var dataId = element.getAttribute('data-id');
        if (dataId) {
            location.href = '#/test?id=' + dataId;
        }
    };
    return Choice;
}());
exports.Choice = Choice;


/***/ }),

/***/ "./src/modules/form.ts":
/*!*****************************!*\
  !*** ./src/modules/form.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Form = /** @class */ (function () {
    function Form(page) {
        this.fields = [];
        this.agreeElement = null;
        this.processElement = null;
        this.page = page;
        var accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
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
            }, {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-ЯA-Z][а-яa-z]+\s*$/,
                valid: false,
            });
        }
        var that = this;
        this.fields.forEach(function (item) {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            }
        });
        this.processElement = document.getElementById('process');
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm();
            };
        }
        if (this.page === 'signup') {
            this.agreeElement = document.getElementById('agree');
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                };
            }
        }
    }
    Form.prototype.validateField = function (field, element) {
        var parentNode = element.parentNode;
        var errorElement = document.getElementById("".concat(element.id, "-error"));
        if (!element.value || !element.value.match(field.regex)) {
            parentNode.style.borderColor = 'red';
            field.valid = false;
        }
        else {
            parentNode.removeAttribute('style');
            field.valid = true;
        }
        if (errorElement) {
            errorElement.style.display = field.valid ? 'none' : 'block';
        }
        this.validateForm();
    };
    Form.prototype.validateForm = function () {
        var validForm = this.fields.every(function (item) { return item.valid; });
        var isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            }
            else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
        }
        return isValid;
    };
    Form.prototype.processForm = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var email, password, result, error_1, result, userEmail, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!this.validateForm()) return [3 /*break*/, 7];
                        email = (_b = (_a = this.fields.find(function (item) { return item.name === 'email'; })) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.value;
                        password = (_d = (_c = this.fields.find(function (item) { return item.name === 'password'; })) === null || _c === void 0 ? void 0 : _c.element) === null || _d === void 0 ? void 0 : _d.value;
                        if (!(this.page === 'signup')) return [3 /*break*/, 4];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/signup', 'POST', {
                                name: (_f = (_e = this.fields.find(function (item) { return item.name === 'name'; })) === null || _e === void 0 ? void 0 : _e.element) === null || _f === void 0 ? void 0 : _f.value,
                                lastName: (_h = (_g = this.fields.find(function (item) { return item.name === 'lastName'; })) === null || _g === void 0 ? void 0 : _g.element) === null || _h === void 0 ? void 0 : _h.value,
                                email: email,
                                password: password,
                            })];
                    case 2:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 4:
                        _j.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/login', 'POST', {
                                email: email,
                                password: password,
                            })];
                    case 5:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                                throw new Error(result.message);
                            }
                            userEmail = email || '';
                            auth_1.Auth.setTokens(result.accessToken, result.refreshToken);
                            auth_1.Auth.setUserInfo({
                                fullName: result.fullName,
                                userId: result.userId,
                                email: userEmail,
                            });
                            location.href = '#/choice';
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _j.sent();
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;


/***/ }),

/***/ "./src/modules/result.ts":
/*!*******************************!*\
  !*** ./src/modules/result.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Result = /** @class */ (function () {
    function Result() {
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
        var that = this;
        var resultElement = document.getElementById('results');
        if (resultElement) {
            resultElement.onclick = function () {
                that.allAnswers();
            };
        }
    }
    Result.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, resultScoreElement, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            resultScoreElement = document.getElementById('result-score');
                            if (resultScoreElement) {
                                resultScoreElement.innerText = result.score + '/' + result.total;
                            }
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        location.href = '#/';
                        return [2 /*return*/];
                }
            });
        });
    };
    Result.prototype.allAnswers = function () {
        location.href = '#/answer?id=' + this.routeParams.id;
    };
    return Result;
}());
exports.Result = Result;


/***/ }),

/***/ "./src/modules/test.ts":
/*!*****************************!*\
  !*** ./src/modules/test.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Test = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var action_test_type_1 = __webpack_require__(/*! ../types/action-test.type */ "./src/types/action-test.type.ts");
var Test = /** @class */ (function () {
    function Test() {
        this.interval = 0;
        this.progressBarElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.nextButtonElement = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.quiz = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.passImage = null;
        this.passQuestionElements = null;
        this.init();
    }
    Test.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.quiz = result;
                            this.startQuiz();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.startQuiz = function () {
        if (!this.quiz)
            return;
        this.progressBarElement = document.getElementById('progress-bar');
        this.questionTitleElement = document.getElementById('question-title');
        this.optionsElement = document.getElementById('options');
        this.nextButtonElement = document.getElementById('next');
        if (this.nextButtonElement) {
            this.nextButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.next);
        }
        this.passButtonElement = document.getElementById('pass');
        if (this.passButtonElement) {
            this.passButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.pass);
        }
        this.passImage = document.getElementById('pass-image');
        this.passQuestionElements = document.querySelector('.pass-question');
        var preTitleElement = document.getElementById('pre-title');
        if (preTitleElement) {
            preTitleElement.innerText = this.quiz.name;
        }
        this.prevButtonElement = document.getElementById('prev');
        if (this.prevButtonElement) {
            this.prevButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.prev);
        }
        this.prepareProgressBar();
        this.showQuestion();
        var timerElement = document.getElementById('timer');
        var seconds = 59;
        var that = this;
        this.interval = window.setInterval(function () {
            seconds--;
            if (timerElement) {
                timerElement.innerText = seconds.toString();
            }
            if (seconds === 0) {
                clearInterval(that.interval);
                that.complete();
            }
        }.bind(this), 1000);
    };
    Test.prototype.prepareProgressBar = function () {
        if (!this.quiz)
            return;
        for (var i = 0; i < this.quiz.questions.length; i++) {
            var itemElement = document.createElement('div');
            itemElement.className = 'test-progress-bar-item ' + (i === 0 ? 'active' : '');
            var itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test-progress-bar-item-circle';
            var itemTextElement = document.createElement('div');
            itemTextElement.className = 'test-progress-bar-item-text';
            itemTextElement.innerText = 'Вопрос ' + (i + 1);
            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);
            if (this.progressBarElement) {
                this.progressBarElement.appendChild(itemElement);
            }
        }
    };
    Test.prototype.showQuestion = function () {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        if (this.questionTitleElement) {
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
                + ':</span> ' + activeQuestion.question;
        }
        if (this.optionsElement) {
            this.optionsElement.innerHTML = '';
        }
        var that = this;
        var chosenOption = this.userResult.find(function (item) { return item.questionId === activeQuestion.id; });
        activeQuestion.answers.forEach(function (answer) {
            var optionElement = document.createElement('div');
            optionElement.className = 'common-question-option';
            var inputId = answer.id;
            var inputElement = document.createElement('input');
            inputElement.className = 'option-answer';
            inputElement.setAttribute('id', inputId.toString());
            inputElement.setAttribute('type', 'radio');
            inputElement.setAttribute('name', 'answer');
            inputElement.setAttribute('value', answer.id.toString());
            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute('checked', 'checked');
            }
            inputElement.onchange = function () {
                that.chooseAnswer();
            };
            var labelElement = document.createElement('label');
            labelElement.setAttribute('for', inputId.toString());
            labelElement.innerText = answer.answer;
            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            if (_this.optionsElement) {
                _this.optionsElement.appendChild(optionElement);
            }
        });
        if (this.nextButtonElement && this.passButtonElement && this.passImage && this.passQuestionElements) {
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute('disabled');
            }
            else {
                this.nextButtonElement.setAttribute('disabled', 'disabled');
                this.passButtonElement.classList.remove('disabled');
                this.passImage.setAttribute('src', '/images/small-arrow.png');
                this.passQuestionElements.style.cursor = 'default';
            }
        }
        if (this.nextButtonElement) {
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить';
            }
            else {
                this.nextButtonElement.innerText = 'Далее';
            }
        }
        if (this.prevButtonElement) {
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            }
            else {
                this.prevButtonElement.setAttribute('disabled', 'disabled');
            }
        }
    };
    Test.prototype.chooseAnswer = function () {
        if (this.nextButtonElement && this.passButtonElement && this.passImage && this.passQuestionElements) {
            this.nextButtonElement.removeAttribute('disabled');
            this.passButtonElement.classList.add('disabled');
            this.passImage.setAttribute('src', '/images/small-arrow-grey.png');
            this.passQuestionElements.style.cursor = 'not-allowed';
        }
    };
    Test.prototype.move = function (action) {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        var chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(function (element) {
            return element.checked;
        });
        var chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }
        var existingResult = this.userResult.find(function (item) {
            return item.questionId === activeQuestion.id;
        });
        if (chosenAnswerId) {
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            }
            else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                });
            }
        }
        if (action === action_test_type_1.ActionTestType.next || action === action_test_type_1.ActionTestType.pass) {
            this.currentQuestionIndex++;
        }
        else {
            this.currentQuestionIndex--;
        }
        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }
        if (this.progressBarElement) {
            Array.from(this.progressBarElement.children).forEach(function (item, index) {
                var currentItemIndex = index + 1;
                item.classList.remove('complete');
                item.classList.remove('active');
                if (currentItemIndex === _this.currentQuestionIndex) {
                    item.classList.add('active');
                }
                else if (currentItemIndex < _this.currentQuestionIndex) {
                    item.classList.add('complete');
                }
            });
        }
        this.showQuestion();
    };
    Test.prototype.complete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/pass', 'POST', {
                                userId: userInfo.userId,
                                results: this.userResult,
                            })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            location.href = '#/result?id=' + this.routeParams.id;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Test;
}());
exports.Test = Test;


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
var form_1 = __webpack_require__(/*! ./modules/form */ "./src/modules/form.ts");
var choice_1 = __webpack_require__(/*! ./modules/choice */ "./src/modules/choice.ts");
var test_1 = __webpack_require__(/*! ./modules/test */ "./src/modules/test.ts");
var result_1 = __webpack_require__(/*! ./modules/result */ "./src/modules/result.ts");
var answer_1 = __webpack_require__(/*! ./modules/answer */ "./src/modules/answer.ts");
var auth_1 = __webpack_require__(/*! ./services/auth */ "./src/services/auth.ts");
var Router = /** @class */ (function () {
    function Router() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('title');
        this.profileElement = document.getElementById('profile');
        this.profileFullNElement = document.getElementById('profile-full-name');
        var currentYear = new Date().getFullYear();
        var yearElement = document.querySelector('.current-year');
        if (yearElement) {
            yearElement.textContent = currentYear.toString();
        }
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: function () {
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/form.css',
                load: function () {
                    new form_1.Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                load: function () {
                    new form_1.Form('login');
                }
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'templates/choice.html',
                styles: 'styles/choice.css',
                load: function () {
                    new choice_1.Choice();
                }
            },
            {
                route: '#/test',
                title: 'Прохождение теста',
                template: 'templates/test.html',
                styles: 'styles/test.css',
                load: function () {
                    new test_1.Test();
                }
            },
            {
                route: '#/result',
                title: 'Результаты',
                template: 'templates/result.html',
                styles: 'styles/result.css',
                load: function () {
                    new result_1.Result();
                }
            },
            {
                route: '#/answer',
                title: 'Правильные ответы',
                template: 'templates/answer.html',
                styles: 'styles/answer.css',
                load: function () {
                    new answer_1.Answer();
                }
            },
        ];
    }
    Router.prototype.openRote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var urlRoute, result, newRoute, _a, userInfo, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlRoute = window.location.hash.split('?')[0];
                        if (!(urlRoute === '#/logout')) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth_1.Auth.logout()];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            window.location.href = '#/';
                            return [2 /*return*/];
                        }
                        else {
                            // ...
                        }
                        _b.label = 2;
                    case 2:
                        newRoute = this.routes.find(function (item) {
                            return item.route === urlRoute;
                        });
                        if (!newRoute) {
                            window.location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.contentElement || !this.stylesElement
                            || !this.titleElement || !this.profileElement || !this.profileFullNElement) {
                            if (urlRoute === '#/') {
                                return [2 /*return*/];
                            }
                            else {
                                window.location.href = '#/';
                                return [2 /*return*/];
                            }
                        }
                        _a = this.contentElement;
                        return [4 /*yield*/, fetch(newRoute.template).then(function (response) { return response.text(); })];
                    case 3:
                        _a.innerHTML = _b.sent();
                        this.stylesElement.setAttribute('href', newRoute.styles);
                        this.titleElement.innerText = newRoute.title;
                        userInfo = auth_1.Auth.getUserInfo();
                        accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (userInfo && accessToken) {
                            this.profileElement.style.display = 'flex';
                            this.profileFullNElement.innerText = userInfo.fullName;
                        }
                        else {
                            this.profileElement.style.display = 'none';
                        }
                        newRoute.load();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;


/***/ }),

/***/ "./src/services/auth.ts":
/*!******************************!*\
  !*** ./src/services/auth.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Auth = exports.Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.processUnauthorizedResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + '/refresh', {
                                method: "POST",
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error && result.accessToken && result.refreshToken) {
                            this.setTokens(result.accessToken, result.refreshToken);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3:
                        this.removeTokens();
                        location.href = '#/';
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + '/logout', {
                                method: "POST",
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error) {
                            Auth.removeTokens();
                            localStorage.removeItem(this.userInfoKey);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.setTokens = function (accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    };
    Auth.removeTokens = function () {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    };
    Auth.setUserInfo = function (info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    };
    Auth.getUserInfo = function () {
        var userInfo = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    };
    Auth.accessTokenKey = 'accessToken';
    Auth.refreshTokenKey = 'refreshToken';
    Auth.userInfoKey = 'userInfo';
    return Auth;
}());


/***/ }),

/***/ "./src/services/custom-http.ts":
/*!*************************************!*\
  !*** ./src/services/custom-http.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomHttp = void 0;
var auth_1 = __webpack_require__(/*! ./auth */ "./src/services/auth.ts");
var CustomHttp = /** @class */ (function () {
    function CustomHttp() {
    }
    CustomHttp.request = function (url, method, body) {
        if (method === void 0) { method = 'GET'; }
        if (body === void 0) { body = null; }
        return __awaiter(this, void 0, void 0, function () {
            var params, token, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            method: method,
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json',
                            },
                        };
                        token = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (token) {
                            params.headers['x-access-token'] = token;
                        }
                        if (body) {
                            params.body = JSON.stringify(body);
                        }
                        return [4 /*yield*/, fetch(url, params)];
                    case 1:
                        response = _a.sent();
                        if (!(response.status < 200 || response.status >= 300)) return [3 /*break*/, 6];
                        if (!(response.status === 401)) return [3 /*break*/, 5];
                        return [4 /*yield*/, auth_1.Auth.processUnauthorizedResponse()];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.request(url, method, body)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, null];
                    case 5: throw new Error(response.statusText);
                    case 6: return [4 /*yield*/, response.json()];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CustomHttp;
}());
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "./src/types/action-test.type.ts":
/*!***************************************!*\
  !*** ./src/types/action-test.type.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionTestType = void 0;
var ActionTestType;
(function (ActionTestType) {
    ActionTestType["next"] = "next";
    ActionTestType["pass"] = "pass";
    ActionTestType["prev"] = "prev";
})(ActionTestType || (exports.ActionTestType = ActionTestType = {}));


/***/ }),

/***/ "./src/utils/url-manager.ts":
/*!**********************************!*\
  !*** ./src/utils/url-manager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UrlManager = void 0;
var UrlManager = /** @class */ (function () {
    function UrlManager() {
    }
    UrlManager.getQueryParams = function () {
        var qs = document.location.hash.split('+').join(' ');
        var params = {}, tokens, re = /[?&]([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    };
    return UrlManager;
}());
exports.UrlManager = UrlManager;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
var App = /** @class */ (function () {
    function App() {
        this.router = new router_1.Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }
    App.prototype.handleRouteChanging = function () {
        this.router.openRote();
    };
    return App;
}());
(new App());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLHNFQUFnQztBQUVoQztJQUdFO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVPLGlDQUFtQixHQUEzQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDO0FBRUQsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWl6Ly4vY29uZmlnL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL21vZHVsZXMvYW5zd2VyLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvbW9kdWxlcy9jaG9pY2UudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9tb2R1bGVzL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9tb2R1bGVzL3Jlc3VsdC50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL21vZHVsZXMvdGVzdC50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL3NlcnZpY2VzL2F1dGgudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9zZXJ2aWNlcy9jdXN0b20taHR0cC50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL3R5cGVzL2FjdGlvbi10ZXN0LnR5cGUudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy91dGlscy91cmwtbWFuYWdlci50cyIsIndlYnBhY2s6Ly9xdWl6L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1aXovLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgaG9zdDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGknXG59IiwiaW1wb3J0IHtVcmxNYW5hZ2VyfSBmcm9tIFwiLi4vdXRpbHMvdXJsLW1hbmFnZXJcIjtcbmltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XG5pbXBvcnQge0F1dGh9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoXCI7XG5pbXBvcnQge1F1ZXJ5UGFyYW1zVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1ZXJ5LXBhcmFtcy50eXBlXCI7XG5pbXBvcnQge1F1aXpBbnN3ZXJzVHlwZSwgUXVpelF1ZXN0aW9uVHlwZSwgUXVpelJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1aXoudHlwZVwiO1xuaW1wb3J0IHtEZWZhdWx0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZGVmYXVsdC1yZXNwb25zZS50eXBlXCI7XG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBBbnN3ZXIge1xuICBwcml2YXRlIHF1aXo6IFF1aXpSZXNwb25zZVR5cGUgfCBudWxsO1xuICBwcml2YXRlIG9wdGlvbnNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHByaXZhdGUgcXVlc3Rpb25UaXRsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHJpdmF0ZSBjdXJyZW50UXVlc3Rpb25JbmRleDogbnVtYmVyO1xuICBwcml2YXRlIHJvdXRlUGFyYW1zOiBRdWVyeVBhcmFtc1R5cGU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5xdWl6ID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID0gMTtcbiAgICB0aGlzLnJvdXRlUGFyYW1zID0gVXJsTWFuYWdlci5nZXRRdWVyeVBhcmFtcygpO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICBjb25zdCB0aGF0OiBBbnN3ZXIgPSB0aGlzO1xuICAgIGNvbnN0IHJlc3VsdEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzJyk7XG4gICAgaWYgKHJlc3VsdEVsZW1lbnQpIHtcbiAgICAgIHJlc3VsdEVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgICAgdGhhdC5oaXN0b3J5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xuICAgIGlmICghdXNlckluZm8pIHtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBRdWl6UmVzcG9uc2VUeXBlID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cy8nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZCArICcvcmVzdWx0L2RldGFpbHM/dXNlcklkPScgKyB1c2VySW5mby51c2VySWQpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkuZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYW5zd2VySW5mb0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbnN3ZXItaW5mbycpO1xuICAgICAgICAgIGlmIChhbnN3ZXJJbmZvRWxlbWVudCkge1xuICAgICAgICAgICAgYW5zd2VySW5mb0VsZW1lbnQuaW5uZXJUZXh0ID0gdXNlckluZm8uZnVsbE5hbWUgKyAnLCAnICsgdXNlckluZm8uZW1haWw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5xdWl6ID0gcmVzdWx0IGFzIFF1aXpSZXNwb25zZVR5cGU7XG4gICAgICAgICAgdGhpcy5zaG93UXVlc3Rpb24oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgICBsb2NhdGlvbi5ocmVmID0gXCIjL1wiXG4gIH1cblxuICBwcml2YXRlIHNob3dRdWVzdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJlVGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlLXRpdGxlJyk7XG4gICAgaWYgKHByZVRpdGxlRWxlbWVudCkge1xuICAgICAgcHJlVGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucXVpei50ZXN0Lm5hbWU7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbnN3ZXJzJyk7XG4gICAgaWYgKHRoaXMub3B0aW9uc0VsZW1lbnQpIHtcbiAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5xdWl6LnRlc3QucXVlc3Rpb25zLmZvckVhY2goKHF1ZXN0aW9uOiBRdWl6UXVlc3Rpb25UeXBlKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50LmNsYXNzTmFtZSA9ICdjb21tb24tcXVlc3Rpb24tdGl0bGUnO1xuICAgICAgdGhpcy5xdWVzdGlvblRpdGxlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbnN3ZXItcXVlc3Rpb24tdGl0bGUnKTtcblxuICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBvcHRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICdjb21tb24tcXVlc3Rpb24tb3B0aW9ucyc7XG5cblxuICAgICAgaWYgKHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5xdWVzdGlvblRpdGxlRWxlbWVudC5pbm5lckhUTUwgPSAnPHNwYW4+0JLQvtC/0YDQvtGBICcgKyB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4XG4gICAgICAgICAgKyAnOjwvc3Bhbj4gJyArIHF1ZXN0aW9uLnF1ZXN0aW9uO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4Kys7XG4gICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQpO1xuXG4gICAgICBxdWVzdGlvbi5hbnN3ZXJzLmZvckVhY2goKGFuc3dlcjogUXVpekFuc3dlcnNUeXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuc3dlckl0ZW06IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhbnN3ZXJJdGVtLmNsYXNzTmFtZSA9ICdjb21tb24tcXVlc3Rpb24tb3B0aW9uJztcblxuICAgICAgICBjb25zdCBpbnB1dElkOiBudW1iZXIgPSBhbnN3ZXIuaWQ7XG5cbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gJ29wdGlvbi1hbnN3ZXInO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGlucHV0SWQudG9TdHJpbmcoKSk7XG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAncmFkaW8nKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbnN3ZXInKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBhbnN3ZXIuaWQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgY29uc3QgbGFiZWxFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdmb3InLCBpbnB1dElkLnRvU3RyaW5nKCkpO1xuICAgICAgICBsYWJlbEVsZW1lbnQuaW5uZXJUZXh0ID0gYW5zd2VyLmFuc3dlcjtcblxuICAgICAgICBpZiAoYW5zd2VyLmNvcnJlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW5zd2VyLWNvcnJlY3QnKTtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvcnJlY3QnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbnN3ZXIuY29ycmVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW5zd2VyLWluY29ycmVjdCcpO1xuICAgICAgICAgIGlucHV0RWxlbWVudC5jbGFzc05hbWUgPSAnaW5jb3JyZWN0JztcbiAgICAgICAgfVxuXG4gICAgICAgIGFuc3dlckl0ZW0uYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgYW5zd2VySXRlbS5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGFuc3dlckl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhpc3RvcnkoKTogdm9pZCB7XG4gICAgbG9jYXRpb24uaHJlZiA9ICcjL3Jlc3VsdD9pZD0nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZDtcbiAgfVxufSIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxzL3VybC1tYW5hZ2VyXCI7XG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFwiO1xuaW1wb3J0IHtRdWVyeVBhcmFtc1R5cGV9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xuaW1wb3J0IHtRdWl6TGlzdFR5cGV9IGZyb20gXCIuLi90eXBlcy9xdWl6LWxpc3QudHlwZVwiO1xuaW1wb3J0IHtUZXN0UmVzdWx0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3Rlc3QtcmVzdWx0LnR5cGVcIjtcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcbmltcG9ydCB7RGVmYXVsdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2RlZmF1bHQtcmVzcG9uc2UudHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2hvaWNlIHtcbiAgcHJpdmF0ZSBxdWl6emVzOiBRdWl6TGlzdFR5cGVbXSA9IFtdO1xuICBwcml2YXRlIHRlc3RSZXN1bHQ6IFRlc3RSZXN1bHRUeXBlW10gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByb3V0ZVBhcmFtczogUXVlcnlQYXJhbXNUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucm91dGVQYXJhbXMgPSBVcmxNYW5hZ2VyLmdldFF1ZXJ5UGFyYW1zKCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucXVpenplcyA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xuICAgIGlmICh1c2VySW5mbykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBEZWZhdWx0UmVzcG9uc2VUeXBlIHwgVGVzdFJlc3VsdFR5cGVbXSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvcmVzdWx0cz91c2VySWQ9JyArIHVzZXJJbmZvLnVzZXJJZCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50ZXN0UmVzdWx0ID0gcmVzdWx0IGFzIFRlc3RSZXN1bHRUeXBlW107XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc1F1aXp6ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc1F1aXp6ZXMoKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5xdWl6emVzKVxuICAgIGNvbnN0IGNob2ljZU9wdGlvbnNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hvaWNlLW9wdGlvbnMnKTtcbiAgICBpZiAodGhpcy5xdWl6emVzICYmIHRoaXMucXVpenplcy5sZW5ndGggPiAwICYmIGNob2ljZU9wdGlvbnNFbGVtZW50KSB7XG4gICAgICB0aGlzLnF1aXp6ZXMuZm9yRWFjaCgocXVpejogUXVpekxpc3RUeXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoYXQ6IENob2ljZSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGNob2ljZU9wdGlvbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICdjaG9pY2Utb3B0aW9uJztcbiAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBxdWl6LmlkLnRvU3RyaW5nKCkpO1xuICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jaG9vc2VRdWl6KDxIVE1MRWxlbWVudD50aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNob2ljZU9wdGlvblRleHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQuY2xhc3NOYW1lID0gJ2Nob2ljZS1vcHRpb24tdGV4dCc7XG4gICAgICAgIGNob2ljZU9wdGlvblRleHRFbGVtZW50LmlubmVyVGV4dCA9IHF1aXoubmFtZTtcblxuICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQuY2xhc3NOYW1lID0gJ2Nob2ljZS1vcHRpb24tYXJyb3cnO1xuXG4gICAgICAgIGlmICh0aGlzLnRlc3RSZXN1bHQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQ6IFRlc3RSZXN1bHRUeXBlIHwgdW5kZWZpbmVkID0gdGhpcy50ZXN0UmVzdWx0LmZpbmQoaXRlbSA9PiBpdGVtLnRlc3RJZCA9PT0gcXVpei5pZCk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50LmNsYXNzTmFtZSA9ICdjaG9pY2Utb3B0aW9uLXJlc3VsdCc7XG4gICAgICAgICAgICBjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2PtCg0LXQt9GD0LvRjNGC0LDRgjwvZGl2PjxkaXY+JyArIHJlc3VsdC5zY29yZSArICcvJyArIHJlc3VsdC50b3RhbCArICc8L2Rpdj4nO1xuICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL2ltYWdlcy9hcnJvdy5wbmcnKTtcbiAgICAgICAgY2hvaWNlT3B0aW9uSW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZSgnYWx0JywgJ0Fycm93Jyk7XG5cbiAgICAgICAgY2hvaWNlT3B0aW9uQXJyb3dFbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZU9wdGlvbkltYWdlRWxlbWVudCk7XG4gICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQpO1xuICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZU9wdGlvbkFycm93RWxlbWVudCk7XG5cbiAgICAgICAgY2hvaWNlT3B0aW9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNob29zZVF1aXooZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRhSWQ6IHN0cmluZyB8IG51bGwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgIGlmIChkYXRhSWQpIHtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy90ZXN0P2lkPScgKyBkYXRhSWQ7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCB7Rm9ybUZpZWxkVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2Zvcm0tZmllbGQudHlwZVwiO1xuaW1wb3J0IHtTaWdudXBSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9zaWdudXAtcmVzcG9uc2UudHlwZVwiO1xuaW1wb3J0IHtMb2dpblJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2xvZ2luLXJlc3BvbnNlLnR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIEZvcm0ge1xuICByZWFkb25seSBhZ3JlZUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICByZWFkb25seSBwcm9jZXNzRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuICByZWFkb25seSBwYWdlOiAnc2lnbnVwJyB8ICdsb2dpbic7XG4gIHByaXZhdGUgZmllbGRzOiBGb3JtRmllbGRUeXBlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwYWdlOiAnc2lnbnVwJyB8ICdsb2dpbicpIHtcbiAgICB0aGlzLmFncmVlRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5wcm9jZXNzRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcblxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XG4gICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICBsb2NhdGlvbi5ocmVmID0gJyMvY2hvaWNlJztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2VtYWlsJyxcbiAgICAgICAgaWQ6ICdlbWFpbCcsXG4gICAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICAgIHJlZ2V4OiAvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvLFxuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAncGFzc3dvcmQnLFxuICAgICAgICBpZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgZWxlbWVudDogbnVsbCxcbiAgICAgICAgcmVnZXg6IC9eKD89LipcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qW15hLXpBLVowLTldKSg/IS4qXFxzKS57OCx9JC8sXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMucGFnZSA9PT0gJ3NpZ251cCcpIHtcbiAgICAgIHRoaXMuZmllbGRzLnVuc2hpZnQoe1xuICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICBpZDogJ25hbWUnLFxuICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICAgICAgcmVnZXg6IC9eW9CQLdCvQS1aXVvQsC3Rj2Etel0rXFxzKiQvLFxuICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdsYXN0TmFtZScsXG4gICAgICAgICAgaWQ6ICdsYXN0LW5hbWUnLFxuICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICAgICAgcmVnZXg6IC9eW9CQLdCvQS1aXVvQsC3Rj2Etel0rXFxzKiQvLFxuICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGhhdDogRm9ybSA9IHRoaXM7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaCgoaXRlbTogRm9ybUZpZWxkVHlwZSkgPT4ge1xuICAgICAgaXRlbS5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pZCkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmIChpdGVtLmVsZW1lbnQpIHtcbiAgICAgICAgaXRlbS5lbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgICAgICAgIHRoYXQudmFsaWRhdGVGaWVsZC5jYWxsKHRoYXQsIGl0ZW0sIDxIVE1MSW5wdXRFbGVtZW50PnRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2Nlc3NFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2Nlc3MnKTtcbiAgICBpZiAodGhpcy5wcm9jZXNzRWxlbWVudCkge1xuICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgICAgICB0aGF0LnByb2Nlc3NGb3JtKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFnZSA9PT0gJ3NpZ251cCcpIHtcbiAgICAgIHRoaXMuYWdyZWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmICh0aGlzLmFncmVlRWxlbWVudCkge1xuICAgICAgICB0aGlzLmFncmVlRWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgICAgICB0aGF0LnZhbGlkYXRlRm9ybSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUZpZWxkKGZpZWxkOiBGb3JtRmllbGRUeXBlLCBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50Tm9kZTogSFRNTEVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbGVtZW50LmlkfS1lcnJvcmApO1xuXG4gICAgaWYgKCFlbGVtZW50LnZhbHVlIHx8ICFlbGVtZW50LnZhbHVlLm1hdGNoKGZpZWxkLnJlZ2V4KSkge1xuICAgICAgcGFyZW50Tm9kZS5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xuICAgICAgZmllbGQudmFsaWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICBmaWVsZC52YWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgICAgZXJyb3JFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBmaWVsZC52YWxpZCA/ICdub25lJyA6ICdibG9jayc7XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZUZvcm0oKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVGb3JtKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbGlkRm9ybTogYm9vbGVhbiA9IHRoaXMuZmllbGRzLmV2ZXJ5KChpdGVtOiBGb3JtRmllbGRUeXBlKSA9PiBpdGVtLnZhbGlkKTtcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5hZ3JlZUVsZW1lbnQgPyB0aGlzLmFncmVlRWxlbWVudC5jaGVja2VkICYmIHZhbGlkRm9ybSA6IHZhbGlkRm9ybTtcbiAgICBpZiAodGhpcy5wcm9jZXNzRWxlbWVudCkge1xuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb2Nlc3NFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcHJvY2Vzc0Zvcm0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5maWVsZHMuZmluZCgoaXRlbTogRm9ybUZpZWxkVHlwZSkgPT4gaXRlbS5uYW1lID09PSAnZW1haWwnKT8uZWxlbWVudD8udmFsdWU7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZmllbGRzLmZpbmQoKGl0ZW06IEZvcm1GaWVsZFR5cGUpID0+IGl0ZW0ubmFtZSA9PT0gJ3Bhc3N3b3JkJyk/LmVsZW1lbnQ/LnZhbHVlO1xuXG4gICAgICBpZiAodGhpcy5wYWdlID09PSAnc2lnbnVwJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdDogU2lnbnVwUmVzcG9uc2VUeXBlID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy9zaWdudXAnLCAnUE9TVCcsIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuZmllbGRzLmZpbmQoKGl0ZW06IEZvcm1GaWVsZFR5cGUpID0+IGl0ZW0ubmFtZSA9PT0gJ25hbWUnKT8uZWxlbWVudD8udmFsdWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogdGhpcy5maWVsZHMuZmluZCgoaXRlbTogRm9ybUZpZWxkVHlwZSkgPT4gaXRlbS5uYW1lID09PSAnbGFzdE5hbWUnKT8uZWxlbWVudD8udmFsdWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgIXJlc3VsdC51c2VyKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBMb2dpblJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvbG9naW4nLCAnUE9TVCcsIHtcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8ICFyZXN1bHQuYWNjZXNzVG9rZW4gfHwgIXJlc3VsdC5yZWZyZXNoVG9rZW4gfHwgIXJlc3VsdC5mdWxsTmFtZSB8fCAhcmVzdWx0LnVzZXJJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB1c2VyRW1haWw6IHN0cmluZyA9IGVtYWlsIHx8ICcnOyAvLyDQv9C+0YLQvtC8INC/0YDQvtCy0LXRgNC40YLRjFxuXG4gICAgICAgICAgQXV0aC5zZXRUb2tlbnMocmVzdWx0LmFjY2Vzc1Rva2VuLCByZXN1bHQucmVmcmVzaFRva2VuKTtcbiAgICAgICAgICBBdXRoLnNldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIGZ1bGxOYW1lOiByZXN1bHQuZnVsbE5hbWUsXG4gICAgICAgICAgICB1c2VySWQ6IHJlc3VsdC51c2VySWQsXG4gICAgICAgICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy9jaG9pY2UnXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQge1VybE1hbmFnZXJ9IGZyb20gXCIuLi91dGlscy91cmwtbWFuYWdlclwiO1xuaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcbmltcG9ydCB7UXVlcnlQYXJhbXNUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVlcnktcGFyYW1zLnR5cGVcIjtcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcbmltcG9ydCB7RGVmYXVsdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2RlZmF1bHQtcmVzcG9uc2UudHlwZVwiO1xuaW1wb3J0IHtQYXNzVGVzdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3Bhc3MtdGVzdC1yZXNwb25zZS50eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICBwcml2YXRlIHJvdXRlUGFyYW1zOiBRdWVyeVBhcmFtc1R5cGU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLnJvdXRlUGFyYW1zID0gVXJsTWFuYWdlci5nZXRRdWVyeVBhcmFtcygpO1xuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgY29uc3QgdGhhdDogUmVzdWx0ID0gdGhpcztcblxuICAgIGNvbnN0IHJlc3VsdEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzJyk7XG4gICAgaWYgKHJlc3VsdEVsZW1lbnQpIHtcbiAgICAgIHJlc3VsdEVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgICAgdGhhdC5hbGxBbnN3ZXJzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xuICAgIGlmICghdXNlckluZm8pIHtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBQYXNzVGVzdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Jlc3VsdD91c2VySWQ9JyArIHVzZXJJbmZvLnVzZXJJZCk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHJlc3VsdFNjb3JlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC1zY29yZScpO1xuICAgICAgICAgIGlmIChyZXN1bHRTY29yZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJlc3VsdFNjb3JlRWxlbWVudC5pbm5lclRleHQgPSAocmVzdWx0IGFzIFBhc3NUZXN0UmVzcG9uc2VUeXBlKS5zY29yZSArICcvJyArIChyZXN1bHQgYXMgUGFzc1Rlc3RSZXNwb25zZVR5cGUpLnRvdGFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgICBsb2NhdGlvbi5ocmVmID0gJyMvJztcbiAgICByZXR1cm47XG4gIH1cblxuICBwcml2YXRlIGFsbEFuc3dlcnMoKTogdm9pZCB7XG4gICAgbG9jYXRpb24uaHJlZiA9ICcjL2Fuc3dlcj9pZD0nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZDtcbiAgfVxufSIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxzL3VybC1tYW5hZ2VyXCI7XG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFwiO1xuaW1wb3J0IHtRdWVyeVBhcmFtc1R5cGV9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xuaW1wb3J0IHtRdWl6QW5zd2Vyc1R5cGUsIFF1aXpRdWVzdGlvblR5cGUsIFF1aXpUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVpei50eXBlXCI7XG5pbXBvcnQge1VzZXJSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1yZXN1bHQudHlwZVwiO1xuaW1wb3J0IHtEZWZhdWx0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZGVmYXVsdC1yZXNwb25zZS50eXBlXCI7XG5pbXBvcnQge0FjdGlvblRlc3RUeXBlfSBmcm9tIFwiLi4vdHlwZXMvYWN0aW9uLXRlc3QudHlwZVwiO1xuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xuaW1wb3J0IHtQYXNzVGVzdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3Bhc3MtdGVzdC1yZXNwb25zZS50eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXN0IHtcbiAgcHJpdmF0ZSBwcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHJpdmF0ZSBwYXNzQnV0dG9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBwcml2YXRlIHByZXZCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHByaXZhdGUgbmV4dEJ1dHRvbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHJpdmF0ZSBxdWVzdGlvblRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBwcml2YXRlIG9wdGlvbnNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHByaXZhdGUgcXVpejogUXVpelR5cGUgfCBudWxsO1xuICBwcml2YXRlIGN1cnJlbnRRdWVzdGlvbkluZGV4OiBudW1iZXI7XG4gIHJlYWRvbmx5IHVzZXJSZXN1bHQ6IFVzZXJSZXN1bHRUeXBlW107XG4gIHByaXZhdGUgcm91dGVQYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZTtcbiAgcHJpdmF0ZSBwYXNzSW1hZ2U6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHJpdmF0ZSBwYXNzUXVlc3Rpb25FbGVtZW50czogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBwcml2YXRlIGludGVydmFsOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnBhc3NCdXR0b25FbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnF1aXogPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPSAxO1xuICAgIHRoaXMudXNlclJlc3VsdCA9IFtdO1xuICAgIHRoaXMucm91dGVQYXJhbXMgPSBVcmxNYW5hZ2VyLmdldFF1ZXJ5UGFyYW1zKCk7XG4gICAgdGhpcy5wYXNzSW1hZ2UgPSBudWxsO1xuICAgIHRoaXMucGFzc1F1ZXN0aW9uRWxlbWVudHMgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBRdWl6VHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQpXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5xdWl6ID0gcmVzdWx0IGFzIFF1aXpUeXBlO1xuICAgICAgICAgIHRoaXMuc3RhcnRRdWl6KCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0UXVpeigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xuXG4gICAgdGhpcy5wcm9ncmVzc0JhckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MtYmFyJyk7XG4gICAgdGhpcy5xdWVzdGlvblRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVzdGlvbi10aXRsZScpO1xuICAgIHRoaXMub3B0aW9uc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3B0aW9ucycpO1xuICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dCcpO1xuXG4gICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblRlc3RUeXBlLm5leHQpO1xuICAgIH1cblxuICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzcycpO1xuXG4gICAgaWYgKHRoaXMucGFzc0J1dHRvbkVsZW1lbnQpIHtcbiAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblRlc3RUeXBlLnBhc3MpO1xuICAgIH1cblxuICAgIHRoaXMucGFzc0ltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3MtaW1hZ2UnKTtcbiAgICB0aGlzLnBhc3NRdWVzdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhc3MtcXVlc3Rpb24nKTtcblxuICAgIGNvbnN0IHByZVRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZS10aXRsZScpO1xuICAgIGlmIChwcmVUaXRsZUVsZW1lbnQpIHtcbiAgICAgIHByZVRpdGxlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLnF1aXoubmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYnKTtcbiAgICBpZiAodGhpcy5wcmV2QnV0dG9uRWxlbWVudCkge1xuICAgICAgdGhpcy5wcmV2QnV0dG9uRWxlbWVudC5vbmNsaWNrID0gdGhpcy5tb3ZlLmJpbmQodGhpcywgQWN0aW9uVGVzdFR5cGUucHJldik7XG4gICAgfVxuXG4gICAgdGhpcy5wcmVwYXJlUHJvZ3Jlc3NCYXIoKTtcbiAgICB0aGlzLnNob3dRdWVzdGlvbigpO1xuXG4gICAgY29uc3QgdGltZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXInKVxuICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSA1OTtcblxuICAgIGNvbnN0IHRoYXQ6IFRlc3QgPSB0aGlzO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgc2Vjb25kcy0tO1xuICAgICAgaWYgKHRpbWVyRWxlbWVudCkge1xuICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJUZXh0ID0gc2Vjb25kcy50b1N0cmluZygpO1xuICAgICAgfVxuICAgICAgaWYgKHNlY29uZHMgPT09IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGF0LmludGVydmFsKTtcbiAgICAgICAgdGhhdC5jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSwgMTAwMCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVQcm9ncmVzc0JhcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBpdGVtRWxlbWVudC5jbGFzc05hbWUgPSAndGVzdC1wcm9ncmVzcy1iYXItaXRlbSAnICsgKGkgPT09IDAgPyAnYWN0aXZlJyA6ICcnKTtcblxuICAgICAgY29uc3QgaXRlbUNpcmNsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaXRlbUNpcmNsZUVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rlc3QtcHJvZ3Jlc3MtYmFyLWl0ZW0tY2lyY2xlJztcblxuICAgICAgY29uc3QgaXRlbVRleHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGl0ZW1UZXh0RWxlbWVudC5jbGFzc05hbWUgPSAndGVzdC1wcm9ncmVzcy1iYXItaXRlbS10ZXh0JztcbiAgICAgIGl0ZW1UZXh0RWxlbWVudC5pbm5lclRleHQgPSAn0JLQvtC/0YDQvtGBICcgKyAoaSArIDEpO1xuXG4gICAgICBpdGVtRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtQ2lyY2xlRWxlbWVudCk7XG4gICAgICBpdGVtRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtVGV4dEVsZW1lbnQpO1xuXG4gICAgICBpZiAodGhpcy5wcm9ncmVzc0JhckVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhckVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd1F1ZXN0aW9uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XG5cbiAgICBjb25zdCBhY3RpdmVRdWVzdGlvbjogUXVpelF1ZXN0aW9uVHlwZSA9IHRoaXMucXVpei5xdWVzdGlvbnNbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCAtIDFdO1xuICAgIGlmICh0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50KSB7XG4gICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50LmlubmVySFRNTCA9ICc8c3Bhbj7QktC+0L/RgNC+0YEgJyArIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhcbiAgICAgICAgKyAnOjwvc3Bhbj4gJyArIGFjdGl2ZVF1ZXN0aW9uLnF1ZXN0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XG4gICAgICB0aGlzLm9wdGlvbnNFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgIH1cblxuICAgIGNvbnN0IHRoYXQ6IFRlc3QgPSB0aGlzO1xuICAgIGNvbnN0IGNob3Nlbk9wdGlvbjogVXNlclJlc3VsdFR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnVzZXJSZXN1bHQuZmluZCgoaXRlbTogVXNlclJlc3VsdFR5cGUpID0+IGl0ZW0ucXVlc3Rpb25JZCA9PT0gYWN0aXZlUXVlc3Rpb24uaWQpO1xuXG4gICAgYWN0aXZlUXVlc3Rpb24uYW5zd2Vycy5mb3JFYWNoKChhbnN3ZXI6IFF1aXpBbnN3ZXJzVHlwZSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBvcHRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICdjb21tb24tcXVlc3Rpb24tb3B0aW9uJztcblxuICAgICAgY29uc3QgaW5wdXRJZDogbnVtYmVyID0gYW5zd2VyLmlkO1xuXG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gJ29wdGlvbi1hbnN3ZXInO1xuICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpbnB1dElkLnRvU3RyaW5nKCkpO1xuICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYWRpbycpO1xuICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbnN3ZXInKTtcbiAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYW5zd2VyLmlkLnRvU3RyaW5nKCkpO1xuXG4gICAgICBpZiAoY2hvc2VuT3B0aW9uICYmIGNob3Nlbk9wdGlvbi5jaG9zZW5BbnN3ZXJJZCA9PT0gYW5zd2VyLmlkKSB7XG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpXG4gICAgICB9XG5cbiAgICAgIGlucHV0RWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhhdC5jaG9vc2VBbnN3ZXIoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGFiZWxFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgbGFiZWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnZm9yJywgaW5wdXRJZC50b1N0cmluZygpKTtcbiAgICAgIGxhYmVsRWxlbWVudC5pbm5lclRleHQgPSBhbnN3ZXIuYW5zd2VyO1xuXG4gICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XG4gICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5uZXh0QnV0dG9uRWxlbWVudCAmJiB0aGlzLnBhc3NCdXR0b25FbGVtZW50ICYmIHRoaXMucGFzc0ltYWdlICYmIHRoaXMucGFzc1F1ZXN0aW9uRWxlbWVudHMpIHtcbiAgICAgIGlmIChjaG9zZW5PcHRpb24gJiYgY2hvc2VuT3B0aW9uLmNob3NlbkFuc3dlcklkKSB7XG4gICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgdGhpcy5wYXNzSW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnL2ltYWdlcy9zbWFsbC1hcnJvdy5wbmcnKTtcbiAgICAgICAgdGhpcy5wYXNzUXVlc3Rpb25FbGVtZW50cy5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID09PSB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9ICfQl9Cw0LLQtdGA0YjQuNGC0YwnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSAn0JTQsNC70LXQtSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJldkJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID4gMSkge1xuICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBjaG9vc2VBbnN3ZXIoKSB7XG4gICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQgJiYgdGhpcy5wYXNzQnV0dG9uRWxlbWVudCAmJiB0aGlzLnBhc3NJbWFnZSAmJiB0aGlzLnBhc3NRdWVzdGlvbkVsZW1lbnRzKSB7XG4gICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIHRoaXMucGFzc0ltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWFnZXMvc21hbGwtYXJyb3ctZ3JleS5wbmcnKTtcbiAgICAgIHRoaXMucGFzc1F1ZXN0aW9uRWxlbWVudHMuc3R5bGUuY3Vyc29yID0gJ25vdC1hbGxvd2VkJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmUoYWN0aW9uOiBBY3Rpb25UZXN0VHlwZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XG5cbiAgICBjb25zdCBhY3RpdmVRdWVzdGlvbjogUXVpelF1ZXN0aW9uVHlwZSA9IHRoaXMucXVpei5xdWVzdGlvbnNbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCAtIDFdO1xuICAgIGNvbnN0IGNob3NlbkFuc3dlcjogSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZCA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B0aW9uLWFuc3dlcicpKS5maW5kKGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XG4gICAgfSkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIGxldCBjaG9zZW5BbnN3ZXJJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKGNob3NlbkFuc3dlciAmJiBjaG9zZW5BbnN3ZXIudmFsdWUpIHtcbiAgICAgIGNob3NlbkFuc3dlcklkID0gTnVtYmVyKGNob3NlbkFuc3dlci52YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhpc3RpbmdSZXN1bHQ6IFVzZXJSZXN1bHRUeXBlIHwgdW5kZWZpbmVkID0gdGhpcy51c2VyUmVzdWx0LmZpbmQoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5xdWVzdGlvbklkID09PSBhY3RpdmVRdWVzdGlvbi5pZDtcbiAgICB9KTtcblxuICAgIGlmIChjaG9zZW5BbnN3ZXJJZCkge1xuICAgICAgaWYgKGV4aXN0aW5nUmVzdWx0KSB7XG4gICAgICAgIGV4aXN0aW5nUmVzdWx0LmNob3NlbkFuc3dlcklkID0gY2hvc2VuQW5zd2VySWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVzZXJSZXN1bHQucHVzaCh7XG4gICAgICAgICAgcXVlc3Rpb25JZDogYWN0aXZlUXVlc3Rpb24uaWQsXG4gICAgICAgICAgY2hvc2VuQW5zd2VySWQ6IGNob3NlbkFuc3dlcklkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhY3Rpb24gPT09IEFjdGlvblRlc3RUeXBlLm5leHQgfHwgYWN0aW9uID09PSBBY3Rpb25UZXN0VHlwZS5wYXNzKSB7XG4gICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgtLTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCA+IHRoaXMucXVpei5xdWVzdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb2dyZXNzQmFyRWxlbWVudCkge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb2dyZXNzQmFyRWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaCgoaXRlbTogRWxlbWVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50SXRlbUluZGV4OiBudW1iZXIgPSBpbmRleCArIDE7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGUnKTtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICBpZiAoY3VycmVudEl0ZW1JbmRleCA9PT0gdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCkge1xuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEl0ZW1JbmRleCA8IHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgpIHtcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2hvd1F1ZXN0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNvbXBsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xuICAgIGlmICghdXNlckluZm8pIHtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBQYXNzVGVzdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Bhc3MnLCAnUE9TVCcsIHtcbiAgICAgICAgdXNlcklkOiB1c2VySW5mby51c2VySWQsXG4gICAgICAgIHJlc3VsdHM6IHRoaXMudXNlclJlc3VsdCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvcmVzdWx0P2lkPScgKyB0aGlzLnJvdXRlUGFyYW1zLmlkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQge0Zvcm19IGZyb20gXCIuL21vZHVsZXMvZm9ybVwiO1xuaW1wb3J0IHtDaG9pY2V9IGZyb20gXCIuL21vZHVsZXMvY2hvaWNlXCI7XG5pbXBvcnQge1Rlc3R9IGZyb20gXCIuL21vZHVsZXMvdGVzdFwiO1xuaW1wb3J0IHtSZXN1bHR9IGZyb20gXCIuL21vZHVsZXMvcmVzdWx0XCI7XG5pbXBvcnQge0Fuc3dlcn0gZnJvbSBcIi4vbW9kdWxlcy9hbnN3ZXJcIjtcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4vc2VydmljZXMvYXV0aFwiO1xuaW1wb3J0IHtSb3V0ZVR5cGV9IGZyb20gXCIuL3R5cGVzL3JvdXRlLnR5cGVcIjtcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcbiAgcmVhZG9ubHkgY29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcmVhZG9ubHkgc3R5bGVzRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuICByZWFkb25seSB0aXRsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcmVhZG9ubHkgcHJvZmlsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcmVhZG9ubHkgcHJvZmlsZUZ1bGxORWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG4gIHByaXZhdGUgcm91dGVzOiBSb3V0ZVR5cGVbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICAgIHRoaXMuc3R5bGVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHlsZXMnKTtcbiAgICB0aGlzLnRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpO1xuICAgIHRoaXMucHJvZmlsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpO1xuICAgIHRoaXMucHJvZmlsZUZ1bGxORWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlLWZ1bGwtbmFtZScpO1xuXG4gICAgY29uc3QgY3VycmVudFllYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCB5ZWFyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQteWVhcicpO1xuXG4gICAgaWYgKHllYXJFbGVtZW50KSB7XG4gICAgICB5ZWFyRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRZZWFyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yb3V0ZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHJvdXRlOiAnIy8nLFxuICAgICAgICB0aXRsZTogJ9CT0LvQsNCy0L3QsNGPJyxcbiAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvaW5kZXguaHRtbCcsXG4gICAgICAgIHN0eWxlczogJ3N0eWxlcy9pbmRleC5jc3MnLFxuICAgICAgICBsb2FkOiAoKSA9PiB7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvdXRlOiAnIy9zaWdudXAnLFxuICAgICAgICB0aXRsZTogJ9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8nLFxuICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9zaWdudXAuaHRtbCcsXG4gICAgICAgIHN0eWxlczogJ3N0eWxlcy9mb3JtLmNzcycsXG4gICAgICAgIGxvYWQ6ICgpID0+IHtcbiAgICAgICAgICBuZXcgRm9ybSgnc2lnbnVwJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvdXRlOiAnIy9sb2dpbicsXG4gICAgICAgIHRpdGxlOiAn0JLRhdC+0LQg0LIg0YHQuNGB0YLQtdC80YMnLFxuICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9sb2dpbi5odG1sJyxcbiAgICAgICAgc3R5bGVzOiAnc3R5bGVzL2Zvcm0uY3NzJyxcbiAgICAgICAgbG9hZDogKCkgPT4ge1xuICAgICAgICAgIG5ldyBGb3JtKCdsb2dpbicpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb3V0ZTogJyMvY2hvaWNlJyxcbiAgICAgICAgdGl0bGU6ICfQktGL0LHQvtGAINGC0LXRgdGC0LAnLFxuICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9jaG9pY2UuaHRtbCcsXG4gICAgICAgIHN0eWxlczogJ3N0eWxlcy9jaG9pY2UuY3NzJyxcbiAgICAgICAgbG9hZDogKCkgPT4ge1xuICAgICAgICAgIG5ldyBDaG9pY2UoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcm91dGU6ICcjL3Rlc3QnLFxuICAgICAgICB0aXRsZTogJ9Cf0YDQvtGF0L7QttC00LXQvdC40LUg0YLQtdGB0YLQsCcsXG4gICAgICAgIHRlbXBsYXRlOiAndGVtcGxhdGVzL3Rlc3QuaHRtbCcsXG4gICAgICAgIHN0eWxlczogJ3N0eWxlcy90ZXN0LmNzcycsXG4gICAgICAgIGxvYWQ6ICgpID0+IHtcbiAgICAgICAgICBuZXcgVGVzdCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb3V0ZTogJyMvcmVzdWx0JyxcbiAgICAgICAgdGl0bGU6ICfQoNC10LfRg9C70YzRgtCw0YLRiycsXG4gICAgICAgIHRlbXBsYXRlOiAndGVtcGxhdGVzL3Jlc3VsdC5odG1sJyxcbiAgICAgICAgc3R5bGVzOiAnc3R5bGVzL3Jlc3VsdC5jc3MnLFxuICAgICAgICBsb2FkOiAoKSA9PiB7XG4gICAgICAgICAgbmV3IFJlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb3V0ZTogJyMvYW5zd2VyJyxcbiAgICAgICAgdGl0bGU6ICfQn9GA0LDQstC40LvRjNC90YvQtSDQvtGC0LLQtdGC0YsnLFxuICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9hbnN3ZXIuaHRtbCcsXG4gICAgICAgIHN0eWxlczogJ3N0eWxlcy9hbnN3ZXIuY3NzJyxcbiAgICAgICAgbG9hZDogKCkgPT4ge1xuICAgICAgICAgIG5ldyBBbnN3ZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb3BlblJvdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXJsUm91dGU6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KCc/JylbMF07XG4gICAgaWYgKHVybFJvdXRlID09PSAnIy9sb2dvdXQnKSB7XG4gICAgICBjb25zdCByZXN1bHQ6IGJvb2xlYW4gPSBhd2FpdCBBdXRoLmxvZ291dCgpO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjLyc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIC4uLlxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5ld1JvdXRlOiBSb3V0ZVR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnJvdXRlcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0ucm91dGUgPT09IHVybFJvdXRlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFuZXdSb3V0ZSkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy8nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250ZW50RWxlbWVudCB8fCAhdGhpcy5zdHlsZXNFbGVtZW50XG4gICAgICB8fCAhdGhpcy50aXRsZUVsZW1lbnQgfHwgIXRoaXMucHJvZmlsZUVsZW1lbnQgfHwgIXRoaXMucHJvZmlsZUZ1bGxORWxlbWVudCkge1xuICAgICAgaWYgKHVybFJvdXRlID09PSAnIy8nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy8nO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBhd2FpdCBmZXRjaChuZXdSb3V0ZS50ZW1wbGF0ZSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpO1xuICAgIHRoaXMuc3R5bGVzRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBuZXdSb3V0ZS5zdHlsZXMpO1xuICAgIHRoaXMudGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IG5ld1JvdXRlLnRpdGxlO1xuXG4gICAgY29uc3QgdXNlckluZm86IFVzZXJJbmZvVHlwZSB8IG51bGwgPSBBdXRoLmdldFVzZXJJbmZvKCk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IG51bGwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBdXRoLmFjY2Vzc1Rva2VuS2V5KTtcbiAgICBpZiAodXNlckluZm8gJiYgYWNjZXNzVG9rZW4pIHtcbiAgICAgIHRoaXMucHJvZmlsZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIHRoaXMucHJvZmlsZUZ1bGxORWxlbWVudC5pbm5lclRleHQgPSB1c2VySW5mby5mdWxsTmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9maWxlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIG5ld1JvdXRlLmxvYWQoKTtcbiAgfVxufSIsImltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcbmltcG9ydCB7UmVmcmVzaFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3JlZnJlc2gtcmVzcG9uc2UudHlwZVwiO1xuaW1wb3J0IHtMb2dvdXRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9sb2dvdXQtcmVzcG9uc2UudHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgQXV0aCB7XG5cbiAgcHVibGljIHN0YXRpYyBhY2Nlc3NUb2tlbktleTogc3RyaW5nID0gJ2FjY2Vzc1Rva2VuJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVmcmVzaFRva2VuS2V5OiBzdHJpbmcgPSAncmVmcmVzaFRva2VuJztcbiAgcHJpdmF0ZSBzdGF0aWMgdXNlckluZm9LZXk6IHN0cmluZyA9ICd1c2VySW5mbyc7XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBwcm9jZXNzVW5hdXRob3JpemVkUmVzcG9uc2UoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5yZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5ob3N0ICsgJy9yZWZyZXNoJywge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7cmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW59KVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IFJlZnJlc2hSZXNwb25zZVR5cGUgfCBudWxsID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocmVzdWx0ICYmICFyZXN1bHQuZXJyb3IgJiYgcmVzdWx0LmFjY2Vzc1Rva2VuICYmIHJlc3VsdC5yZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFRva2VucyhyZXN1bHQuYWNjZXNzVG9rZW4sIHJlc3VsdC5yZWZyZXNoVG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVUb2tlbnMoKTtcbiAgICBsb2NhdGlvbi5ocmVmID0gJyMvJ1xuICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGFsZXJ0KCfQotCw0LrQvtCz0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC90LUg0YHRg9GJ0LXRgdGC0LLRg9C10YIuINCf0YDQvtCy0LXRgNGM0YLQtSBlbWFpbCDQuNC70Lgg0L/QsNGA0L7Qu9GMLicpO1xuICAgIC8vIHRocm93IG5ldyBFcnJvcign0KLQsNC60L7Qs9C+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQvdC1INGB0YPRidC10YHRgtCy0YPQtdGCLiDQn9GA0L7QstC10YDRjNGC0LUgZW1haWwg0LjQu9C4INC/0LDRgNC+0LvRjC4nKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjb25maWcuaG9zdCArICcvbG9nb3V0Jywge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7cmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW59KVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IExvZ291dFJlc3BvbnNlVHlwZSB8IG51bGwgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgIEF1dGgucmVtb3ZlVG9rZW5zKCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy51c2VySW5mb0tleSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRUb2tlbnMoYWNjZXNzVG9rZW46IHN0cmluZywgcmVmcmVzaFRva2VuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5yZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZW1vdmVUb2tlbnMoKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5hY2Nlc3NUb2tlbktleSk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5yZWZyZXNoVG9rZW5LZXkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRVc2VySW5mbyhpbmZvOiBVc2VySW5mb1R5cGUpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnVzZXJJbmZvS2V5LCBKU09OLnN0cmluZ2lmeShpbmZvKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFVzZXJJbmZvKCk6IFVzZXJJbmZvVHlwZSB8IG51bGwge1xuICAgIGNvbnN0IHVzZXJJbmZvOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy51c2VySW5mb0tleSk7XG4gICAgaWYgKHVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VySW5mbyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7QXV0aH0gZnJvbSBcIi4vYXV0aFwiO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cCB7XG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVxdWVzdCh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcgPSAnR0VUJywgYm9keTogYW55ID0gbnVsbCk6IFByb21pc2U8YW55PiB7XG5cbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgbGV0IHRva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBwYXJhbXMuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSA9IHRva2VuO1xuICAgIH1cblxuICAgIGlmIChib2R5KSB7XG4gICAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcGFyYW1zKTtcblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPCAyMDAgfHwgcmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogYm9vbGVhbiA9IGF3YWl0IEF1dGgucHJvY2Vzc1VuYXV0aG9yaXplZFJlc3BvbnNlKCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXF1ZXN0KHVybCwgbWV0aG9kLCBib2R5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfVxufSIsImV4cG9ydCBlbnVtIEFjdGlvblRlc3RUeXBlIHtcbiAgbmV4dCA9ICduZXh0JyxcbiAgcGFzcyA9ICdwYXNzJyxcbiAgcHJldiA9ICdwcmV2Jyxcbn1cbiIsImltcG9ydCB7UXVlcnlQYXJhbXNUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVlcnktcGFyYW1zLnR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFVybE1hbmFnZXIge1xuICBwdWJsaWMgc3RhdGljIGdldFF1ZXJ5UGFyYW1zKCk6IFF1ZXJ5UGFyYW1zVHlwZSB7XG4gICAgY29uc3QgcXM6IHN0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc3BsaXQoJysnKS5qb2luKCcgJyk7XG5cbiAgICBsZXQgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSxcbiAgICAgIHRva2VuczogUmVnRXhwRXhlY0FycmF5IHwgbnVsbCxcbiAgICAgIHJlOiBSZWdFeHAgPSAvWz8mXShbXj1dKyk9KFteJl0qKS9nO1xuXG4gICAgd2hpbGUgKHRva2VucyA9IHJlLmV4ZWMocXMpKSB7XG4gICAgICBwYXJhbXNbZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1sxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1syXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQge1JvdXRlcn0gZnJvbSBcIi4vcm91dGVyXCI7XG5cbmNsYXNzIEFwcCB7XG4gIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmhhbmRsZVJvdXRlQ2hhbmdpbmcuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVSb3V0ZUNoYW5naW5nLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSb3V0ZUNoYW5naW5nKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm9wZW5Sb3RlKCk7XG4gIH1cbn1cblxuKG5ldyBBcHAoKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
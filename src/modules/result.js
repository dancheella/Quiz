import {UrlManager} from "../utils/url-manager.js";

export class Result {
  constructor() {

    this.routeParams = UrlManager.getQueryParams();
    UrlManager.checkUserData(this.routeParams);

    document.getElementById('result-score').innerText = this.routeParams.score +
      '/' + this.routeParams.total;

    document.getElementById('results').onclick = function () {
      this.routeParams = UrlManager.getQueryParams();

      location.href = '#/answer?name=' + this.routeParams.name + '&lastName=' + this.routeParams.lastName +
      '&email=' + this.routeParams.email + '&id=' + this.routeParams.id + '&score=' + this.routeParams.score +
        '&total=' + this.routeParams.total + '&testId=' + this.routeParams.id + '&results=' + this.routeParams.results;
    };
  }
}
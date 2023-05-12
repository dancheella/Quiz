(function () {
  const Result = {
    init() {
      const url = new URL(location.href);
      document.getElementById('result-score').innerText = url.searchParams.get('score') +
        '/' + url.searchParams.get('total');

      document.getElementById('results').onclick = function () {
        location.href = 'answer.html?testId=' + url.searchParams.get('testId') + '&results=' + url.searchParams.get('results');
      };
    }
  }

  Result.init();
})();
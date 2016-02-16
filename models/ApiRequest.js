var request = require('request');

var ApiRequest = (function() {
  return {
    get: function(url) {
      var promise = new Promise(function(resolve, reject) {
        request.get(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(JSON.parse(body));
          } else {
            reject(error);
          }
        });
      });
      return promise;
    }
  };
})();

module.exports = ApiRequest;

var request = require('request');

var ApiRequest = (function() {
  return {
    get: function(url) {
      console.log('reached get');
      var promise = new Promise(function(resolve, reject) {
        request.get(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('json parse: ', JSON.parse(body));
            resolve(JSON.parse(body));
          } else {
            console.log('reached reject');
            console.log(error);
            reject(error);
          }
        });
      });
      return promise;
    }
  };
})();

module.exports = ApiRequest;

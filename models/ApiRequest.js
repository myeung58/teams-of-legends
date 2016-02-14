var request = require('request');

// var ApiRequest = (function() {
//   var apiKey = process.env.LOL_API_KEY;
//   console.log('api key: ', apiKey);
//   return {
//     get: function(url) {
//       console.log('about to make request to ', url);
//       request.get(url, function (error, response, body) {
//         console.log('error: ', error);
//         if (!error && response.statusCode == 200) {
//           console.log(body);
//           return body;
//         }
//       });
//     }
//   };
// })();

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

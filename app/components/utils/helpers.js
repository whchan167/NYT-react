var axios = require('axios');
var apiCode = '947d5081ff3049009693665d893a4b8f';

var helpers = {
  runQuery: function(term, start, end) {
    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&page=0&sort=newest&begin_date=" + start + "0101&end_date=" + end + "0101&api-key=" + apiCode;
      return axios.get(queryURL)
      .then(function(response){
        return response.data.response.docs;
      });
  },
  getSaved: function() {
    return axios.get('/api/saved')
      .then(function(response){
        return response;
      });
  },
  postSaved: function(title, URL, date) {
    return axios.post('/api/saved', {title:title, URL: URL, date: date}).then(function(result){
      return result;
    });
  },
  deleteSaved: function(id) {
    return axios.delete('/api/saved/' + id).then(function(result) {
      return result;
    });
  }
};
module.exports = helpers;
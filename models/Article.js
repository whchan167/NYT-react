var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema ({
  title: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    unique: true,
  },
  pubdate: {
    type: Date,
  }
});
console.log("loaded article.js")
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema ({
  title: {
    type: String,
    require: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    require: true
  },
  summary: {
      type: String,
      require: true
    },
    ISBN: {
      type: String,
      require: true
    },
    genre: [{
      type: Schema.Types.ObjectId,
      ref: 'Genre'
    }]
})

BookSchema
  .virtual('url')
  .get(function() {
    return '/book/' + this._id;
  });

module.exports = mongoose.model('Book', BookSchema);

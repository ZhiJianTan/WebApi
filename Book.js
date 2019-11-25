const mongoose = require('mongoose');
const db = 'mongodb+srv://zaphkiel1508:zaphy456@opensourcelab-47cce.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  title: { type: String },
  author: {type: String},
  publisher: {type: String},
  publish: { type: String },
  no_pages: { type: Number },
  url: { type: String },
  cover: { type: String },
});

const Book = mongoose.model('Book', schema, 'bookCollection');

module.exports = Book;
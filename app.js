const express = require('express');
const app = express();
const axios = require('axios');
const Book = require('./Book');

//localhost:5000/getBook?title=BookTitle
app.get('/getBook', (req, res) => {
  const book_title = req.query.book_title;
  const querystr1 = `https://www.googleapis.com/books/v1/volumes?q=${book_title}`;

  axios.get(querystr1)
    .then(response1 => {
      var check_isbn = response1.data.items[0].volumeInfo.industryIdentifiers[0].identifier;
      

  const querystr = `https://openlibrary.org/api/books?bibkeys=${check_isbn}&jscmd=data&format=json`;
  return axios.get(querystr); 
    })
    .then(response => {
      const objectKeys = Object.keys(response['data'])
      for(const key of objectKeys) {
      const book = new Book({
        
        title: response['data'][key].title,
        author: response['data'][key].authors[0].name,
        publisher: response['data'][key].publishers[0].name,
        publish: response['data'][key].publish_date,
        no_pages: response['data'][key].number_of_pages,
        url: response['data'][key].url,
        cover: response['data'][key].cover.medium,
      });
      if(!book.title) {
        res.status(400).send('Title not found')
        return
      }

      book.save()
        .then(response => {
          res.send(`Book added successfully`)
        })
        .catch(error => {
          res.status(400).send(error)
        })
      }
    })
  })

//localhost:5000/getallbooks
app.get('/getallbooks', (req, res) => {
  Book.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletebook?title=BookTitle
app.get('/deletebook', (req, res) => {
  Book.deleteMany({ title: req.query.title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client", "build","index.html"))
  })
}

app.listen(process.env.PORT || 5000)
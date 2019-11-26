import axios from 'axios';
import React, { Component } from 'react';
import Popup from 'react-popup';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';
import './Popup.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllBooks = () => {
    axios
      .get('/getallbooks')
      .then(result => {
        this.setState({ books: result.data });
        console.log(this.state.books);
      })
      .catch(error => {
        console.log("error getting book list");
      });
  };
  componentDidMount() {
    this.getAllBooks();
  }

  handleSubmit(e) {
    const query = `/getBook?book_title=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then(result => {
        console.log(result);
        if (result.data === 'Not found') {
          Popup.alert('Book Not Found');
        }
        this.getAllBooks();
      })
      .catch(error => {
        alert('Error: getting book ', error);
      });
  }

  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deletebook?title=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllBooks();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

//Render Webpage UI
  render() {
    var data = this.state.books;
    data = data.reverse();

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <h1>Book</h1>
          <p>Insert book title to search for books</p>
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p />
            <form onSubmit={this.handleSubmit}>
              <label>Enter book title:</label>
              <input
                type="text"
                class="form-control"
                ref={input => (this.input = input)}
              />
              <p />
              <input type="submit" value="Submit" />
            </form>
            <p />
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: 'Title',
                  headerStyle: {background: 'orange'},
                  accessor: 'title',
                  style : {background: 'white'}
                },
                {
                  Header: 'Author',
                  headerStyle: {background: 'orange'},
                  accessor: 'author',
                  style : {background: 'white'}
                },
                {
                  Header: 'Publisher',
                  headerStyle: {background: 'orange'},
                  accessor: 'publisher',
                  style : {background: 'white'}
                },
                {
                  Header: 'Publishing Date',
                  headerStyle: {background: 'orange'},
                  accessor: 'publish',
                  style : {background: 'white'}
                },
                {
                  Header: 'Number of Pages',
                  headerStyle: {background: 'orange'},
                  accessor: 'no_pages',
                  style: { 'white-space': 'unset',
                            background: 'white' }
                },
                {
                  Header: 'Open Library Page',
                  headerStyle: {background: 'orange'},
                  accessor: 'url',
                  style: { 'white-space': 'unset',
                            background: 'white' },
                  Cell: row => {
                    return (
                      <div>
                        <a href={row.original.url}>Visit Page</a>
                        </div>
                    )
                  }
                },
                {
                  Header: 'Book Cover',
                  headerStyle: {background: 'orange'},
                  Poster: 'Book Cover',
                  style : {background: 'white'},
                  Cell: row => {
                    return (
                      <div>
                        <img height={250} src={row.original.cover} />
                      </div>
                    );
                  }
                },
                {
                  Header: 'Delete',
                  headerStyle: {background: 'orange'},
                  accessor: 'title',
                  style : {background: 'white'},
                  Cell: ({ value }) => (
                    <a
                      onClick={() => {
                        this.deleteRecord(value);
                      }}
                    >
                      Delete Record
                    </a>
                  )
                }
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

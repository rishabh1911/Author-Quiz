import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 ffset-1"> 
        <h1>Author Quiz</h1>
        <p>Select the book written by author shown</p>
      </div>
    </div>
  );
}

function Book({title, onClick}) {
  return(
    <div className="answer" onClick ={ ()=>{ onClick(title);}} >
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books, answered, onAnswerSelected}) {

  // Adding Prop Validations
  Turn.prototypes = {
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageSource: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    answered: PropTypes.string.isRequired
  };

  function mapBackgroundColorToAnswer(answered) {
    const mapping = {
      'notAnswered' : 'white',
      'right' : 'green',
      'wrong' : 'red'
    }
    return mapping[answered];
  }
  return (
    <div className="row turn" style={{backgroundColor: mapBackgroundColorToAnswer(answered)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author"/>
      </div>
      <div className="col-6">
        {books.map( (title) => <Book title={title} key={title} onClick ={onAnswerSelected} /> )}
      </div>
    </div>
  );
  // key prop with unique value needed in {books.map( (title) => <Book title={title} key={title}/> )}
}

function Continue({ isVisible, onContinue }) {
  return (
    <div className="continue">
    {
      isVisible ? <div>
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
      </div> : null 
    }
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row" >
      <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="http://commons.wikimedia.org/wiki/Main_Page">Wikemedia Commons</a> and are in the public domain
        </p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    answered: state.answered
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinueClicked: () => {
      dispatch({ type: 'CONTINUE'});
    }
  };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({ turnData, answered , onAnswerSelected, onContinueClicked}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData } answered = {answered} onAnswerSelected ={onAnswerSelected} />
      <Continue isVisible={answered === 'right'} onContinue={onContinueClicked}/>
      <p><Link to="/add"> Add an Author</Link></p>
      <Footer />
    </div>
  );
});

export default AuthorQuiz;

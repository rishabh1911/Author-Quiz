import React, { Component } from 'react';
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

function Turn() {
  return (<div/>);
}

function Continue() {
  return (<div/>);
}

class AuthorQuiz extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn />
        <Continue /> 
      </div>
    );
  }
}

export default AuthorQuiz;

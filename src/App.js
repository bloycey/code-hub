import React, { Component } from 'react';
import CreateSnippet from './components/createSnippet';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      
      <a className="navbar-brand" href="#">Dashboard</a>
      <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <form className="form-inline search-wrapper mt-2 mt-md-0">
          <input className="form-control mr-sm-2 search-bar" type="text" placeholder="Search" aria-label="Search"/>>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

  <div className="container-fluid">
    <div className="row">
      <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Overview <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Reports</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Analytics</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Export</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>
      </nav>

      <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Dashboard</h1>
      
        <CreateSnippet />
          
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>

      </main>
    </div>
  </div>
  </div>
    );
  }
}

export default App;

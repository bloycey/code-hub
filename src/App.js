import React, { Component } from 'react';
import firebase from './firebase.js';
import Masonry from 'react-masonry-component';
import CreateSnippet from './components/createSnippet';
import Snippet from './components/snippets';
import Modal from './components/modal';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      snips: [],
      modalOpen: false,
      masonryOptions: 
      {columnWidth: 5,
      originTop: false}
    }

    this._toggleModal = this._toggleModal.bind(this);
 
  }

  componentDidMount() {

    const itemsRef = firebase.database().ref('snippets');
    itemsRef.on('value', (snapshot) => {
      let snips = snapshot.val();
      let newState = [];
      for (let snip in snips) {
        newState.push({
          id: snip,
          title: snips[snip].title,
          body: snips[snip].body

        });
      }
      this.setState({
        snips: newState
      });
    });
  }
  render() {
    
    
    return (
      <div id="app-wrapper">
      
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      
      <a className="navbar-brand" href="#">Code Hub</a>
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
            <a className="nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Category 1</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Category 2</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Category 3</a>
          </li>
        </ul>
      </nav>

      <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Dashboard</h1>
      
        <button className="openModalBtn" onClick={this._toggleModal}>+</button>

       
       <Modal status={this.state.modalOpen} _toggleModal={this._toggleModal.bind(this)}>
        
        <CreateSnippet snippetName='Descriptive title here' snippetBody='Write your code here. Markdown is supported!' />

        </Modal>
         
    
          
            <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            options={this.state.masonryOptions}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            originTop={false}
        >

            {this.state.snips.map((snip) => {
           return (
            // <span key={snip.id}>
            <Snippet id={snip.id} key={snip.id} title={snip.title} body={snip.body} _toggleModal={this._toggleModal.bind(this)}/>
            // </span>

          )})}

           </Masonry>
          
        
        

      </main>
    </div>
  </div>
  </div>
    );
  }

  _toggleModal(event){
    event.preventDefault();
    this.setState({ 
        modalOpen: !this.state.modalOpen });
}



}

export default App;

import React, { Component } from 'react';
import firebase from './firebase.js';
import Masonry from 'react-masonry-component';
import CreateSnippet from './components/createSnippet';
import Snippet from './components/snippets';
import Modal from './components/modal';
import Search from './components/search';
import Category from './components/category';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      currentDatabase: [],
      activeTab: '',
      tabStates: {
          Misc: false,
          Homepage: false,
          ProductPage: false,
          CategoryPage: false,
          Thumbnail: false,
          BaseQuirks: false
      },
      initialDatabase: [],
      snips: [],
      currentPage: 1,
      snipsPerPage: 5,
      modalOpen: false,
      snipCategories: ["Misc", "Homepage", "Product Page", "Category Page", "Thumbnail", "B@SE Quirks"],
      masonryOptions: 
      {columnWidth: 3},
    }

    this._toggleModal = this._toggleModal.bind(this);
    this._filterCategory = this._filterCategory.bind(this);
    this._resetState = this._resetState.bind(this);
    this._setActiveTab = this._setActiveTab.bind(this);
    this.signInClick = this.signInClick.bind(this);
    this.paginationHandleClick = this.paginationHandleClick.bind(this);
  }

  componentDidMount() {

    this.refs.focusInputFieldDefault.focus();

    const itemsRef = firebase.database().ref('snippets');
    itemsRef.on('value', (snapshot) => {
      let initialDatabase = snapshot.val();
     
      let initialState = [];
      let newState = [];
      let iterator = 0;
      for (let snip in initialDatabase) {
        initialState.unshift({
          id: snip,
          title: initialDatabase[snip].title,
          body: initialDatabase[snip].body,
          images: initialDatabase[snip].images,
          category: initialDatabase[snip].category

        });
      }
      this.setState({
        initialDatabase: initialState,
      });
      for (let snip in initialDatabase) {
        // console.log(iterator);
        // iterator++;
        // if(iterator > this.state.snipsPerPage) {
        //   iterator = 0;
        //   break;
        // }
        newState.unshift({
          id: snip,
          title: initialDatabase[snip].title,
          body: initialDatabase[snip].body,
          images: initialDatabase[snip].images,
          category: initialDatabase[snip].category

        });
      }
      this.setState({
        currentDatabase: newState
      });
    });
  }

  _resetState(){
    this.refs.focusInputFieldDefault.focus()
    this.setState({
      currentPage: 1
    });
    this.setState({
      currentDatabase: this.state.initialDatabase
    });
  }

  _toggleModal(event){
      document.body.style.overflow = "auto";
      this.setState({ 
          modalOpen: !this.state.modalOpen });
}


  searchSnips(query) {

    const itemsRef = firebase.database().ref('snippets');
    let newState = [];
    this.setState({currentDatabase: null});

    itemsRef.once('value', (snapshot) => {
      let searchDatabase = snapshot.val();
      
      for (let snip in searchDatabase) {
        newState.unshift({
          id: snip,
          title: searchDatabase[snip].title,
          body: searchDatabase[snip].body,
          images: searchDatabase[snip].images,
          category: searchDatabase[snip].category
        });
      }
    });


    if(query !== '') {
      let totalresults = [];
      for (let result in newState) {
        const title = newState[result].title.toLowerCase();
        let queryLower = query.toLowerCase();
        if (title.indexOf(queryLower) >= 0) {
          totalresults.push(newState[result]);
        }
      }
      this.setState({currentDatabase: totalresults});
    } else {
      this.setState({currentDatabase: newState});
    }
  }

  _setActiveTab(tab){
    this.setState(
      {activeTab: tab}
    )
  }

  _filterCategory(category, tab){
    this.setState({
      currentPage: 1
    });

    this.setState({
      currentDatabase: this.state.initialDatabase
    });
    let filterBy = (category.category);
    let filterResults = [];
    this.state.initialDatabase.map((snip) => {
      if(snip.category == filterBy) {
        filterResults.push(snip);
      }
    })
    this.setState(
      {currentDatabase: filterResults}
    ); 

   
  }

  signInClick(){

    //Temporary short cut for development
    this.setState({ loggedIn: true 
    }); 
    

//     var provider = new firebase.auth.GoogleAuthProvider();

//     provider.addScope('https://www.googleapis.com/auth/userinfo.email');

// if(this.state.loggedIn == false) {
//   firebase.auth().signInWithPopup(provider).then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     console.log(user.displayName);
//     console.log(user.email);
//     console.log(user.photoURL);

//     var userEmail = user.email; 
//     var emailRegex = new RegExp(/\@neto\.com\.au/); 
 
//     if(emailRegex.test(userEmail)){ 
//       this.setState({ loggedIn: true 
//       }); 
//     } else { 
//       alert("Only @neto.com.au email addresses are allowed"); 
//     }
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     console.log("Sign In Error " + error)
//   });
// } else {
//   firebase.auth().signOut().then(() => {
//     console.log("Signed Out")
//     this.setState({ loggedIn: false
//     });
//   }).catch(function(error) {
//     console.log("Not signed out: " + error)
//   });
// }
}

paginationHandleClick(event) {
  this.setState({
    currentPage: Number(event.target.id)
  });
} 

  

  render() {

    let addSnipButton = null;
    let loginOut = "Login";
    if(this.state.loggedIn == true) {
      addSnipButton = <button className="openModalBtn" onClick={this._toggleModal}>+</button>;
      loginOut = "Log Out"
    }

    let filteredSnips = this.state.currentDatabase;
    const initialSnips = this.state.initialDatabase;
    const currentPage = this.state.currentPage;
    const snipsPerPage = this.state.snipsPerPage;
    const indexOfLastSnip = currentPage * snipsPerPage;
    const indexOfFirstSnip = indexOfLastSnip - snipsPerPage;
    const currentSnips = filteredSnips.slice(indexOfFirstSnip, indexOfLastSnip);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredSnips.length / snipsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (   
        <li
          key={number}
          id={number}
          onClick={this.paginationHandleClick}
          className={number == currentPage ? "active" : "inactive"}
        >
          {number}
        </li>  
      );
    
  });

  let pagination;
      if(filteredSnips.length > snipsPerPage && this.state.loggedIn == true) {
        pagination = renderPageNumbers;
      } else {
        pagination = null;
      }

    return (
      <div id="app-wrapper">
      
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
      
      <a className="navbar-brand" href="#">Code Hub</a>
      <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <Search searchSnips={this.searchSnips.bind(this)}/>
      <div className="btn primary-btn login-btn" onClick={this.signInClick}>{loginOut}</div>
      </div>
    </nav>

  <div className="container-fluid">
    <div className="row">
      <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav nav-pills flex-column">
        <form action="">
            <div className="category-list" tabIndex="0" ref='focusInputFieldDefault' >
            <label><input type="radio"  name="category" onClick={()=> this._resetState()}/>All Snips</label>
            </div>
            
            {this.state.snipCategories.map((category) => {
            return (
            <Category filterCategory={() => this._filterCategory({category}, this.state.activeTab)} category={category.category}>
              {category}
            </Category>
            )})}
            </form>
        </ul>
      </nav>

      <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Dashboard</h1>
      
        {addSnipButton}
      
       <Modal status={this.state.modalOpen} _toggleModal={this._toggleModal.bind(this)}>
        
        <CreateSnippet snippetName='' snippetBody='' images='' category='' snipCategories={this.state.snipCategories} _toggleModal={this._toggleModal.bind(this)}/>

        </Modal>
         
    
          <div className="grid-wrapper">
            <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            options={this.state.masonryOptions}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
            {currentSnips.map((snip, index) => {

           return (
            
            <Snippet id={snip.id} key={index} title={snip.title} body={snip.body} images={snip.images} category={snip.category ? snip.category : "Misc"} snipCategories={this.state.snipCategories} _toggleModal={this._toggleModal.bind(this)} _loggedIn={this.state.loggedIn} />
            

          )})}

           </Masonry>
          
          <ul id="page-numbers" className="pagination">
            {pagination}
          </ul>
          
           </div>
        
      
      </main>
    </div>
  </div>
  </div>
    );
  }



  
}


export default App;

import React from 'react';
import '../App.css';
import firebase from '../firebase.js'

class Snippet extends React.Component {

    removeItem(snipId) {
        const itemRef = firebase.database().ref(`/snippets/${snipId}`);
        itemRef.remove();
      }


    render() { 
        return ( 
            <section className='display-snippet'>
            <div className='wrapper'>
              <ul>
                  <li key={this.props.id}>
                  <h3>{this.props.title}</h3>
                  <p>{this.props.body}</p>
                  <button onClick={() => this.removeItem(this.props.id)}>Remove Item</button>
                  </li>
              </ul>
            </div>
          </section> 

         )
    }
}
 
export default Snippet;
import React from 'react';
import '../App.css';
import firebase from '../firebase.js';
var ReactMarkdown = require('react-markdown');

class Snippet extends React.Component {

    removeItem(snipId) {
        const itemRef = firebase.database().ref(`/snippets/${snipId}`);
        itemRef.remove();
      } 

    render() { 

        
        return ( 
        
            <li className='display-snippet'>
            <div className='wrapper' key={this.props.id}>
              {/* <ul> */}
                  {/* <li > */}
                  <h3>{this.props.title}</h3>
                  <div><ReactMarkdown source={this.props.body}  options={{escapeHtml: false}}/></div>
                  <button onClick={() => this.removeItem(this.props.id)}>Remove Item</button>
                  {/* </li> */}
              {/* </ul> */}
            </div>
          </li> 


         )
    }


}
 
export default Snippet;
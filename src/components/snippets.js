import React from 'react';
import '../App.css';
import firebase from '../firebase.js'

class Snippet extends React.Component {
    render() { 
        return ( 
            <section className='display-snippet'>
            <div className='wrapper'>
              <ul>
                  <li key={this.props.key}>
                  <h3>{this.props.title}</h3>
                  <p>{this.props.body}</p>
                  </li>
              </ul>
            </div>
          </section> 

         )
    }
}
 
export default Snippet;
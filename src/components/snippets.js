import React from 'react';
import '../App.css';
import firebase from '../firebase.js';
import Modal from './modal';
import CreateSnippet from './createSnippet';

var ReactMarkdown = require('react-markdown');

class Snippet extends React.Component {

    constructor() {
        super();
        this.state = {
            editModalOpen: false
        }
    
        this._editToggleModal = this._editToggleModal.bind(this);

      }


    removeItem(snipId) {
        const itemRef = firebase.database().ref(`/snippets/${snipId}`);
        itemRef.remove();
      } 

    editItem(snipId) {
        this.editToggleModal;
    }

    render() { 

        
        return ( 
        
            <li className='display-snippet'>
            <div className='wrapper' key={this.props.id}>
            
                  <h3>{this.props.title}</h3>
                  <div><ReactMarkdown source={this.props.body}  options={{escapeHtml: false}}  softBreak="br"/></div>
                  <hr/>
                  <button className="remove-btn" onClick={() => this.removeItem(this.props.id)}>Remove Code Snippet</button>
                  <button className="edit-btn"onClick={this._editToggleModal}>Edit Code Snippet</button>


                  <Modal status={this.state.editModalOpen} _toggleModal={this._editToggleModal}>
        
                    <CreateSnippet snippetName={this.props.title} snippetBody={this.props.body} _toggleModal={this._editToggleModal} _removeId={this.props.id} />

                </Modal>


            </div>
          </li> 


         )
    }

    _editToggleModal(event){
        // event.preventDefault();
        this.setState({ 
            editModalOpen: !this.state.editModalOpen });

    }

}
 
export default Snippet;
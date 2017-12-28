import React from 'react';
import '../App.css';

export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
          }
          
    }

    render() { 
    
        
        if(this.props.status == false){
        
            return null;
        };


        let modalStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            zIndex: 8000,
            overflowY: 'scroll'
        };


        return (
        
            <div className="backdrop" style={modalStyle} onClick={this.props._toggleModal}>
                <div className="container modal-container" onClick={this._dontClose}>
                {this.props.children}
                </div>
            </div>
            
          )
    }
    
    _dontClose(event){
        event.stopPropagation();
      }

}
 
export default Modal;
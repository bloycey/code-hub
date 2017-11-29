import React from 'react';
import '../App.css';
import firebase from '../firebase.js';
import Textarea from "react-textarea-autosize";
var ReactMarkdown = require('react-markdown');

class CreateSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snippetName: this.props.snippetName,
            snippetBody: this.props.snippetBody,
            textAreaStyles: {
              height: '50px'
            },
          }
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.removeItem = this.removeItem.bind(this);
          this.handleUpload = this.handleUpload.bind(this);
          
    }

    handleUpload(event){
      let file = event.target.files[0];
      let filename = file.name;
      console.log(filename);

      let storageRef = firebase.storage().ref('/snippetImages/' + filename);
      let uploadTask = storageRef.put(file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        alert("Shits fucked");
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        prompt("Copy to clipboard and paste where you'd like the image to appear!", "![](" + downloadURL + ")");
        console.log(downloadURL);
});

    }


    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      removeItem(snipId) {
        const itemRef = firebase.database().ref(`/snippets/${snipId}`);
        itemRef.remove();
      } 

      handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('snippets');
        const snippet = {
          title: this.state.snippetName,
          body: this.state.snippetBody
        }
        itemsRef.push(snippet);
        this.setState({
          snipetName: '',
          snippetBody: ''
        });

        if (this.props._toggleModal) {        
        this.props._toggleModal();
        }

        if (this.props._removeId) {
          this.removeItem(this.props._removeId)
        }
      }

     



    render() { 

      let snippetBtn;
      if(this.props._removeId) {
        snippetBtn = "Edit Snippet"
      } else {
        snippetBtn = "Add Snippet"
      }

             
    let snippetStyle = {
      width: '80%',
      marginLeft: '10%',
      marginTop: '100px',
      zIndex: 9000
    }
        return ( 

         

        <section className='add-code' style={snippetStyle}>
            <form> 
              <input type="text" name="snippetName" placeholder="Title of snippet" onChange={this.handleChange} value={this.state.snippetName} />
             <Textarea type="text" id="codeArea" name="snippetBody" placeholder="Snippet body" onChange={this.handleChange} value={this.state.snippetBody} style={this.state.textAreaStyles} />
              <hr/>
            
              
              <input type="file" id="file" className="upload-group" onChange={this.handleUpload}/>
            
              <hr/>
              <div className="preview-panel">
              <ReactMarkdown source={this.state.snippetBody}  options={{escapeHtml: false, softBreak: "br"}} softBreak="br"/>
              </div>
              <button type="Submit" onClick={this.handleSubmit}>{snippetBtn}</button>
            </form>
        </section>

         )
    }

 


}
 
export default CreateSnippet;
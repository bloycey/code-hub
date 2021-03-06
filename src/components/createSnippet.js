import React from 'react';
import '../App.css';
import firebase from '../firebase.js';
import Textarea from "react-textarea-autosize";
import Category from './category';
import Markdown from 'react-markdown';


class CreateSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snippetName: this.props.snippetName,
            snippetBody: this.props.snippetBody,
            snippetImages: [],
            snippetCategories: this.props.snipCategories,
            snippetCategory: this.props.snippetCategory,
            textAreaStyles: {
              height: '50px'
            },
          }
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleUpload = this.handleUpload.bind(this);
          this.setCategory = this.setCategory.bind(this);

    }

    componentDidMount() {
      if(this.state.snippetCategory == undefined) {
      this.setState({ snippetCategory: "Misc" });
      } else {
        this.setState({ snippetCategory: this.props.category });
      }
   }


    handleUpload(event){
      let file = event.target.files[0];
      let filename = file.name.toString();
      console.log(filename);

      let storageRef = firebase.storage().ref('/snippetImages/' + filename);
      let uploadTask = storageRef.put(file);
      let indicator =  document.getElementById("upload-indicator");
      let uploadPercentage = document.getElementById("upload-percentage");
      let uploadProgress = document.getElementById("upload-progress");

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        uploadPercentage.style.display = "block";
        uploadProgress.style.display = "block";
        uploadPercentage.innerHTML = 'Upload ' + progress.toFixed(2) + '% complete';  
        indicator.style.width = progress + "%";

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        alert("Something went wrong");
        uploadPercentage.style.display = "none";
        uploadProgress.style.display = "none";
      }, function() {
        uploadPercentage.style.display = "none";
        uploadProgress.style.display = "none";
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let downloadURL = uploadTask.snapshot.downloadURL; 
        this.setState({ snippetImages: [...this.state.snippetImages, filename] })
       
        this.setState({
          snippetBody: this.state.snippetBody + "![](" + downloadURL + ")"
        })
  
}.bind(this));

    }

  

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      setCategory(event) {
        this.setState({ snippetCategory: event.target.value });
    }

      handleSubmit(e) {
        e.preventDefault();

        const itemsRef = firebase.database().ref('snippets');
        const snippet = {
          title: this.state.snippetName,
          body: this.state.snippetBody,
          images: this.state.snippetImages,
          category: this.state.snippetCategory
        }
        itemsRef.push(snippet);
        this.setState({
          snipetName: '',
          snippetBody: '',
          snippetImages: [],
          snippetCategory: ''
        });

        if (this.props._toggleModal) {        
        this.props._toggleModal();
        }

        if (this.props._removeId) {
          this.props.removeItem(this.props._removeId, this.props._images);
        }
      }


    render() { 

     

      const snippetBtn = this.props._removeId ? "Edit Snippet" : "Add Snippet";
      const removeBtn = this.props._removeId ? 'primary-btn' : 'hidden';
      
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
              <div id="upload-progress"><div id="upload-indicator"></div></div>
              <div id="upload-percentage" className="text-center"></div>
              
              <select name="Select a Snippet Category" id="snippetCategory" value={this.state.snippetCategory} onChange={this.setCategory}>
              
              {this.state.snippetCategories.map((category) => {
            return (
            <option value={category}>{category}</option>              
            )})} 
              </select>
              <hr/>
              <div className="preview-panel">
              <Markdown source={this.state.snippetBody}  escapeHtml={true}/>
              </div>
              <button type="Submit" className="submit-btn" onClick={this.handleSubmit}>{snippetBtn}</button>
               <button className={removeBtn} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.removeItem(this.props._removeId, this.props._images) } }>Remove Code Snippet</button>
                  
            </form>
        </section>
         )
    }

}
 
export default CreateSnippet;
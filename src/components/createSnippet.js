import React from 'react';
import '../App.css';
import firebase from '../firebase.js';
// import { ReactMde, ReactMdeCommands } from 'react-mde';
// import 'font-awesome/css/font-awesome.css';
// import 'react-mde/lib/styles/react-mde.css';
// import 'react-mde/lib/styles/react-mde-command-styles.css';
// import 'react-mde/lib/styles/markdown-default-theme.css';

class CreateSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snippetName: '',
            snippetBody: '',
            mdeValue: {text: "", selection: null}
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
          snippetBody: e.target.value
        });
      }

    //   handleValueChange(value) {
    //     this.setState({mdeValue: value});
    // }

      

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
      }

      



    render() { 

      // let commands = ReactMdeCommands.getDefaultCommands()

    // console.log(this.props.snippetName, this.props.snippetBody);
    let snippetStyle = {
      width: '80%',
      marginLeft: '10%',
      marginTop: '200px',
      zIndex: 9000
    }
        return ( 

         

        <section className='add-code' style={snippetStyle}>
            <form onSubmit={this.handleSubmit}> 
              <input type="text" name="snippetName" placeholder="Title of snippet" onChange={this.handleChange} value={this.state.snippetName}/>
               {/*<div className="container"> 
                 <ReactMde
                    textareaId="ta1"
                    textareaName="ta1"
                    value={this.state.snippetBody}
                    onChange={this.handleChange}
                    commands={commands} />
              </div>  */}



              <textarea type="text" name="snippetBody" placeholder="Snippet body" onChange={this.handleChange} value={this.state.snippetBody} /> 
              <button>Add Code Snippet</button>
            </form>
        </section>

         )
    }

  


}
 
export default CreateSnippet;
import React from 'react';
import '../App.css';
import firebase from '../firebase.js';
import Textarea from "react-textarea-autosize";

class CreateSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snippetName: '',
            snippetBody: '',
            textAreaStyles: {
              height: '50px'
            }
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
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
      }

      // textAreaAdjust() {
      //   let scrollHeight = document.getElementById("codeArea").scrollHeight;
      //   console.log(scrollHeight);
      //   this.setState({
      //     textAreaStyles: {
      //       height: "1px"
      //     },

      //     textAreaStyles: {
      //       height: (25+scrollHeight)+"px"
      //     } 
      //   });
      // }



    render() { 


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
             <Textarea type="text" id="codeArea" name="snippetBody" placeholder="Snippet body" onChange={this.handleChange} value={this.state.snippetBody} onKeyUp={this.textAreaAdjust} style={this.state.textAreaStyles} />
              <button>Add Code Snippet</button>
            </form>
        </section>

         )
    }

 


}
 
export default CreateSnippet;
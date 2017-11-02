import React from 'react';
import '../App.css';
import firebase from '../firebase.js'

class CreateSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snippetName: '',
            snippetBody: ''
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
              <textarea type="text" name="snippetBody" placeholder="Snippet body" onChange={this.handleChange} value={this.state.snippetBody} />
              <button>Add Code Snippet</button>
            </form>
        </section>

         )
    }

  


}
 
export default CreateSnippet;
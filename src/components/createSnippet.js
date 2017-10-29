import React from 'react';
import '../App.css';

class CreateSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

        <section className='add-code'>
            <form>
              <input type="text" name="title" placeholder="Title of snippet" />
              <textarea type="text" name="currentItem" placeholder="Snippet body" />
              <button>Add Code Snippet</button>
            </form>
        </section>

         )
    }
}
 
export default CreateSnippet;
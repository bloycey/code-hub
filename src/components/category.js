import React from 'react';
import '../App.css';

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: null,
        };
    }

    handleClick() {
        this.refs.focusInputField.focus()
        this.props.filterCategory();  
    };

    render() {

        return (
            <div className="category-list" ref='focusInputField' onClick={this.handleClick.bind(this)} tabIndex="0">
            <label><input type="radio"  name="category" defaultValue="checked"  />{this.props.children}</label>
            </div>
        )
    }
}

export default Category;
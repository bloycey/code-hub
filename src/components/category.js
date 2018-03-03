import React from 'react';
import '../App.css';

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: null,
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        
        this.props.filterCategory();

        // if(this.props.activeTab == this.props.children) {
        //     console.log("It matches")
        //     this.setState({ active: true });
        // } else {
        //     console.log("It DOES NOT match")
        //     this.setState({ active: false });
        // }


        
    };

    render() {
        return (
        <li className="nav-item" onClick={this.handleClick.bind(this)}>
            <a className={this.state.active ? 'nav-link active': 'nav-link'} href="#">{this.props.children}</a>
          </li>
        )
    }
}

export default Category;
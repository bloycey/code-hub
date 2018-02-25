import React from 'react';
import '../App.css';

class Search extends React.Component {

    handleSearch(event) {
        this.props.searchSnips(event.target.value)
    }

    render() {
        return (
        <div className="form-inline search-wrapper mt-2 mt-md-0">
          <input className="form-control mr-sm-2 search-bar" type="text" placeholder="Search" aria-label="Search" onKeyUp={this.handleSearch.bind(this)}/>
        </div>
        )
    }
}

export default Search;
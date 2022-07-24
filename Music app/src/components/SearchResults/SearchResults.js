import React from 'react';
import "../tracklist/tracklist.css";
import Tracklist from "../tracklist/tracklist";
class SearchResults extends React.Component{
    
    render(){
        return(
        <div className= "SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={this.props.SearchResults} onAdd={this.props.onAdd}></Tracklist>
         
        </div>
        );
    }
}

export default SearchResults;
import React from 'react';
import "./Playlist.css";
import Tracklist from "../tracklist/tracklist";
class Playlist extends React.Component{
    constructor(props) {
      super(props)
    
      this.handleNameChange= this.handleNameChange.bind(this);
    }
    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }
    
    render(){
        return(
        <div className="Playlist">
            <input onChange={this.handleNameChange} defaultvalue="New Playlist"></input>
            <Tracklist track={this.props.PlaylistTracks}
            onAdd={this.props.doThese}
             isRemoval={true}
             onRemove={this.props.onRemove}/>
             <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</button>
            
           </div>
        );
    }
}

export default Playlist;
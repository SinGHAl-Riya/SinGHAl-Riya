import React from 'react';
import "./tracklist.css";
import Track from "../track/track";
class Tracklist extends React.Component{
    render(){
        return(
        <div className="Tracklist">
            {this.props.tracks.map(track=>{
                return(
                    <Track
                    track={track}
                    key={track.id}
                  onAdd={this.props.onAdd}
                    isRemoval={this.props.isRemoval}
                    onRemove={this.props.onRemove}
                    />
                );
            })}
        </div>
        );
    }
}

export default Tracklist;
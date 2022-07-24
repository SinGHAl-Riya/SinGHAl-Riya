import React from 'react';
import './App.css';

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import spotify from "../../util/spotify";

class App extends React.Component{
      constructor(props) {
        super(props);
      
        this.state = {
           SearchResults: [],
           playlistName: "New Playlist",
           playlistTracks: []
        };
        this.search=this.search.bind(this);
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
        this.updatePlaylistName=this.updatePlaylistName.bind(this);
        this.savePlaylist=this.savePlaylist.bind(this);
        this.removeTrackSearch=this.removeTrackSearch.bind(this);
        this.doThese=this.doThese.bind(this);
         
      }

      search(term){
        spotify.search(term).then(SearchResults=>{
          this.setstate({SearchResults: SearchResults});
        });
      }

      addTrack(track){
        let tracks=this.state.playlistTracks;
        if(tracks.find(savedTrack => savedTrack.id === track.id)){
          return ;
        }
        tracks.push(track);
        this.setState({playlistTracks: tracks});
      }
      
      removeTrack(track){
        let tracks=this.state.playlistTracks;
        let trackSearch=this.state.SearchResults;
        tracks=tracks.filter(currentTrack=>currentTrack.id!==track.id);
        trackSearch.unshift(track);
        this.setState({playlistTracks: tracks});
      }

      removeTrackSearch(track){
        let tracks=this.state.SearchResults;
        tracks=tracks.filter(currentTrack=>currentTrack.id!==track.id);
        this.setState({SearchResults:tracks});
      }

      doThese(track){
        this.addTrack(track);
        this.removeTrackSearch(track);
      }

      updatePlaylistName(name){
        this.setState({updatePlaylistName: name});
      }

      savePlaylist(){
        const trackuris= this.state.playlistTracks.map(track=>track.uri);
        spotify.savePlaylist(this.state.playlistName,trackuris).then( () =>{
          this.setState({
            updatePlaylistName: "New Playlist",
             playlistTracks: []
          });
        });
      }
      

  render(){
  return (
    <div>
      <h1>
        <a href="https://localhost:3000">Musicool</a>
      </h1>
      <div classname="App">
        <SearchBar onSearch={this.search}/>
        <div name="App-Playlist">
          <SearchResults SearchResults={this.state.SearchResults}  onAdd={this.doThese}/>
          <Playlist playlistTracks={this.state.playlistTracks} onChangeName={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>        </div>
      </div>
    </div>
  );
  }
}


export default App;

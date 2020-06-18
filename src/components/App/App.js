import React from 'react';
import '../App/App';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Levels',
          artist: 'Avicii',
          album: 'Singles EP',
          id: 1
        },
        {
          name: 'Silhouette',
          artist: 'Avicii',
          album: 'Singles EP',
          id: 2
        },
        {
          name: 'I Could Be The One',
          artist: 'Avicii',
          album: 'Singles EP',
          id: 3
        },
        {
          name: 'Fade Into Darkness',
          artist: 'Avicii',
          album: 'Singles EP',
          id: 4
        }
      ],
      playlistName: 'Simply Avicii',
      playlistTracks: [
        {
          name: 'Levels',
          artist: 'Avicii',
          album: 'Singles EP',
          id: 5
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(song => song.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;

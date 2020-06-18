let accessToken;
const clientId = "dcd2dbabc15b419884f2c970b71d1ebd";
const redirectURL = "https://localhost:3000/";

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const accessTokenMatch = window.location.href.match(
        /access_token=([^&]*)/
      );
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
      }
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      if (jsonResponse.tracks){
        return jsonResponse.tracks.map(track => {
          return {
            id : track.id,
            name: track.name,
            artist: track.artists[0],
            album: track.album.name,
            uri: track.uri
          };
        })
      }
      else{
        return [];
      }
    });
  },

  savePlaylist(playlistName,URIArray){
    if (!(playlistName && URIArray)){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const header = {
      Authorization: `Bearer ${accessToken}`
    };
    let userID;
    return fetch(`https://api.spotify.com/v1/me`,{ headers: header }
    ).then(response => {
      return response.json();
    }
    ).then(jsonResponse => {
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists `,{
        headers: header,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }
      ).then(response => response.json()
      ).then(jsonResponse => {
        const playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
          headers : header,
          method: 'POST',
          body: JSON.stringify({uris: URIArray})
        })
      })
    })
  }
};

export default Spotify;

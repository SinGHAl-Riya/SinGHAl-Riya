const clientid = "501663bbeb21421f957697763dc789fb";
const redirecturi = "https://localhost:3000";
let accesstoken;
const spotify={
    getaccessToken(){
        if(accesstoken){
            return accesstoken;
        }
        const accessTokenMatch=window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accesstoken=accessTokenMatch[1];
            const expiresIn=Number(expiresInMatch[1]);
            window.setTimeout(()=>(accesstoken=""),expiresIn*1000);
            window.history.pushState("Access Token",null,"/");
            return accesstoken;
        }else{
            const accessurl=`https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirecturi}`;
            window.location=accessurl;
        }

    },
    
    search(term){
        const accesstoken = spotify.getaccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&g=${term}`,{
            headers:{
                Authorization: `Bearer ${accesstoken}`
            }
        
    }).then(response=>{
        return response.json();
    }).then(jsonResponse=>{
        return jsonResponse.json();
    }).then(jsonResponse=>{
        if(!jsonResponse.tracks){
            return[];
        }
        return jsonResponse.tracks.items.map(track=>({
            id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri,
        }));
    });
}, 

savePlaylist(name, trackuris){
    if(!name||!trackuris.length){
        return;
    }
    const accesstoken=spotify.getaccessToken();
    const headers={Authorization: `Bearer ${accesstoken}`};
    let userid;
     return fetch("https://api.spotify.com/v1/me",{headers: headers})
    .then(response=>response.json())
    .then(jsonResponse=>{
        userid=jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userid}/playlists`,{
            headers: headers,
            method:"POST",
            body: JSON.stringify({name:name})
        })
        .then(response=> response.json())
        .then(jsonResponse=>{
            const playlistid=jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userid}/playlists/${playlistid}/tracks`,{
                headers: headers,
                method: "POST",
                body: JSON.stringify({uris:trackuris})

            });
        });
    });
}
};
export default spotify;

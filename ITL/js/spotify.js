const clientId = '09fc632abb814688850ee9ca4dc00d4d';
const clientSecret = '920d4ac57f18401d983214372f0396bf';
let token = 'blank';
let trackID = '5ChkMS8OtdzJeqyybCc9R5';
let beats = [""];
let tatums = [""];
let bars = [""];
let trackInfo = [""];
let i = 0;
let searchTerm = "Beyonce";
let imgArray = [
    "https://imgur.com/VHfGt8U.png",
    "https://imgur.com/JiuSElA.png",
    "https://imgur.com/ZRCJQYI.png",
    "https://imgur.com/Ymrouac.png",
    "https://imgur.com/pg86li9.png",
    "https://imgur.com/mRFwxoO.png",
    "https://imgur.com/jnGcLOn.png",
    "https://imgur.com/sCKV3b4.png",
    "https://imgur.com/GrnOOMf.png",
    "https://imgur.com/xJhY5JH.png",
    "https://imgur.com/Kp4we51.png",
    "https://imgur.com/iRfjaKW.png"
];
let stopButtonClick = 0;


async function getToken(event){
    // event.preventDefault(); 
    let result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    let data = await result.json();
    token = data.access_token;
    console.log(token);
}


document.addEventListener("DOMContentLoaded", getToken());

$(document).ready(function (){

$("#search-form").animate({ opacity: "1"}, 2000 );
$(".stars").animate({ opacity: "1"}, 2000 );
$(".stars-two").animate({ opacity: "1"}, 2000 );

document
  .getElementById('search-form')
  .addEventListener('submit', search);


async function getAudioFeatures() {

    let result = await fetch(`https://api.spotify.com/v1/audio-features/${trackID}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    let data = await result.json();
    console.log("tempo: "+data.tempo);
    console.log("danceability: "+data.danceability);
    console.log("duration (ms): "+data.duration_ms);
    console.log("get audio features function ran");
}

async function getBeats() {

    let result = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackID}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    let data = await result.json();
    console.log("first beat (seconds): "+data.beats[0].start);
    console.log("number of beats: "+data.beats.length);
    console.log("last beat start (seconds): "+data.beats[data.beats.length-1].start);
    // console.log("beats start: "+data.beats.duration);
    console.log("first tatum (seconds): "+data.tatums[0].start);
    console.log("duration (seconds): "+data.track.duration);
    beats = data.beats;
    tatums = data.tatums;
    bars = data.bars;
    console.log("get beats function ran");
    console.log("beats tatums bars lengths: " + beats.length +", "+ tatums.length +", "+ bars.length);
}
async function search(event) {
    event.preventDefault();
    beats = [""];
    tatums = [""];
    bars = [""];  
    document.getElementById('song-search-results').innerHTML = "";
    stopButtonClick = 0;

    searchTerm = document.querySelector('input[name="search-term"]').value;

    let result = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    let data = await result.json();
    trackInfo = data.tracks.items;
    console.log("search function ran");
    console.log(trackInfo);



    let songOne = document.createElement("p");
    songOne.setAttribute("id", "song-one");
    songOne.setAttribute("class", "song-output");
    let trackName = document.createTextNode(trackInfo[0].name);
    songOne.appendChild(trackName);

    songOneArtist = document.createElement("p");
    songOneArtist.setAttribute("id", "song-one-artist");
    songOneArtist.setAttribute("class", "song-output-artist");
    let artistName = document.createTextNode(" - " + trackInfo[0].artists[0].name);
    songOneArtist.appendChild(artistName);

    document.getElementById('song-search-results').appendChild(songOne).appendChild(songOneArtist);

    document.getElementById('song-one').addEventListener('click', function (){
        trackID = trackInfo[0].uri.substring(14);
        console.log("Song1: "+trackID);
        getBeats();
        addEmbededTrack ();
        console.log("beats tatums bars lengths: " + beats.length + tatums.length + bars.length);
    })

    let songTwo = document.createElement("p");
    songTwo.setAttribute("id", "song-two");
    songTwo.setAttribute("class", "song-output");
    let trackNameTwo = document.createTextNode(trackInfo[1].name);
    songTwo.appendChild(trackNameTwo);

    songTwoArtist = document.createElement("p");
    songTwoArtist.setAttribute("id", "song-two-artist");
    songTwoArtist.setAttribute("class", "song-output-artist");
    let artistNameTwo = document.createTextNode(" - " + trackInfo[1].artists[0].name);
    songTwoArtist.appendChild(artistNameTwo);

    document.getElementById('song-search-results').appendChild(songTwo).appendChild(songTwoArtist);

    

    document.getElementById('song-two').addEventListener('click', function (){
        trackID = trackInfo[1].uri.substring(14);
        getBeats();
        addEmbededTrack ();
    })

    let songThree = document.createElement("p");
    songThree.setAttribute("id", "song-three");
    songThree.setAttribute("class", "song-output");
    let trackNameThree = document.createTextNode(trackInfo[2].name);
    songThree.appendChild(trackNameThree);

    songThreeArtist = document.createElement("p");
    songThreeArtist.setAttribute("id", "song-two-artist");
    songThreeArtist.setAttribute("class", "song-output-artist");
    let artistNameThree = document.createTextNode(" - " + trackInfo[2].artists[0].name);
    songThreeArtist.appendChild(artistNameThree);

    document.getElementById('song-search-results').appendChild(songThree).appendChild(songThreeArtist);

    document.getElementById('song-three').addEventListener('click', function (){
        trackID = trackInfo[2].uri.substring(14);
        getBeats();
        addEmbededTrack ();
    });

}

function addSongLyrics(name){
    const geniuslyrics = document.getElementById("embedded-lyrics");

    name.replace("/ /g","%20")
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a02c152admshf1082edd89ae651p12fa5ejsn1166a1f4e4dc',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
    options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2a02c152admshf1082edd89ae651p12fa5ejsn1166a1f4e4dc",
          "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
      };
    fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${name}&per_page=10&page=1`, options)
        .then(response => response.json())
        .then(response => {
            const url=`https://genius-song-lyrics1.p.rapidapi.com/songs/${response.response.hits[0].result.id}/lyrics`;
        console.log(url);
        fetch(
          url,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            geniuslyrics.innerHTML = `${response.response.lyrics.lyrics.body.html}`;
            console.log("I am in Console");
          })
          .catch((err) => console.error(err));
        })
        .catch(err => console.error(err));
}

function addEmbededTrack (){
    addSongLyrics(searchTerm);
    
    document.getElementById('song-search-results').innerHTML = "";
    document.getElementById('embedded-song').innerHTML = "";
    let link = `https://open.spotify.com/embed/track/${trackID}`;
    let html = 
    `
    <iframe id="embedded-song-inner" onclick="iframeClickFunction()" src="${link}" 
    width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    `;
    
    document.getElementById('embedded-song').innerHTML = html;
    document.getElementById('embedded-song-inner').addEventListener('click', function(){
    });


    //-----from github
    let myConfObj = {
        iframeMouseOver : false
      }
      window.addEventListener('blur',function(){
        if(myConfObj.iframeMouseOver){
          $(".stop-box").addClass("show");
          $("#embedded-song").addClass("hide");
          window.focus(); // Can't get the window to focus again without clicking out of the iframe

//---------Try adding animate function in if statement for iframe click----/// 

            $.each(beats, function(key, value) {
                    
                if(stopButtonClick == 1) {
                    // document.getElementById('dancing-gif').innerHTML = "";
                    // beats = [""];
                    return false; 
                }    

                    if(key % 2 == 0) {

                        for (let i = 0; i < 6; i++) {

                            setTimeout(function () {
                                console.log("key: "+key+", time: "+ (value.start + (value.duration/6)*(i+1)) * 1000);
                                let image = `<img src="${imgArray[i]}" width="300">`;
                                document.getElementById('dancing-gif').innerHTML = image;
                                if(stopButtonClick == 1) {
                                    document.getElementById('dancing-gif').innerHTML = "";
                                    // beats = [""];
                                    return false; 
                                }
                            }, (value.start + (value.duration/6)*(i+1)) * 1000);

                        }

                    }

                    else {

                        for (let i = 0; i < 6; i++) {

                            setTimeout(function () {
                                console.log("key: "+key+", time: "+ (value.start + (value.duration/6)*(i+1)) * 1000);
                                let image = `<img src="${imgArray[i+6]}" width="300">`;
                                document.getElementById('dancing-gif').innerHTML = image;
                                if(stopButtonClick == 1) {
                                    document.getElementById('dancing-gif').innerHTML = "";
                                    // beats = [""];
                                    return false; 
                                }
                            }, (value.start + (value.duration/6)*(i+1)) * 1000);
                            

                        }
                    }


                if(key % 2 == 0) {
                  $(".stars").animate({opacity: ".2"} , value.duration*1000 );
                } 
                else {
                  $(".stars").animate({opacity: "1"} , value.duration*1000 );
                }
            });
      
            $.each(tatums, function(key, value) {
              if(key % 2 == 0) {
                  $(".stars-two").animate({opacity: ".2"} , value.duration*1000 );
              } else {
                  $(".stars-two").animate({opacity: "1"} , value.duration*1000 );
              }
            })
      
            $.each(bars, function(key, value) {
              if(key % 2 == 0) {
                  $(".background-color").animate({opacity: ".4"} , value.duration*1000 );
              } else {
                  $(".background-color").animate({opacity: "1"} , value.duration*1000 );
              }
            })
          

//---------Try adding animate function in if statement for iframe click----///


        }//end of if statemetn
      });//end of blur event listener

    //   window.addEventListener('focus',function(){
    //     console.log('focus');
    //   });
      
    //   document.getElementById('embedded-song-inner').addEventListener('mouseover',function(){
    //     myConfObj.iframeMouseOver = true;
    //  });

    //  document.getElementById('embedded-song-inner').addEventListener('mouseout',function(){
    //      myConfObj.iframeMouseOver = false;
    //  });
     

    //-------

    //touchstart, touchend

}


  $( "#btn2" ).click(function() {
    location.reload(); ///////Have it refresh the page for now...
    $.each(tatums, function(key, value) {
        $( ".stars" ).stop();
        $( ".stars-two" ).stop();
        document.getElementById('embedded-song').innerHTML = "";
        $(".stop-box").removeClass("show");
        $("#embedded-song").removeClass("hide");
        // document.getElementById('dancing-gif').innerHTML = "";
      });
      stopButtonClick = 1;
      beats = [""];
      tatums = [""];
      bars = [""];
      $(".stars").animate({opacity: "1"} , 1000 );
      $(".stars-two").animate({opacity: "1"} , 1000 );
      //document.getElementById('dancing-gif').innerHTML = "";
  });

});
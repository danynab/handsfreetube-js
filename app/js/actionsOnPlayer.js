$(document).ready(function() {

});

function up() {
  volumeUp();
}

function down() {
  volumeDown();
}

function left() {
  nextVideo();
}

function right() {
  previousVideo();
}

//gest.start();
gest.options.sensitivity(80);

gest.options.subscribeWithCallback(function(gesture) {
  if (gesture.up) up();
  else if (gesture.down) down();
  else if (gesture.left) left();
  else if (gesture.right) right();
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-frame', {
    height: '390',
    width: '640',
    playerVars: {
      listType: 'playlist',
      list: 'PLxXJWa4J5wHroL1uRodUAeJlaOMs0-Ylc',
      controls: 0,
      iv_load_policy: 3,
      showinfo: 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  setCurrentVolume();
  changeTitle();
  fillPlaylist();
  //event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.pauseVideo();
  $('.play').toggleClass('fa-play', true);
  $('.play').toggleClass('fa-pause', false);
}

function playVideo() {
  player.playVideo();
  $('.play').toggleClass('fa-play', false);
  $('.play').toggleClass('fa-pause', true);
  changeTitle();
  fillPlaylist();
}

function nextVideo() {
  player.nextVideo();
  fillPlaylist();
}

function previousVideo() {
  player.previousVideo();
  fillPlaylist();
}

function volumeUp() {
  player.setVolume(player.getVolume() + 10);
  setCurrentVolume();

}

function volumeDown() {
  player.setVolume(player.getVolume() - 10);
  setCurrentVolume();
}

function changeVideoState() {
  var state = player.getPlayerState();
  if ([-1, 0, 2, 5].indexOf(state) >= 0)
    playVideo();
  else if (state == 1)
    stopVideo();
}

function changeTitle() {
  $("h1").text(player.getVideoData().title);
}

function setCurrentVolume() {
  $('.volume').attr('value', player.getVolume());
}

function fillPlaylist() {
  $('.sidemenu').find('ul').remove();

  // Fill playlist menu
  var list = "<ul>"
  player.getPlaylist().forEach(function(videoID) {
    list += "<li class='playlist-item'>" + videoID + "</li>";
  });
  list += "</ul>"

  $('.sidemenu').append(list);
}

var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.onresult = function(event) {
  var result = event.results[event.results.length - 1];
  //console.log('confidence: ' + result[0].confidence + ' - transcript: ' + result[0].transcript + ' - isFinal: ' + result.isFinal)
  var transcript = result[0].transcript;
  $('.search input').val(transcript);
  if (result.isFinal) {
    console.log(transcript);
    searchPlaylists(transcript);
  }
}
recognition.onend = function() {
  $('.search').removeClass('recording');
  annyang.start();
}

if (annyang) {
  var commands = {
    'play': playVideo,
    'stop': stopVideo,
    'playlist': showPlaylist,
    'look for': search
  };

  annyang.addCommands(commands);

  annyang.start();
}

function search() {
  annyang.abort();
  recognition.start();
  openSearchPanel();
  $('.search').addClass('recording');
  $('.search input').val('');
  console.log("Looking for...");
}

setInterval(function() {
  var totalTime = player.getDuration();
  var currentTime = player.getCurrentTime();
  var progress = 0;

  if (totalTime != 0)
    progress = (currentTime / totalTime) * 100;

  $('.player').attr('value', progress);


}, 1000)

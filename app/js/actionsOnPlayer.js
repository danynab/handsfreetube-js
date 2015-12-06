
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
  changeTitle();
  fillPlaylist();
  setCurrentVolume();
  if (event.data == YT.PlayerState.PLAYING) {
    $('.play').addClass('fa-pause');
    $('.play').removeClass('fa-play');
  } else {
    $('.play').addClass('fa-play');
    $('.play').removeClass('fa-pause');
  }
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    done = true;
  }

}

function stopVideo() {
  player.pauseVideo();
  //$('.play').toggleClass('fa-play', true);
  //$('.play').toggleClass('fa-pause', false);
}

function playVideo() {
  player.playVideo();
  //$('.play').toggleClass('fa-play', false);
  //$('.play').toggleClass('fa-pause', true);
  //changeTitle();
  //fillPlaylist();
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
  /*$('.sidemenu').find('ul').remove();

  // Fill playlist menu
  var list = "<ul>"
  player.getPlaylist().forEach(function(videoID) {
    list += "<li class='playlist-item'>" + videoID + "</li>";
  });
  list += "</ul>"

  $('.sidemenu').append(list);*/
  iterar(0, player.getPlaylist());
}

function iterar(i, videos) {
  if (i < videos.length - 1) {
    requestNameVideo(videos[i], function(name) {
      videosNames.push(name);
      iterar(i + 1, videos);
    });
  } else {
    requestNameVideo(videos[i], function(name) {
      videosNames.push(name);
      fillPlay();
    });
  }
}
var videosNames = [];

function fillPlay() {
  $('.sidemenu ul').html('');

  // Fill playlist menu
  var list = ''
  videosNames.forEach(function(name) {
    list += "<li class='playlist-item'>" + name + "</li>";
  });
  videosNames = [];

  $('.sidemenu ul').html(list);
}

function selectNumber(param) {
  console.log(param);
  if (recognition.lang == 'es-ES') {
    if (param.toLowerCase().indexOf('un') > -1) {
      param = 1;
    } else if (param.toLowerCase().indexOf('do') > -1) {
      param = 2;
    } else if (param.toLowerCase().indexOf('tres') > -1) {
      param = 3;
    } else if (param.toLowerCase().indexOf('cua') > -1) {
      param = 4;
    } else if (param.toLowerCase().indexOf('cin') > -1) {
      param = 5;
    }
  } else {
    if (param.indexOf('one') > -1) {
      param = 1;
    } else if (param.indexOf('two') > -1) {
      param = 2;
    } else if (param.indexOf('three') > -1) {
      param = 3;
    } else if (param.indexOf('fo') > -1) {
      param = 4;
    } else if (param.indexOf('fi') > -1) {
      param = 5;
    }
  }
  var id = $('.search-result[data-number="' + param + '"]').data('id');
  console.log(param + ' - ' + id);
  if (id != undefined) {
    player.loadPlaylist({
      list: id,
      listType: 'playlist'
    });
    closeSearchPanel();
  }
}

setInterval(function() {
  var totalTime = player.getDuration();
  var currentTime = player.getCurrentTime();
  var progress = 0;

  if (totalTime != 0)
    progress = (currentTime / totalTime) * 100;

  $('.player').attr('value', progress);
}, 1000)

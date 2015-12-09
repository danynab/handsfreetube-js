$(document).ready(function() {
  hideAll();

  setTimeout(function() {
    $('body').addClass('loaded');
    setTimeout(showHelpPanel, 1000);
  }, 1000);

  $('#nav-icon').click(function() {
    if ($('#nav-icon').hasClass('open')) {
      closeSidebar();
    } else {
      closeSearchPanel();
      openSidebar();
    }
  });

  $('.search i').click(function() {
    if ($('.search').hasClass('open')) {
      closeSearchPanel();
    } else {
      closeSidebar();
      search();
    }
  });

  $('body').on('click', '.blur', function() {
    closeSidebar();
    closeSearchPanel();
    hideSpeakDialog();
    hideHelpPanel();
  });

  $('.welcome').click(function() {
    closeSearchPanel();
    hideSpeakDialog();
    hideHelpPanel();
  });

  $('.play').on('click', function() {
    $(this).toggleClass('active');
    changeVideoState();
  });

  $('.volume-up').on('click', function() {
    volumeUp();
  })

  $('.volume-down').on('click', function() {
    volumeDown();
  })

  $('.forward').on('click', function() {
    nextVideo();
  })

  $('.backward').on('click', function() {
    previousVideo();
  })

  $('body').on('click', '.search-result', function() {
    var id = $(this).data('id');
    player.loadPlaylist({
      list: id,
      listType: 'playlist'
    });
    closeSearchPanel();
    showAll();
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();
    var query = $('.search-form input').val();
    searchPlaylists(query);
  });

  $('.fa-microphone').on('click', toogleVoiceCommands);

  $('.fa-hand-paper-o').on('click', function() {
    if ($('.fa-hand-paper-o').hasClass('active')) {
      gest.stop();
      stopWebcam();
    } else {
      gest.start();
      startWebcam();
    }
    $('.fa-hand-paper-o').toggleClass('active');
  });

  $('.help-panel .button').click(function() {
    if ($('.help-panel').hasClass('show')) {
      hideHelpPanel();
    } else {
      showHelpPanel();
    }
  });
});

function hideAll() {
  $('h1').addClass('new');
  $('.video').addClass('new');
  $('.controls').addClass('new');
  $('#nav-icon').addClass('new');
  $('.options').addClass('new');
}

function showAll() {
  if (!$('.welcome').hasClass('removed')) {
    $('.welcome').addClass('removed');
    $('.controls').removeClass('new');
    $('.controls').addClass('animated fadeInUpBig');
    $('#nav-icon').removeClass('new');
    $('#nav-icon').addClass('animated fadeInLeftBig');
    $('.options').removeClass('new');
    $('.options').addClass('animated fadeInRightBig');
  }
}

function toogleVoiceCommands() {
  if ($('.fa-microphone').hasClass('active'))
    annyang.abort();
  else
    annyang.start();
  $('.fa-microphone').toggleClass('active');
}

function hideHelpPanel() {
  if ($('.help-panel').hasClass('show')) {
    $('.help-panel').removeClass('show');
    $('#nav-icon').removeClass('blur');
    $('.content').removeClass('blur');
    $('.footer').removeClass('blur');
    $('.right-icons').removeClass('blur');
  }
}

function showHelpPanel() {
  $('.help-panel').addClass('show');
  $('#nav-icon').addClass('blur');
  $('.content').addClass('blur');
  $('.footer').addClass('blur');
  $('.right-icons').addClass('blur');
}

function showSpeakDialog() {
  if (!$('.welcome').hasClass('removed')) {
    hideHelpPanel();
    closeSearchPanel();
    closeSidebar();
    $('.welcome').addClass('blur');
  } else {
    $('#nav-icon').addClass('blur');
    $('.content').addClass('blur');
    $('.footer').addClass('blur');
    $('.right-icons').addClass('blur');
    player.pauseVideo();
  }
  $('.help-panel').addClass('blur');
  $(".speak-dialog").addClass("show");
}

function hideSpeakDialog() {
  if (!$('.welcome').hasClass('removed')) {
    $('.welcome').removeClass('blur');
  }
  $('#nav-icon').removeClass('blur');
  $('.content').removeClass('blur');
  $('.footer').removeClass('blur');
  $('.help-panel').removeClass('blur');
  $('.right-icons').removeClass('blur');
  $(".speak-dialog").removeClass("show");
}

function openSearchPanel() {
  if (!$('.welcome').hasClass('removed')) {
    $('.welcome').addClass('blur');
  } else {
    $('#nav-icon').addClass('blur');
    $('.content').addClass('blur');
    $('.footer').addClass('blur');
    $('.right-icons .options').addClass('blur');
    player.pauseVideo();
  }
  $('.search-form input').val('');
  $('.search').addClass('open');
  $('.help-panel').addClass('blur');
  setTimeout(function() {
    $('.search-form input').focus();
  }, 500);
}

function closeSearchPanel() {
  if ($('.search').hasClass('open')) {
    recognition.stop();
    if ($('h1').hasClass('new')) {
      $('.welcome').removeClass('blur');
    }
    $('#nav-icon').removeClass('blur');
    $('.search').animate({
      scrollTop: 0
    }, 'slow');
    setTimeout(function() {
      $('.search').removeClass('expand');
      setTimeout(function() {
        $('.search').removeClass('open');
        setTimeout(function() {
          $('.right-icons .options').removeClass('blur');
          $('.footer').removeClass('blur');
          $('.help-panel').removeClass('blur');
          $('.content').removeClass('blur');
        }, 500);
      }, 500);
    }, 500);
  }
}

function closeSidebar() {
  if ($('#nav-icon').hasClass('open')) {
    $('#nav-icon').removeClass('open');
    $('.sidemenu').removeClass('open');
    $('.content').removeClass('blur');
    $('.footer').removeClass('blur');
    $('.help-panel').removeClass('blur');
    $('.right-icons').removeClass('blur');
  }
}

function openSidebar() {
  if ($('.welcome').hasClass('removed')) {
    $('#nav-icon').addClass('open');
    $('.sidemenu').addClass('open');
    $('.content').addClass('blur');
    $('.footer').addClass('blur');
    $('.help-panel').addClass('blur');
    $('.right-icons').addClass('blur');
  }
}

function showPlaylist() {
  if ($('.welcome').hasClass('removed')) {
    $('#nav-icon').addClass('open');
    $('.sidemenu').addClass('open');
    $('.content').addClass('blur');
    $('.footer').addClass('blur');
    $('.help-panel').addClass('blur');
    $('.right-icons').addClass('blur');
  }
}

function onPlaylistsSearchResults(playlists) {
  var container = $('.results').html('');
  playlists.forEach(function(playlist, i) {
    var html = '<div data-number="' + (i + 1) + '" data-id="' + playlist.id;
    html = html + '" class="search-result"><img src="' + playlist.thumbnail;
    html = html + '" /><div class="title"><p>' + (i + 1) + '. ' + playlist.title + '</p></div></div>';
    container.append(html);
  });
  $('.search.open').addClass('expand');
  console.log(playlists);
}
var video = document.querySelector("#myVideo");
var videoStream;

function startWebcam() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      video: true
    }, handleVideo, videoError);
  }

  function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
    videoStream = stream;
  }

  function videoError(e) {

  }

}

function stopWebcam() {
  videoStream.stop();
}

startWebcam();
var colors = new tracking.ColorTracker(['cyan']);

colors.on('track', function(event) {
  if (event.data.length === 0) {
    // No colors were detected in this frame.
  } else {
    event.data.forEach(function(rect) {
      player.stopVideo();
    });
  }
});
tracking.track('#myVideo', colors);

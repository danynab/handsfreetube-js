$(document).ready(function() {
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
      openSearchPanel();
    }
  });

  $('body').on('click', '.blur', function() {
    closeSidebar();
    closeSearchPanel();
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
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();
    var query = $('.search-form input').val();
    searchPlaylists(query);
  });

  $('.fa-microphone').on('click', function() {
    if($('.fa-microphone').hasClass('active'))
      annyang.abort();
    else
      annyang.start();
    $('.fa-microphone').toggleClass('active');
  });

  $('.fa-hand-paper-o').on('click', function() {
    if($('.fa-hand-paper-o').hasClass('active')) {
      gest.stop();
      stopWebcam();
    }
    else {
      gest.start();
      startWebcam();
    }
    $('.fa-hand-paper-o').toggleClass('active');
  });
});

function openSearchPanel() {
  $('.search-form input').val('');
  $('.search').addClass('open');
  $('.content').addClass('blur');
  $('.right-icons .options').addClass('blur');
  setTimeout(function() {
    $('.search-form input').focus();
  }, 500);
}

function closeSearchPanel() {
  if ($('.search').hasClass('open')) {
    $('.search').animate({
      scrollTop: 0
    }, 'slow');
    setTimeout(function() {
      $('.search').removeClass('expand');
      setTimeout(function() {
        $('.search').removeClass('open');
        setTimeout(function() {
          $('.right-icons .options').removeClass('blur');
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
    $('.right-icons').removeClass('blur');
  }
}

function openSidebar() {
  $('#nav-icon').addClass('open');
  $('.sidemenu').addClass('open');
  $('.content').addClass('blur');
  $('.right-icons').addClass('blur');
}

function showPlaylist() {
  $('#nav-icon').toggleClass('open');
  $('.sidemenu').toggleClass('open');
  $('.content').toggleClass('blur');
  $('.right-icons').toggleClass('blur');
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
      navigator.getUserMedia({video: true}, handleVideo, videoError);
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

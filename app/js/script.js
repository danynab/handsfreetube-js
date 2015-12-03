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

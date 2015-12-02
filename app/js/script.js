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

});

function openSearchPanel() {
  $('.search').addClass('open');
  $('.content').addClass('blur');
  $('.right-icons .options').addClass('blur');
}

function closeSearchPanel() {
  $('.search').removeClass('open');
  $('.content').removeClass('blur');
  $('.right-icons .options').removeClass('blur');
}

function closeSidebar() {
  $('#nav-icon').removeClass('open');
  $('.sidemenu').removeClass('open');
  $('.content').removeClass('blur');
  $('.right-icons').removeClass('blur');
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
  console.log(playlists);
}

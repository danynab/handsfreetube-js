$(document).ready(function() {
  $('#nav-icon').click(function() {
    $('#nav-icon').toggleClass('open');
    $('.sidemenu').toggleClass('open');
    $('.content').toggleClass('blur');
    $('.right-icons').toggleClass('blur');
  });

  $('body').on('click', '.blur', function() {
    $('#nav-icon').click();
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


function showPlaylist() {
  $('#nav-icon').toggleClass('open');
  $('.sidemenu').toggleClass('open');
  $('.content').toggleClass('blur');
  $('.right-icons').toggleClass('blur');
}

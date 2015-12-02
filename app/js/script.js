$(document).ready(function() {
  $('#nav-icon').click(function() {
    $(this).toggleClass('open');
    $('.sidemenu').toggleClass('open');
    $('.content').toggleClass('blur');
    $('.right-icons').toggleClass('blur');
  });

  $('body').on('click', '.blur', function() {
    $('#nav-icon').click();
  });

  $('.play').click(function() {
    $(this).toggleClass('active');
  });
});

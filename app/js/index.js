$(document).ready(function() {
  setTimeout(function() {
    $('body').removeClass('hide');
  }, 500);

  gest.start();
  gest.options.sensitivity(80);

  gest.options.subscribeWithCallback(function(gesture) {
    if (gesture.left) {
      left();
    } else if (gesture.right) {
      right();
    }
  });

  $('img.es').click(toEs);
  $('img.en').click(toEn);
});


function toEs() {
  $("body").addClass("hide");
  setTimeout(function() {
    window.location.href = 'tutorial_es.html';
  }, 500);
}

function toEn() {
  $("body").addClass("hide");
  setTimeout(function() {
    window.location.href = 'tutorial_en.html';
  }, 500);
}

function left() {
  console.log("left");
  toEs();
}

function right() {
  console.log("right");
  toEn();
}

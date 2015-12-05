var tutorialStep = 0;
var steps = 3;
//var language = 'es-ES';
var completedSteps = 0;
var language = "en-GB";


$(document).ready(function() {
  $("a.skip").click(goToPlayer);

  gest.start();
  gest.options.sensitivity(80);

  gest.options.subscribeWithCallback(function(gesture) {
    if (gesture.up) up();
    else if (gesture.down) down();
    else if (gesture.left) left();
    else if (gesture.right) right();
  });

  $(".circle").click(function() {
    var step = $(this).data("item");
    console.log(step);
    if (tutorialStep != step) {
      nextStep(step);
    }
  });

  if (annyang) {
    var commands;
    if (language == "es-ES") {
      commands = {
        "reproducir": function() {
          $(".command.play").addClass("correct");
          checkCommands();
        },
        "parar": function() {
          $(".command.stop").addClass("correct");
          checkCommands();
        },
        "playlist": function() {
          $(".command.playlist").addClass("correct");
          checkCommands();
        },
        "buscar": function() {
          $(".command.lookfor").addClass("correct");
          checkCommands();
        },
        "numero *param": function() {
          $(".command.number").addClass("correct");
          checkCommands();
        },
        "ayuda": function() {
          $(".command.help").addClass("correct");
          checkCommands();
        }
      };
    } else {
      commands = {
        "play": function() {
          $(".command.play").addClass("correct");
          checkCommands();
        },
        "stop": function() {
          $(".command.stop").addClass("correct");
          checkCommands();
        },
        "playlist": function() {
          $(".command.playlist").addClass("correct");
          checkCommands();
        },
        "look for": function() {
          $(".command.lookfor").addClass("correct");
          checkCommands();
        },
        "number *param": function() {
          $(".command.number").addClass("correct");
          checkCommands();
        },
        "help": function() {
          $(".command.help").addClass("correct");
          checkCommands();
        }
      };
    }

    annyang.addCommands(commands);

    annyang.start();
  }

});

function goToPlayer() {
  $("header").addClass("fadeOutDownBig");
  $("main").addClass("fadeOutDownBig");
  $("footer").addClass("fadeOutDownBig");
  $("body").addClass("hide");
  setTimeout(function() {
    window.location.href = "player.html";
  }, 500);
}

function checkCommands() {
  if ($(".command.play").hasClass("correct") &&
    $(".command.stop").hasClass("correct") &&
    $(".command.playlist").hasClass("correct") &&
    $(".command.lookfor").hasClass("correct") &&
    $(".command.number").hasClass("correct") &&
    $(".command.help").hasClass("correct")) {
    completedSteps = completedSteps + 1;
    nextStep(tutorialStep + 1);
  }
}

function up() {
  switch (tutorialStep) {
    case 1:
      if (!$("i.up").hasClass("correct")) {
        $("i.up").addClass("correct");
        if ($("i.down").hasClass("correct")) {
          completedSteps = completedSteps + 1;
          nextStep(tutorialStep + 1);
        }
        break;
      }
  }
}

function down() {
  switch (tutorialStep) {
    case 1:
      if (!$("i.down").hasClass("correct")) {
        $("i.down").addClass("correct");
        if ($("i.up").hasClass("correct")) {
          completedSteps = completedSteps + 1;
          nextStep(tutorialStep + 1);
        }
        break;
      }
  }
}

function left() {
  switch (tutorialStep) {
    case 0:
      if (!$("i.right").hasClass("correct")) {
        $("i.right").addClass("correct");
        if ($("i.left").hasClass("correct")) {
          completedSteps = completedSteps + 1;
          nextStep(tutorialStep + 1);
        }
        break;
      }
  }
}

function right() {
  switch (tutorialStep) {
    case 0:
      if (!$("i.left").hasClass("correct")) {
        $("i.left").addClass("correct");
        if ($("i.right").hasClass("correct")) {
          completedSteps = completedSteps + 1;
          nextStep(tutorialStep + 1);
        }
        break;
      }
  }
}

function nextStep(step) {
  if (completedSteps == steps) {
    setTimeout(goToPlayer, 500);
  }
  if (step < steps) {
    setTimeout(function() {
      tutorialStep = step;
      for (var i = 0; i < step; i++) {
        $(".step-" + i).removeClass("right");
        $(".step-" + i).addClass("left");
        $('.circle[data-item="' + i + '"]').removeClass("active");
      }
      $(".step-" + step).removeClass("left");
      $(".step-" + step).removeClass("right");
      $('.circle[data-item="' + step + '"]').addClass("active");
      for (var i = step + 1; i < steps; i++) {
        $(".step-" + i).removeClass("left");
        $(".step-" + i).addClass("right");
        $('.circle[data-item="' + i + '"]').removeClass("active");
      }

    }, 500);
  }
}

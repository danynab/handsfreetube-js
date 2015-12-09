var CONTEXT_PLAYER = 0;
var CONTEXT_SEARCH = 1;
var CONTEXT_RESULTS = 2;
var CONTEXT_PLAYLIST = 3;
var CONTEXT_COMMAND = 4;
var CONTEXT_HELP = 5;

var lastLeft = new Date().getTime();
var lastRigth = new Date().getTime();
var gestureTimeout;
var gestureDelay = 500;
var scrollVariation = 300;

$(document).ready(function() {
  gest.start();
  gest.options.sensitivity(80);

  gest.options.subscribeWithCallback(function(gesture) {
    if (gesture.up) {
      performGesture(up);
    } else if (gesture.down) {
      performGesture(down);
    } else if (gesture.left) {
      lastLeft = new Date().getTime();
      if ((lastLeft - lastRigth) < gestureDelay) {
        performGesture(rightLeft);
      } else {
        performGesture(left);
      }
    } else if (gesture.right) {
      lastRigth = new Date().getTime();
      if ((lastRigth - lastLeft) < gestureDelay) {
        performGesture(leftRight);
      } else {
        performGesture(right);
      }
    }
  });
});

function up() {
  switch (checkContext()) {
    case CONTEXT_PLAYER:
      volumeUp();
      break;
    case CONTEXT_RESULTS:
      scrollContainer($(".search"), -scrollVariation);
      break;
    case CONTEXT_PLAYER:
      scrollContainer($(".sidemenu"), -scrollVariation);
      break;
    case CONTEXT_COMMAND:
      hideSpeakDialog();
      break;
  }
}

function down() {
  switch (checkContext()) {
    case CONTEXT_PLAYER:
      volumeDown();
      break;
    case CONTEXT_RESULTS:
      scrollContainer($(".search"), scrollVariation);
      break;
    case CONTEXT_PLAYER:
      scrollContainer($(".sidemenu"), scrollVariation);
      break;
    case CONTEXT_COMMAND:
      hideSpeakDialog();
      break;
    case CONTEXT_HELP:
      hideHelpPanel();
      break;
  }
}

function left() {
  switch (checkContext()) {
    case CONTEXT_PLAYER:
      nextVideo();
      break;
    case CONTEXT_PLAYLIST:
      closeSidebar();
      break;
    case CONTEXT_COMMAND:
      hideSpeakDialog();
      break;
  }
}

function right() {
  switch (checkContext()) {
    case CONTEXT_PLAYER:
      previousVideo();
      break;
    case CONTEXT_SEARCH:
    case CONTEXT_RESULTS:
      closeSearchPanel();
      break;
    case CONTEXT_COMMAND:
      hideSpeakDialog();
      break;
  }
}

function leftRight() {
  switch (checkContext()) {
    case CONTEXT_PLAYER:
      showSpeakDialog();
      break;
    case CONTEXT_COMMAND:
      hideSpeakDialog();
      break;
  }
}

function rightLeft() {
  switch (checkContext()) {
    case CONTEXT_PLAYER:
      showSpeakDialog();
      break;
    case CONTEXT_COMMAND:
      hideSpeakDialog();
      break;
  }
}

function scrollContainer(container, variation) {
  var scroll = container.scrollTop()
  container.animate({
    scrollTop: scroll + variation
  }, '500');
}

function performGesture(gesture) {
  clearTimeout(gestureTimeout);
  gestureTimeout = setTimeout(gesture, gestureDelay);
}

function checkContext() {
  if ($(".speak-dialog").hasClass("show")) {
    return CONTEXT_COMMAND;
  } else if ($(".help-panel").hasClass("show")) {
    return CONTEXT_HELP;
  } else if ($('.search').hasClass('open')) {
    if ($('.search').hasClass('expand')) {
      return CONTEXT_RESULTS;
    } else {
      return CONTEXT_SEARCH;
    }
  } else if ($('.sidemenu').hasClass('open')) {
    return CONTEXT_PLAYLIST;
  } else {
    return CONTEXT_PLAYER;
  }
}

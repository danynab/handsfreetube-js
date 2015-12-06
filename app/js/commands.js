var recognition;
var language = "en-GB";
//var language = "es-ES";

$(document).ready(function() {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = language;
  recognition.interimResults = true;
  recognition.onresult = function(event) {
    var result = event.results[event.results.length - 1];
    var transcript = result[0].transcript;
    $('.search input').val(transcript);
    if (result.isFinal) {
      console.log(transcript);
      searchPlaylists(transcript);
    }
  }
  recognition.onend = function() {
    $('.search').removeClass('recording');
    annyang.start();
  }

  if (annyang) {
    var commands;
    if (recognition.lang == 'es-ES') {
      commands = {
        'reproducir': function() {
          invokeCommand(playVideo);
        },
        'parar': function() {
          invokeCommand(stopVideo);
        },
        'playlist': function() {
          invokeCommand(showPlaylist);
        },
        'buscar': function() {
          invokeCommand(search);
        },
        'numero *param': function() {
          invokeCommand(selectNumber);
        }
      };
    } else {
      commands = {
        'play': function() {
          invokeCommand(playVideo);
        },
        'stop': function() {
          invokeCommand(stopVideo);
        },
        'playlist': function() {
          invokeCommand(showPlaylist);
        },
        'look for': function() {
          invokeCommand(search);
        },
        'number *param': function() {
          invokeCommand(selectNumber);
        }
      };
    }

    annyang.addCommands(commands);
    annyang.start();
  }
});

function invokeCommand(command) {
  hideSpeakDialog();
  command();
}

function search() {
  annyang.abort();
  recognition.start();
  openSearchPanel();
  $('.search.open').removeClass('expand');
  $('.search').addClass('recording');
  $('.search input').val('');
  console.log("Looking for...");
}

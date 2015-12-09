var key = 'AIzaSyAcOL57GkIJe2IfxF_33EloOd8AAhkjcko';
var baseUrl = 'https://www.googleapis.com/youtube/v3';

function searchPlaylists(query) {
  var queryEncoded = encodeURI(query);
  var url = baseUrl + '/search?part=snippet&type=playlist&q=' + queryEncoded + '&key=' + key;
  $.get(url, function(data) {
    if (data.hasOwnProperty('items')) {
      var playlists = data.items.map(function(item) {
        var id = item.id.playlistId;
        var snippet = item.snippet;
        var title = snippet.title;
        var thumbnail = snippet.thumbnails.high.url;
        return {
          id: id,
          title: title,
          thumbnail: thumbnail
        };
      });
      onPlaylistsSearchResults(playlists);
    }
  });
}

function requestNameVideo(id, callback) {
  var url = baseUrl + '/videos?part=snippet&id=' + id + '&key=' + key;
  $.get(url, function(data) {
    if (data.hasOwnProperty('items')) {
      var video = data.items[0];
      var title = video.snippet.title;
      callback(title);
    }
  });
}

function requestVideosInPlaylist(id, callback) {
  var url = baseUrl + '/playlistItems?part=snippet&maxResults=50&playlistId=' + id + '&key=' + key;
  $.get(url, function(data) {
    if (data.hasOwnProperty('items')) {
      var videos = data.items.map(function(video) {
        console.log(video);
        var id = video.snippet.resourceId.videoId;
        var title = video.snippet.title;
        var thumbnail = video.snippet.thumbnails.high.url;
        return {
          id: id,
          title: title,
          thumbnail: thumbnail
        };
      });
      callback(videos);
    }
  });
}

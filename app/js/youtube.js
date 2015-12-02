var key = 'AIzaSyAcOL57GkIJe2IfxF_33EloOd8AAhkjcko';
var baseUrl = 'https://www.googleapis.com/youtube/v3';

function searchPlaylists(query) {
  var url = makeUrl(query);
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

function makeUrl(query) {
  var queryEncoded = encodeURI(query);
  return baseUrl + '/search?part=snippet&type=playlist&q=' + queryEncoded + '&key=' + key;
}

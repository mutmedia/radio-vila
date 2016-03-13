var RadioServerActionCreators = require('../actions/RadioServerActionCreators');
var $ = require('jquery');

function logIntoSongQueue(songQueue, user) {
  // TODO: Make multiple songQueues possible
  var socket = io.connect('http://localhost:8080/' + songQueue.id);
  console.log("Connected to io:" + 'http://localhost:8080/' + songQueue.id);
  //$.post('http://localhost/api/songQueues/'  + songQueue.id + /users/, body: {user.name})
  return socket;
}

module.exports = {

  getSongQueue: function() {
    // simulate retrieving data from a database
    $.ajax({
      method: 'GET',
      url:'/api/songqueues/56e478d10195456025000001/songs',
    })
    .done(function(res) {
      console.log("Got SongQueue");
      console.log(res);
      RadioServerActionCreators.receiveAll({songs: res.json});
    })
    .fail(function(res) {
      console.log("ERROR");
      console.log(res);
    });
  },

  init: function() {
    // TODO: Make multiple songQueues possible and remove this
    this.getSongQueue();
  },

  addSong: function(song) {
    // Implement Correct API Call here
    $.ajax({
      method: 'POST',
      url:'/api/songqueues/56e478d10195456025000001/songs',
      data: song
    })
    .done(function(msg) {
      console.log("Song created");
      console.log(msg);
      RadioServerActionCreators.addSongSuccess(song);
    })
    .fail(function(msg) {
      console.log("ERROR");
      console.log(msg);
    });
  },

  userLogin: function(user) {
    // Implement Correct API Call here
    $.get('/api/songqueues/56e478d10195456025000001').then(function(value) {
      var songQueue = logIntoSongQueue({id: '56e478d10195456025000001'});
      songQueue.on('alerta', function(data) {
        console.log("Oie " + data.name);
        songQueue.emit('alerta-cliente', {name: user.name});
      });
      RadioServerActionCreators.userLoginSuccess(user);
    }, function(reason) {
      console.log('Error');
      console.log(reason);
    });
  },

  userLogout: function(user) {
    // Implement Correct API Call here
    setTimeout(function() {RadioServerActionCreators.userLogoutSuccess(user);}, 100);
  },

  voteQueuedSong: function(id, rating) {
    //setTimeout(function() {RadioServerActionCreators.voteQueuedSongSuccess(id, rating);}, 0);
  },
};

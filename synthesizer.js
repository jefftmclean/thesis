
$(document).ready(function(){

  units = 8;

  tracks = [
    [
      {note:C4,start:1,duration:2},
      {note:E4,start:3,duration:1},
      {note:D4,start:4,duration:1}
    ],
    [
      {note:E4,start:1,duration:2},
      {note:G4,start:3,duration:1},
      {note:F4,start:4,duration:1}
    ],
    [
      {note:C3,start:1,duration:4}
    ],
  ]


  addEnds = function(){
    for(i=0;i<tracks.length;i++){
      for(j=0;j<tracks[i].length;j++){
        var note = tracks[i][j];
        if (note.start + note.duration > units){
          note.end = 1;
        } else {
          note.end = note.start + note.duration;
        }
      }
    }
  }
  addEnds();


  context = new webkitAudioContext();

  generateSynth = function(){
    gains = new Array();
    oscillators = new Array();
    for(i=0;i<tracks.length;i++){
      gains.push([]);
      oscillators.push([]);
      for (j=0;j<tracks[i].length;j++){
        gains[i].push(context.createGainNode());
        oscillators[i].push(context.createOscillator());
        gains[i][j].gain.value = 0;
        oscillators[i][j].frequency.value = tracks[i][j].note;
        oscillators[i][j].type = "triangle";
        oscillators[i][j].start(0);
        gains[i][j].connect(context.destination);
        oscillators[i][j].connect(gains[i][j]);
      }
    }
  }
  generateSynth();

  window.addEventListener('touchstart', function() {

    // create empty buffer
    var buffer = context.createBuffer(1, 1, 22050);
    var source = context.createBufferSource();
    source.buffer = buffer;

    // connect to output (your speakers)
    source.connect(context.destination);

    // play the file
    source.noteOn(0);

  }, false);

  var beat = 1;
  playback = function(){
    for (i=0;i<tracks.length;i++){
      for (j=0;j<tracks[i].length;j++){
        if (tracks[i][j].start == beat){
          gains[i][j].gain.value = 1;
        } else if (tracks[i][j].end == beat) {
          gains[i][j].gain.value = 0;
        }
      }
    }
    if (beat == units){
      beat = 1;
    } else {
      beat += 1;
    }
  }
  var interval;
  play = function(barLength){
    interval = setInterval(playback, barLength/units);
  }
  stop = function(){
    clearInterval(interval);
    for(i=0;i<tracks.length;i++){
      for(j=0;j<tracks[i].length;j++){
        gains[i][j].gain.value = 0;
      }
    }
  }


  changeTimbre = function(type){
    for (i=0;i<tracks.length;i++){
      for (j=0;j<tracks[i].length;j++){
        oscillators[i][j].type = type;
      }
    }
  }

});
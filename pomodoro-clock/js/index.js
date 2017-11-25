var clock = {
  h : 0,
  m : 0,
  s : 0,
  startClock: function(){
    this.timeoutID = window.setInterval(this.con(),1000);
  },
  con: function(){
    console.log('Hello');
  },
  stopClock:function(){
    window.clearInterval(this.timeoutID);
  },
  setHour : function( hour ){
    this.h = hour;
  },
  getHour : function(){
    return this.h;
  },
  setMinutes : function( mins ){
    this.m = mins;
  },
  getMinutes : function(){
    return this.m;
  },
  setSeconds : function( sec ){
    this.s = sec;
  },
  getSeconds : function(){
    return this.s;
  },
  now : function(){
    return Date.now();
  }
}
clock.setHour( 3 );
clock.setMinutes( 52 );
clock.setSeconds( 12 );
console.log( clock.getHour()+':'+clock.getMinutes()+':'+clock.getSeconds()+'-'+ clock.now());
clock.startClock();
//clock.stopClock();
var intID,
    sessionTimer;
function startClock(){
  intID = setInterval(this.play,1000);
}
function play(){
  console.log(sessionTimer);
  if( sessionTimer <= 0 ){ stopClock(); }
  sessionTimer -= 1;
}
function stopClock(){
    clearInterval(intID);
}
function setTime( timer ){
  sessionTimer = timer*6;
}

setTime(1);
startClock();
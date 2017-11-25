var stageSelector = $('#calcStage'),
    historySelector = $('.calc-hist'),
    historyEntriesSelector = $('.h-entries');
//Need to focus on stage in the begining
$('.calc-press').click(function( e ){
  calculate( this.id, stageSelector.html() );
});
$(document).keypress(function(e){
  var numPad = [13,37,42,43,45,46,47,48,49,50,51,52,53,54,55,56,57,94,99];
  if( numPad.includes( e.which ) ){
    calculate( e.key, stageSelector.html() );
  }
});
$('.h-clean').click(function(){
  clearHistory();
});
function calculate( sign, text ){
  var textLength = text.length,
      result = 0;
  if( sign == '=' || sign == 'Enter' ){
    if(text.includes('^')){
      var valFromText = text.split('^'),
          powVal = Math.pow(valFromText[0],valFromText[1]);
      result = eval(powVal);
    }else{
      result = eval(text);  
    }
    clearStage( stageSelector )
    stageSelector.append(result);
    historyEntriesSelector.append("<div class='row h-entry'>"+text+'='+result+"</div>");
  }else if(sign == 'c'){
    clearStage( stageSelector );
  }else if(sign == 'backspace'){
    stageSelector.html(text.substr(-36, textLength-1));
  }else{
    stageSelector.append(sign);
  }
}

function clearStage( stageID ){
  stageID.html('');
}
function clearHistory(){
  historyEntriesSelector.html('');
}

/*

$('.clc-press').click(function( e ){
  //text in the stage only should be gotten when click occur
  var ht = stageSelector.html(),
      htl = ht.length;
  if( this.id == '=' ){
    if(ht.includes('^')){
      var newHt = ht.split('^'),
          powHt = Math.pow(newHt[0],newHt[1]);
      var s = eval(powHt);
    }else{
      var s = eval(ht);  
    }
    
    Basicly eval solve the calculation
    but this isnt how i want to solve.
    +Consider eval for quick solution but
    make your own objects for more advanced calculations
    +Consider to code your own parser for 
    scientific calculations
    
    //$('#calcStage').html('');
    clearStage( stageSelector )
    stageSelector.append(s);
    historySelector.append("<div class='row h-entry'>"+ht+'='+s+"</div>");
  }else if(this.id == 'c'){
      clearStage( stageSelector );
  }else if(this.id == 'backspace'){
    
    - quick hack for backspace but need to do it right later.
    - 36 character limit
    
    stageSelector.html(ht.substr(-36, htl-1));
    //console.log(htl+':::'+ht.substr(-36, htl-1));
  }else{
    stageSelector.append(this.id);
  }
});

*/

//calculator is the simplest one now. But I will occasionally make progress
//consider eval() to use in calculator.
/*
var Calculator = function(){
	this.firstInput = 0;
  this.secondInput = 0;
  
  this.sum = function(i,j){
  	i = i != null ? i : this.firstInput;
    j = j != null ? j : this.secondInput;
    console.log( i+j );
  };
  
  this.minus = function(i,j){
  	i = i != null ? i : this.firstInput;
    j = j != null ? j : this.secondInput;
  	if( i > j && i > 0 ){ console.log(i-j); }
    else{ console.log( j -i ); }
  };
  
  this.multiply = function(i,j){
  	i = i != null ? i : this.firstInput;
    j = j != null ? j : this.secondInput;
    console.log( i * j );
  };
};
*/
/*
var c = new Calculator();
c.firstInput = 957;
c.secondInput = 146;
c.sum();
c.sum(3,5);
c.minus();
c.multiply();
*/
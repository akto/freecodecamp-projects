var Randomise = {
  url : "https://raw.githubusercontent.com/akto/test/master/quotes.json",
  quoteGenerator : function(){
      $.getJSON(this.url, function(data){
        var quotes = data.Quotes;
         ;
      var rn = Math.floor( Math.random() * quotes.length-1 );
        //alert(rn + '---' +this.quoteLength);
        $('.quote-text').addClass('animated zoomIn').text(quotes[rn].quote);
        $('.quote-author').text(quotes[rn].author);
        if( quotes[rn].quote.length <= 140 ){
          $('.quote-text').removeClass('font-decrease');
          $('.quote-character-count').text('Character Count: ' + quotes[rn].quote.length);
        }else{
          $('.quote-text').addClass('font-decrease');
          $('.quote-character-count').text('Character Count: ' + quotes[rn].quote.length + ' It\'s not suitable for Twitter, Sorry!');
          
        }
        $("#tweet-quote").attr("data-tweet-text",quotes[rn].quote);
        $("#tweet-quote").attr("data-tweet-author",quotes[rn].author);
      });
   },
  removeAnimation : function(){
    $('.quote-text').removeClass('animated zoomIn');
  }
};
$(document).ready(function(){
  $('#quote-card').addClass('animated zoomInUp');
  $("#new-quote-gen").click(function(){
    Randomise.quoteGenerator();
    Randomise.removeAnimation();
    var colors = [['#E44D26','#F16529'],['#0575E6','#021B79'],['#f85032','#e73827'],['#cb2d3e','#ef473a'],['#56ab2f','#a8e063'],['#2C3E50','#4CA1AF'],['#141E30','#243B55'],['#c2e59c','#64b3f4'],['#8E0E00','#1F1C18'],['#00c6ff','#0072ff'],['#FF4E50','#F9D423'],['#4b6cb7','#182848'],['#232526','#414345'],['#1D976C','#93F9B9'],['#F7971E','#FFD200']];
    var rc = Math.floor( Math.random() * colors.length );
    $('.card,.b-quote').css('background', 'linear-gradient(to right,'+colors[rc][0]+','+colors[rc][1]);
    
  });
  $("#tweet-quote").click(function(){
    var author = $("#tweet-quote").attr("data-tweet-author");
    var quoteText = $("#tweet-quote").attr("data-tweet-text");
    window.open('https://twitter.com/intent/tweet?text="'+ encodeURIComponent(quoteText) + '" by '+ encodeURIComponent(author) + ' @freeCodeCamp', 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  });

});
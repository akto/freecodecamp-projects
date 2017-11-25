$(document).ready(function () {
  $("ul.scrool a").bind("click",function(event){
    var anchor = $(this);
    
    $("html, body").stop().animate({
      scrollTop: $(anchor.attr("href")).offset().top
    }, 1500);
    
    event.preventDefault();
    
  });
});
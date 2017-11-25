var page = 'https://en.wikipedia.org/?curid=';
var title = "Mustafa Kemal Atatürk";
$("#searchit").keypress(function(event){
  if( event.which == 13 ){
    $(this).addClass('search-keypress');
    title = $(this).val();
    getWikiContent( title, page );
  }
  
});
function getWikiContent( title, page ){
$.ajax({
  url: '//en.wikipedia.org/w/api.php',
  data: { action: 'query', 
  generator:'search', 
  gsrsearch: title, 
  format: 'json',
  gsrnamespace:0,
  gsrlimit:10,//limit should be applied?
  prop:'pageimages|extracts',
  pilimit:'max',
  exintro:'',
  explaintext:'',
  exsentences:1,
  exlimit:'max'
  },
  dataType: 'jsonp',
  success: function (d) {
    var arr = d.query.pages;
    var html = "<ul>";
    //console.log(arr);
    for(key in arr){
      html += '<li><div class="row">'+arr[key].title+'</div><div class="row">'+'<a target="_blank" href="'+page+arr[key].pageid+'"><i class="fa fa-external-link" aria-hidden="true"></i> '+page+arr[key].pageid+'</a></div><div class="row">'+'\n'+arr[key].extract+'</div></li>';  
  /*console.log(arr[key].title+'\n'+page+arr[key].pageid+'\n'+arr[key].extract);*/
    }
    html += "</ul>";
    $('#wiki-content').html(html);
  }
});
}
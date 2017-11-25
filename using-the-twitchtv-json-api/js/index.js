/*

Actually building an application in pure javascript is quite long process 

*/

(function(){
  var TwitchAPIObj = {
    //channel list array
    channelList : ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
    /* Need a method to parse json data because of I used json ajax call twice */
    /*gettingJSONData : function(){}*/
    //creating links for json parsing
    getAPI : function(){
      this.channelList.map(function( e ){
        var streamUrl = "https://api.twitch.tv/kraken/streams/"+e+"?client_id=r21xgp0cju9jz9cnbsjddhgoq4t5kxa",
        channelReqUrl = "https://api.twitch.tv/kraken/channels/"+e+"?client_id=r21xgp0cju9jz9cnbsjddhgoq4t5kxa",
        channelName  = e,
        channelUrl   = '',
        channelImg   = 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F',
        channelStatus = '',
        html = '',
        request = new XMLHttpRequest();
        //console.log( url );
        if(!request){ alert('Oh Noooo, Something wrong!'); }
        request.open( 'GET', streamUrl, true );
        request.send();
        request.onreadystatechange = function(){
          if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
              var data = JSON.parse(request.responseText);
              if( data.stream !== null ){
                channelName = data.stream.channel.display_name;
                channelUrl = data.stream.channel.url;
                channelImg = data.stream.channel.logo;
                channelStatus = data.stream.channel.status;
                html += "<div class='row channel ch-on'><div class='col s12 m1 l1'><p><img class='responsive-img' src='"+channelImg+"'></p></div><div class='col s12 m1 l1'><p><i class='material-icons online-icon'>visibility</i></p></div><div class='col s12 m4 l3'><p><a class='online' target='_blank' href='"+channelUrl+"'> "+channelName+"</a></p></div><div class='col s12 m6 l7'><p class='channel-status-note truncate'>"+channelStatus+"</p></div></div>";
                //console.log(data);
              }else{
                var channelRequest = new XMLHttpRequest();
                if(!channelRequest){ alert('Oh Noooo, Something wrong!'); }
                channelRequest.open( 'GET', channelReqUrl, true );
                channelRequest.send();
                channelRequest.onreadystatechange = function(){
                  if(channelRequest.readyState === XMLHttpRequest.DONE){
                    if(channelRequest.status === 200){
                      var datam = JSON.parse(channelRequest.responseText);
                      channelUrl = datam.url;
                      channelImg = datam.logo !== null ? datam.logo : 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F';
                      channelStatus = datam.status;
                      html += "<div class='row channel ch-off'><div class='col s12 m1 l1'><p><img class='responsive-img' src='"+channelImg+"'></p></div><div class='col s12 m1 l1'><p><i class='material-icons offline-icon'>visibility_off</i></p></div><div class='col s12 m4 l3'><p><a class='offline' href='"+channelUrl+"'> "+channelName+"</a></p></div><div class='col s12 m6 l7'><p class='channel-status-note truncate'>Offline - "+channelStatus+"</p></div></div>";
                      document.getElementById('channel-list').innerHTML += html;
                    }
                  }
                }
                
              }
              document.getElementById('channel-list').innerHTML += html;
            }else{
              alert('There is a problem: '+request.status);
            }
          }
        };
      });
    }
    
  };
 TwitchAPIObj.getAPI();
 
  
})();

/* Easy way */
$('#btn-on').click(function(){
  $('.ch-off').hide();
  $('.ch-on').show();
});

$('#btn-off').click(function(){
  $('.ch-on').hide();
  $('.ch-off').show();
});

$('#btn-all').click(function(){
  $('.ch-on').show();
  $('.ch-off').show();
});

/*
var d = document;
var elemON = d.getElementsByClassName('ch-on');
var elemOFF = d.getElementsByClassName('ch-off');
d.getElementById('btn-on').addEventListener("click", function(){
  //console.log(elemOFF);
  for( var prop in elemOFF ){
    
    elemOFF[prop].style.visibility = 'hidden';
    elemOFF[prop].style.display = 'none';
  };
  for( var pro in elemON ){
    elemON[pro].style.visibility = 'visible';
    elemON[pro].style.display = 'inherit';
  };
});
d.getElementById('btn-off').addEventListener("click", function(){
  for( var propp in elemOFF ){
    elemOFF[propp].style.visibility = 'visible';
    elemOFF[propp].style.display = 'inherit';
  };
  
  for( var pr in elemON ){
    console.log('elemON ok!');
    elemON[pr].style.visibility = 'hidden';
    elemON[pr].style.display = 'none';
  };
  
  
});
*/
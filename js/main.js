
$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();
    $('#gif').addClass('showgif');
    let valeur = $('input').val();

    function convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }

    client.article.get({

           url: valeur,
           fields: "links,meta"
       }, function onSuccess(response) {
           var date = document.getElementById("date");
           let datenow=Date.now();
           let datebefore= new Date(response["objects"][0]["date"]);
           //Verification de l'ancienneté de l'article avec ajout d'un warning
           if((datenow-Date.parse(datebefore))/1000 >20000000){
            $("#date").addClass('is-sketchy');
            console.log('vieux');
           }
           else{
               $("#date").addClass('is-success');
           }
           //Ajout de la date de l'article dans l'index.html
           date.innerHTML = "Date: "+ convertDate(response["objects"][0]["date"]);

           //Ajout du titre et de l'image de l'article dans l'index.html
           var text = document.getElementById("text");
           text.innerHTML = "<h2>"+response["objects"][0]["title"]+"<h2>";
           text.innerHTML += "<img src="+response["objects"][0]["images"][0]['url']+">";

           //ajout de l'auteur dans l'index.html
           var auteur = document.getElementById("auteur");
           if(response["objects"][0]["author"]!=undefined){
             auteur.innerHTML = response["objects"][0]["author"];
         }



          //ajout du nom du media
           var media = document.getElementById('media');
           media.innerHTML = response["objects"][0]["siteName"];


           $('.hiddenn').addClass('shown');
           let hostname = getLocation(response["objects"][0]["pageUrl"]);

           if(hostname.indexOf('www.')>-1){
            hostname = hostname.substring(4);
            console.log('je suis dedans');
           }
           console.log(hostname);
           var listSRC = getListSources(response["objects"][0]["html"],hostname);

           console.log(response["objects"][0]);
           if(listSRC.length>0){
             var source = document.getElementById("source");
             source.innerHTML = "Sources détéctées ("+listSRC.length+")";
             $('#source').addClass('is-success');
           }
           else{
              $('#source').addClass('is-invalidate');
           }
           $('#gif').removeClass('showgif');
           $('.hiddenn').addClass('shown');
           let randomMark= Math.floor(Math.random()*2);
           let marks = ["img/stamp-a.png","img/stamp-f.png"];
           $('.mark').attr('src',marks[randomMark]);
           $('.see-article').attr('href',valeur);

       }, function onError(response) {
             switch(response.errorCode) {
               case 401:
                   alert(response.error)
                   break;
               case 404:
                   alert(response.error)
                   break;
               case 500:
                   alert(response.error)
                   break;
             }


       });
    $('.flexParent').addClass('up right');

  });

  $('.return-content').click(function(){
    $('.flexParent').removeClass('up right');
    $('.hiddenn').removeClass('shown');
    $('input').val('');
  });
});

function getListSources(html,name) {
  var array = [];
  console.log('ca va pousser');
  var el = document.createElement( 'html' );
  el.innerHTML = (html);
  var links = el.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    if(links[i].href.indexOf(name)>-1){
      console.log("ce lien vien de le monde "+links[i].href)
    }
    else{
    array.push(links[i].href);
    }


  }
  console.log(array);
  return array;
};

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    //return l;
    return l.hostname;
};
var l = getLocation("http://example.com/path");
console.debug(l.hostname)
console.debug(l.pathname)

var client = new Diffbot("b2c70ccc0c0bdca0cd4c92b37fd590cf");

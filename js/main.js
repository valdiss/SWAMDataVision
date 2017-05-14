
$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();
    $('#gif').addClass('showgif');
    client.article.get({
           url: "http://www.lefigaro.fr/medias/2017/03/10/20004-20170310ARTFIG00167-contre-les-fake-news-des-activistes-ciblent-leurs-revenus-publicitaires.php",
           fields: "links,meta"
       }, function onSuccess(response) {
           // output the title
           var date = document.getElementById("date");
           date.innerHTML = response["objects"][0]["date"];
           var text = document.getElementById("text");
           text.innerHTML = response["objects"][0]["title"];
           text.innerHTML += "<img src="+response["objects"][0]["images"][0]['url']+">";
           var auteur = document.getElementById("auteur");
           auteur.innerHTML = response["objects"][0]["author"];

           $('.hiddenn').addClass('shown');
           var listSRC = getListSources(response["objects"][0]["html"]);

           if(listSRC!=[]){
             console.log(listSRC);
             var source = document.getElementById("source");
             source.innerHTML = "Sources détéctées ("+listSRC.length+")";

             for(let i=0;i<listSRC.length;i++){


             }
           }
           $('#gif').removeClass('showgif');
           $('.hiddenn').addClass('shown');

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
    $('.flexParent').addClass('up');

  });

  $('.return-content').click(function(){
    $('.flexParent').removeClass('up');
    $('.hiddenn').removeClass('shown');
    $('input').val('');
  });
});

function getListSources(html) {
  var array = [];
  console.log('ca va pousser');
  var el = document.createElement( 'html' );
  el.innerHTML = (html);
  var links = el.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    array.push(links[i].href);
    console.log('ca pousse');
  }
  return array;
};

var client = new Diffbot("b2c70ccc0c0bdca0cd4c92b37fd590cf");

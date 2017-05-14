
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
           var listSRC = getListSources(response["objects"][0]["html"]);

           console.log(response["objects"][0]);
           if(listSRC!=[]){
             var source = document.getElementById("source");
             source.innerHTML = "Sources détéctées ("+listSRC.length+")";

             for(let i=0;i<listSRC.length;i++){


             }
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

function getListSources(html) {
  var array = [];
  console.log('ca va pousser');
  var el = document.createElement( 'html' );
  el.innerHTML = (html);
  var links = el.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    array.push(links[i].href);

  }
  console.log(array);
  return array;
};

var client = new Diffbot("b2c70ccc0c0bdca0cd4c92b37fd590cf");

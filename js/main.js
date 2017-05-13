function getListSources(html) {
var array = [];
var links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++) {
console.log(links[i].href);
}
console.log(array);
return array;
};

$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();
    let valeur= $('input').val();
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
           text.innerHTML += "<br><img src="+response["objects"][0]["images"][0]["url"]+">";
           var author=document.getElementById('auteur');
           author.innerHTML = response["objects"][0]["author"];
           console.log(response["objects"][0]);
           var listSRC = getListSources(response["objects"][0]["html"]);
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




var client = new Diffbot("b2c70ccc0c0bdca0cd4c92b37fd590cf");

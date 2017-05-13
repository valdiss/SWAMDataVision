$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();
    let valeur= $('input').val();
    $('#gif').addClass('showgif');
    client.article.get({
           url: valeur,
           fields: "links,meta"
       }, function onSuccess(response) {
           // output the title

           var date = document.getElementById("date");
           date.innerHTML = "Date: "+response["objects"][0]["date"];
           var text = document.getElementById("text");
           text.innerHTML = "<h2>"+response["objects"][0]["title"]+"</h2>";
           text.innerHTML += "<br><img class='img-post' src="+response["objects"][0]["images"][0]["url"]+">";
           var author=document.getElementById('auteur');
           author.innerHTML = response["objects"][0]["author"];
           console.log(response["objects"][0]);
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
    $('.flexParent').addClass('up');

  });

  $('.return-content').click(function(){
    $('.flexParent').removeClass('up');
    $('.hiddenn').removeClass('shown');
    $('input').val('');
  });
});


var client = new Diffbot("b2c70ccc0c0bdca0cd4c92b37fd590cf");

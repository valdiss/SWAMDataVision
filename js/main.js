$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();
    client.article.get({
           url: "http://www.les-crises.fr/les-relations-e-u-arabie-saoudite-sont-elles-en-train-de-tourner-au-vinaigre-par-gregory-copley/",
           fields: "links,meta"
       }, function onSuccess(response) {
           // output the title
           var title = document.getElementById("title");
           title.innerHTML = response["objects"][0]["title"];
           var date = document.getElementById("date");
           date.innerHTML = response["objects"][0]["date"];
           var estimatedDate = document.getElementById("estimatedDate");
           estimatedDate.innerHTML = response["objects"][0]["estimatedDate"];
           var text = document.getElementById("text");
           text.innerHTML = response["objects"][0]["text"];
           var text = document.getElementById("auteur");
           text.innerHTML = response["objects"][0]["author"];
           console.log(response["objects"][0]);
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

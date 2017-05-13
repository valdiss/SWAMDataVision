$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();

    $('.flexParent').toggleClass('up');
    $('.hiddenn').toggleClass('shown');
  });
});

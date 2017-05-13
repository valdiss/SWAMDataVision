$( document ).ready(function() {
  $('.form1').submit(function(event){
    event.preventDefault();

    $('.flexParent').addClass('up');
    $('.hiddenn').addClass('shown');
  });

  $('.return-content').click(function(){
    $('.flexParent').removeClass('up');
    $('.hiddenn').removeClass('shown');
    $('input').val('');
  });
});

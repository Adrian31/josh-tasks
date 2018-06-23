$(document).ready(function(){

  // $('#button').on( "click", function() {
  //   if($('#listInput').text !== ''){
  //     console.log($('#listInput').text);
  //     var toAdd = $('input[name=ListItem]').val();
  //     $('ol').append('<li>' + toAdd + '</li>');
  //   }
  // });

  // $(this).closest('.add-to-list').on('click', function()
  $(document).on('click', '.add-to-list', function(){
  // $('.add-to-list').on('click', function() {
  // $('#button').on('click', function() {
    if($('.listInput').val() !== ''){
      // console.log( $(this).prev('input[name=ListItem]').val() );
      var toAdd = $(this).prev('.listInput').val();
      console.log(toAdd);
      $(this).siblings('.list').append('<li class="list-item">' + toAdd + '</li>');
      // $('ol').append('<li>' + toAdd + '</li>');
    }
  });

  $('input').focus(function() {
    $(this).val('');
  });

  //Press enter to add to list
  $("input[name=ListItem]").keyup(function(event){
    if(event.keyCode == 13){
      $(".add-to-list").click();
      console.log("Hii");
    }
  });

  $(document).on('click','.list-item', function(){
    // $(this).toggleClass('strike').fadeOut('slow');
    $(this).toggleClass('strike');
  });

  $('ol').sortable();

  var listMaker = function( number ){
    if( $('#add-hour').length) {
      $('.hour-' + number).append('<div class="list-container">' +
        '<h2>Hour ' + number + '</h2>' +
      	// '	<form name="toDoList">	<input type="text" name="ListItem" id="listInput" class="listInput"/></form>' +
      	'	<input type="text" name="ListItem" id="listInput" class="listInput"/>' +
        ' <button type="button" class="btn btn-secondary add-to-list">Add</button>' +
        ' <br/>'+
        ' <ol class="list"></ol> '+
        ' </div>'
      );
    }
  }

  if( $('#add-hour').length ){
    var numberOfRows = 0;
    var numberOfHours = 0;
    $('.footer').on("click", function() {

      if( numberOfRows === 0 ){
        $('.task-holder').append('<div class="row first-row"></div>');
        numberOfRows++;
      }

      if( numberOfHours < 4 ) {
        $('.first-row').append('<div class="col-md-3 list-box hour-' + numberOfHours + '"></div>');
        listMaker( numberOfHours );
        numberOfHours++;
      }

    });
  }

});

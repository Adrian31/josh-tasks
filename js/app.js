$(document).ready(function(){
  var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  var deca = ['twent', 'thirt', 'fort'];
  function stringifyNumber(n) {
    if (n < 20) return special[n];
    if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
    return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
  }

  $(document).on('click', '.add-to-list', function(){
    if( $(this).closest('.list-box').find('.list-input').val() !== ''){
      // Grab the input from the closest input bar
      var toAdd = $(this).closest('.list-box').find('.list-input').val();

      // Push the input to the closest list
      $(this).siblings('.list').append(
        '<li class="list-item">' +
          '<div class="col-md-11">' + toAdd + '</div>' +
          '<div class="">' +
            // '<div class="input-group-text">' +
            '<input type="checkbox" name="cb" id="cb1" />' +
            // '<label for="cb1">Check this</label>' +
            // '</div>' +
          '</div>'+
        '</li>'
      );
    }
    $('ol').sortable();
  });

  // Press enter to add item to list
  $(document).on('keyup','.list-input', function(){
    if(event.keyCode == 13){
        $(this).closest('.list-box').find(".add-to-list").click();
    }
  });

  $(document).on('click','.list-item', function(){
    // $(this).toggleClass('strike').fadeOut('slow');
    $(this).toggleClass('strike');

  });

  // $('ol').sortable();

  var listMaker = function( number ){

    if( $('#add-hour').length) {
      $('.hour-' + number).append(
        ' <div class="list-container">' +
          ' <h6 class="list-header">' + stringifyNumber(number) + ' hour</h6>' +
    	    '	<input type="text" name="ListItem" class="list-input" autocomplete="off"/>' +
        ' </div>' +
        ' <div>' +
          ' <h3 class="add-to-list">Add</h3>' +
          ' <ol class="list"></ol> '+
        ' </div>'
      );
    }
  }

  if( $('#add-hour').length ){
    var numberOfRows = 0;
    var numberOfHours = 1;
    $('.footer').on("click", function() {

      if( numberOfRows === 0 ){
        $('.task-holder').append('<div class="row first-row"></div>');
        numberOfRows++;
      }

       if( numberOfHours < 25 ) {
        $('.first-row').append('<div class="col-md-6 list-box hour-' + numberOfHours + '"></div>');
        listMaker( numberOfHours );
        numberOfHours++;
       }

    });
  }

  // Toggle between daily and hourly tasks
  $('.daily-hourly').on('click', function() {
    if( $('.daily-hourly').text() == 'Daily'){
      $(this).text('Hourly');
      $('.task-holder').hide();
      $('.daily-container').show();
    }
    else if( $('.daily-hourly').text() == 'Hourly'){
      $(this).text('Daily');
      $('.task-holder').show();
      $('.daily-container').hide();
    }
  });

});

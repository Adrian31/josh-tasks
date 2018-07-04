$(document).ready(function(){
  var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  var deca = ['twent', 'thirt', 'fort'];
  function stringifyNumber(n) {
    if (n < 20) return special[n];
    if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
    return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
  }

  var makeDraggable = function() {
    $( ".column" ).sortable({
          connectWith: ".column",
          handle: ".portlet-header",
          cancel: ".portlet-toggle",
          placeholder: "portlet-placeholder ui-corner-all"
        });

        $( ".portlet" )
          .addClass( "ui-widget ui-widget-content ui-helper-clearfix" )
          .find( ".portlet-header" )
            .prepend( "<span class='ui-icon-minusthick portlet-toggle'></span>");

        $( ".portlet-toggle" ).on( "click", function() {
          var icon = $( this );
          icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
          icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
        });
  }


  // Add task to list
  $(document).on('click', '.add-to-list', function(){
    if( $(this).closest('.list-box').find('.list-input').val() !== ''){
      // Grab the input from the closest input bar
      var toAdd = $(this).closest('.list-box').find('.list-input').val();

      // Push the input to the closest list
      $(this).siblings('.list').append(
        '<li class="portlet">' +
        '<div class="portlet-header align-items-center task-list-item-container">' +
          '<div class="list-item">' +
            toAdd +
          '</div>' +
          '<div class="time-taken portlet-content">' +
          '</div>' +
            '<input type="radio" name="cb" class="list-checkbox" />' +
        '</div>'+
        '</li>'
      );
    }
    makeDraggable();
    // Clear the list input when a task is added
    $('.list-input').val("");
  });

  // Press enter to add item to list
  $(document).on('keyup','.list-input', function(){
    if(event.keyCode == 13){
        $(this).closest('.list-box').find(".add-to-list").click();
        // Clear the list input when a task is added
        $('.list-input').val("");
    }

  });

  $(document).on('click','.list-item', function(){
    // $(this).toggleClass('strike').fadeOut('slow');
    $(this).toggleClass('strike');
  });

// Show your active task at the top of the screen
  $(document).on('click', '.list-checkbox', function() {
    var selectedTask = $(this).siblings('.list-item').text();

    $(".currently-selected-task").fadeOut(function() {
      $('.currently-selected-task').text(selectedTask);
    }).fadeIn();
  });

// Log the time for the currently selected task
  $(document).on('click', '.stopButton', function(){
    var currentTask = $('input.list-checkbox:checked').siblings('.time-taken');
    // console.log(currentTask);
    var recountTime;
    var stopTime = $('.values').text();
    if ($('input.list-checkbox').is(':checked')) {
      currentTask.text("H:M:S " + stopTime);
      currentTask.val(timer.getTotalTimeValues().seconds);
      // console.log($('input.list-checkbox:checked').siblings('.time-taken').val());
      $('input.list-checkbox:checked').siblings('.list-item').toggleClass('strike');
    }
    timer.stop();
  });

  $('#chronoExample .startButton').click(function () {
    var currentTask = $('input.list-checkbox:checked').siblings('.time-taken');
    // console.log("Current value is : " + currentTask.val());
    startTime = parseInt(currentTask.val());
    // console.log(startTime);
      // timer.start
      if( currentTask.val() !== '' ){
        console.log(currentTask);
          timer.start({startValues: {seconds: startTime}});
      }else{
        timer.start();
      }
  });
  // Set start time if there is one already recorded
  $(document).on('click', 'input.list-checkbox:checked', function(){
    var currentTask = $('input.list-checkbox:checked').siblings('.time-taken');
    console.log(currentTask.val());
    if( currentTask.val() !== ''){
      console.log("hi");
    }
  });
  var listMaker = function( number ){

    if( $('#add-hour').length) {
      $('.hour-' + number).append(
        ' <div class="list-container">' +
          ' <h6 class="list-header">' + stringifyNumber(number) + ' hour</h6>' +
    	    '	<input type="text" name="ListItem" class="list-input" autocomplete="off"/>' +
        ' </div>' +
        ' <div>' +
          ' <h3 class="add-to-list">+ Task</h3>' +
          ' <ol class="list column">'+
          '</ol> '+
        ' </div>'
      );
    }
  }

// Add an hour to the task holder div
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
       makeDraggable();
    });
  }

  // Toggle between daily and hourly tasks
  $('.daily-hourly').on('click', function() {
    if( $('.daily-hourly').text() == 'Daily'){
      $(this).text('Hourly');
      $('.task-holder').fadeOut('slow');
      $('.footer').fadeOut('slow');
      $('.daily-container').fadeIn('slow');
    }
    else if( $('.daily-hourly').text() == 'Hourly'){
      $(this).text('Daily');
      $('.task-holder').fadeIn('slow');
      $('.footer').fadeIn('slow');
      $('.daily-container').fadeOut('slow');
    }
  });

  // Toggle between daily and hourly tasks
  $('.stopwatch-toggle').on('click', function() {
    if( $('.stopwatch-toggle').hasClass('show-stopwatch')){
      $('.stopwatch').fadeOut('slow');
      $('.stopwatch-toggle').addClass('hide-stopwatch');
      $('.stopwatch-toggle').removeClass('show-stopwatch');
      // $('.list-checkbox').fadeIn('slow');
    }
    else if($('.stopwatch-toggle').hasClass('hide-stopwatch')){
      $('.stopwatch').fadeIn('slow');
      $('.stopwatch-toggle').removeClass('hide-stopwatch');
      $('.stopwatch-toggle').addClass('show-stopwatch');
      // $('.list-checkbox').fadeOut('slow');
    }
  });

});

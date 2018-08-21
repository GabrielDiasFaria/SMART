(function($){
  $(function(){

  $('.button-collapse').sideNav();
  $('select').material_select();
  $('.timepicker').pickatime({
    twelvehour: false
  });
	$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .6, // Opacity of modal background
      inDuration: 700, // Transition in duration
      outDuration: 700, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        //alert("Ready");
        //console.log(modal, trigger);
      },
      complete: function() { 
		//alert('Closed'); 
	  } // Callback for Modal close
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
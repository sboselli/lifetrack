var keypressed = "";

document.onkeyup = function(e){

    if (typeof event !== 'undefined') {
        keypressed = event.keyCode;
	} else if (e) {
        keypressed = e.which;
    }

    if (keypressed == 81) {
    	window.location = "http://localhost:3000/add";
    }

  return false;   // Prevents the default action

}
// Lifeline
r(function(){
  // Setup console
  var canvasDiv = document.getElementById('lifeline-canvas');

  // Get width
  var llWidth = document.getElementById('lifeline-canvas').offsetWidth;
  console.log(llWidth);

var llcanvas = document.createElement("canvas");
llcanvas.id = "llcanvas";
llcanvas.width = llWidth;
llcanvas.height = 80;

canvasDiv.appendChild(llcanvas);

var canvas = document.getElementById('llcanvas');
var ctx = canvas.getContext('2d');

var grad= ctx.createLinearGradient(0, 0, llWidth, 0);
grad.addColorStop(0, "#ebf4de");
grad.addColorStop(1, "#bfdb9c");

  // do cool things with the context
      ctx.beginPath();
      ctx.moveTo(0, 1.5);
      ctx.lineTo(llWidth, 1.5);
      ctx.lineWidth = 3;
      // ctx.strokeStyle = "#bfdb9c";
      ctx.strokeStyle = grad;
      ctx.stroke();

});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

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

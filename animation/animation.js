;(function() {
  console.log("Starting up the animation");
  var canvas = document.getElementById("screen");
  var context = canvas.getContext("2d");
  
  var Shape = function() {
    this.w = 20;
    this.h = 20;
    this.x = canvas.width/2 - this.w/2;
    this.y = canvas.height/2 - this.h/2;
  };
  Shape.prototype = {
    draw: function() {
      context.fillRect(this.x, this.y, this.w, this.h);
    }
  };
  var shape = new Shape();

  // this function runs several times per second
  var tick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    shape.draw();
    requestAnimationFrame(tick);
  };
  tick();
})();


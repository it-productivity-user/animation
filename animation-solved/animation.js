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
    speedX: 2,
    speedY: 4,
    speedW: 0.3,
    speedH: 0.3,
    originalW: 20,
    originalH: 20,
    updateSpeeds: function() {
      if (this.x <= 0) {
        this.speedX = Math.abs(this.speedX);
      } else if (this.x + this.w >= canvas.width) {
        this.speedX = -Math.abs(this.speedX);
      }
      if (this.y <= 0) {
        this.speedY = Math.abs(this.speedY);
      } else if (this.y + this.h >= canvas.height) {
        this.speedY = -Math.abs(this.speedY);
      }
      if (this.w <= this.originalW) {
        this.speedW = Math.abs(this.speedW);
      } else if (this.w >= this.originalW + 100) {
        this.speedW = -Math.abs(this.speedW);
      }
      if (this.h <= this.originalH) {
        this.speedH = Math.abs(this.speedH);
      } else if (this.h >= this.originalH + 100) {
        this.speedH = -Math.abs(this.speedH);
      }
    },
    updatePosition: function() {
      this.x += this.speedX;
      this.y += this.speedY;
    },
    updateSize: function() {
      this.w += this.speedW;
      this.h += this.speedH;
    },
    draw: function() {
      context.fillRect(this.x, this.y, this.w, this.h);
      this.updatePosition();
      this.updateSize();
      this.updateSpeeds();
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


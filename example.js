'use strict';
var BernoulliCircle = require('./circle');
var c = document.querySelector('#canvas');
var ctx = c.getContext('2d');
var cos = Math.cos;
var sin = Math.sin;
var width = c.width = window.innerWidth;
var height = c.height = window.innerHeight;
c.style.top = 0;
var size = c.width / 4;
var center = { x: width / 2, y: height / 2 };
var bernoullis = [
  {center: center, size: size, theta: 1.3, direction: 'negative', fillStyle: '#f20af2', velocity: .08 },
  {center: center, size: size, theta: 1.3, direction: 'positive', fillStyle: '#f1a1f9', velocity: .04, radius: 10 },
  {center: center, size: size, theta: -1,  direction: 'negative', fillStyle: '#ffafaa', velocity: .07, radius: 3 },
  {center: center, size: size, theta: 3,   direction: 'positive', fillStyle: '#0f0fff', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 5,   direction: 'negative', fillStyle: '#0f0fff', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 4,   direction: 'positive', fillStyle: '#0f0fff', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 5,   direction: 'positive', fillStyle: '#0f0fff', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 2,   direction: 'negative', fillStyle: '#0f0faa', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 9,   direction: 'negative', fillStyle: '#0f0faa', velocity: .05, radius: 3 },
  {center: center, size: size, theta: 3,   direction: 'negative', fillStyle: '#00fffa', velocity: .05, radius: 5 },
  {center: center, size: size, theta: 1,   direction: 'negative', fillStyle: '#0f0faa', velocity: .05, radius: 3 },
  {center: center, size: size, theta: 3,   direction: 'negative', fillStyle: '#0f0faa', velocity: .05, radius: 3 },
  {center: center, size: size, theta: 9,   direction: 'negative', fillStyle: '#0f0fff', velocity: .03, radius: 4 },
  {center: center, size: size, theta: 2,   direction: 'negative', fillStyle: '#0f0faa', velocity: .06, radius: 2 },
  {center: center, size: size, theta: 4,   direction: 'positive', fillStyle: '#ff0fff', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 5,   direction: 'negative', fillStyle: '#0f0fff', velocity: .03, radius: 7 },
  {center: center, size: size, theta: 0,   direction: 'positive', fillStyle: '#affffa', velocity: .01, radius: 5 },
  {center: center, size: size, theta: 1.1, direction: 'positive', fillStyle: '#f20ff2', velocity: .02, radius: 10 },
  {center: center, size: size, theta: 2.4, direction: 'negative', fillStyle: '#f20ff2', velocity: .04, radius: 10 },
  {center: center, size: size, theta: .6,  direction: 'negative', fillStyle: '#a20af2', velocity: .02, radius: 7 },
  {center: center, size: size, theta: .3,  direction: 'positive', fillStyle: '#f2aff2', velocity: .02, radius: 2 },
  {center: center, size: size, theta: -.5, direction: 'negative', fillStyle: '#f2aff2', velocity: .02, radius: 3 },
  {center: center, size: size, theta: 5,   direction: 'positive', fillStyle: '#0f0fff', velocity: .03, radius: 5 },
  {center: center, size: size, theta: 5.5, direction: 'negative', fillStyle: '#0f0f22', velocity: .03, radius: 6 }
].map(function(opts) { return new BernoulliCircle(opts)});
if (width < 500) biggerWidth()
var ctr = 0;
function clearCanvas() {
  ctr += .01

  if (ctr > 2) {
    ctx.clearRect(0, 0, width, height);
  }

  if (ctr.toFixed(2) === '3.00') {
    bernoullis.forEach(function(b) {
      if (b.direction === 'positive') {
        b.setDirection('negative');
      } else {
        b.setDirection('positive');
      }
    });
  }

  if (ctr > 4) {
    ctr = 0;
  }
}


function draw() {
  clearCanvas()
  bernoullis.forEach(function (t) { t.update().draw(ctx); });
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);


function biggerWidth() {
  var width = window.innerWidth;
  bernoullis.forEach(function(b) {
    b.size = width / 2.7;
  });
}

window.onresize = function() {
  bernoullis.forEach(function(b) {
    var width = c.height = window.innerWidth;
    var height = c.width = window.innerHeight;
    ctx.clearRect(0, 0, width, height);
    b.center.x = width / 2;
    b.center.y = height / 2;
    if (width < 500) biggerSize();
  });
}

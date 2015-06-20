(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function drawCirc(x, y, r, ctx) {
  ctx.arc(x, y, r, 0, Math.PI * 2);
}

function BernoulliCircle(opts) {
  Theta.call(this, opts);
  this.radius = opts.radius || 5;
  this.fillStyle = opts.fillStyle || 'black';
}

BernoulliCircle.prototype = ThetaTemplate;
BernoulliCircle.prototype.draw = function draw(ctx) {
  ok(ctx instanceof CanvasRenderingContext2D,
     'draw: CanvasRenderingContext2D required');
  ctx.beginPath();
  ctx.fillStyle = this.fillStyle;
  var xy = this.bernoulli(this.theta, this.size);
  drawCirc(xy[0], xy[1], this.radius, ctx);
  ctx.fill();
  ctx.closePath();
};

module.exports = BernoulliCircle;

},{}],2:[function(require,module,exports){
'use strict';
var BernoulliCircle = require('./circle');
console.log(BernoulliCircle)
var c = document.querySelector('#canvas');
var ctx = c.getContext('2d');
var cos = Math.cos;
var sin = Math.sin;
var width = c.width = window.innerWidth;
var height = c.height = window.innerHeight;
c.style.top = 0;
console.log(c.height)
var size = c.width / 4;
var center = { x: width / 2, y: height / 2 };
if (width < 500) center.y = height / 2.2;
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


window.onresize = function() {
  bernoullis.forEach(function(b) {
    var width = c.height = window.innerWidth;
    var height = c.width = window.innerHeight;
    ctx.clearRect(0, 0, width, height);
    b.center.x = width / 2;
    b.center.y = height / 2;
    if (width < 500) b.center.y = height / 2.2;
    console.log(b.center);
  });
}

},{"./circle":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjaXJjbGUuanMiLCJleGFtcGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGRyYXdDaXJjKHgsIHksIHIsIGN0eCkge1xuICBjdHguYXJjKHgsIHksIHIsIDAsIE1hdGguUEkgKiAyKTtcbn1cblxuZnVuY3Rpb24gQmVybm91bGxpQ2lyY2xlKG9wdHMpIHtcbiAgVGhldGEuY2FsbCh0aGlzLCBvcHRzKTtcbiAgdGhpcy5yYWRpdXMgPSBvcHRzLnJhZGl1cyB8fCA1O1xuICB0aGlzLmZpbGxTdHlsZSA9IG9wdHMuZmlsbFN0eWxlIHx8ICdibGFjayc7XG59XG5cbkJlcm5vdWxsaUNpcmNsZS5wcm90b3R5cGUgPSBUaGV0YVRlbXBsYXRlO1xuQmVybm91bGxpQ2lyY2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gZHJhdyhjdHgpIHtcbiAgb2soY3R4IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgICAnZHJhdzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHJlcXVpcmVkJyk7XG4gIGN0eC5iZWdpblBhdGgoKTtcbiAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuZmlsbFN0eWxlO1xuICB2YXIgeHkgPSB0aGlzLmJlcm5vdWxsaSh0aGlzLnRoZXRhLCB0aGlzLnNpemUpO1xuICBkcmF3Q2lyYyh4eVswXSwgeHlbMV0sIHRoaXMucmFkaXVzLCBjdHgpO1xuICBjdHguZmlsbCgpO1xuICBjdHguY2xvc2VQYXRoKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJlcm5vdWxsaUNpcmNsZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBCZXJub3VsbGlDaXJjbGUgPSByZXF1aXJlKCcuL2NpcmNsZScpO1xuY29uc29sZS5sb2coQmVybm91bGxpQ2lyY2xlKVxudmFyIGMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG52YXIgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xudmFyIGNvcyA9IE1hdGguY29zO1xudmFyIHNpbiA9IE1hdGguc2luO1xudmFyIHdpZHRoID0gYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xudmFyIGhlaWdodCA9IGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuYy5zdHlsZS50b3AgPSAwO1xuY29uc29sZS5sb2coYy5oZWlnaHQpXG52YXIgc2l6ZSA9IGMud2lkdGggLyA0O1xudmFyIGNlbnRlciA9IHsgeDogd2lkdGggLyAyLCB5OiBoZWlnaHQgLyAyIH07XG5pZiAod2lkdGggPCA1MDApIGNlbnRlci55ID0gaGVpZ2h0IC8gMi4yO1xudmFyIGJlcm5vdWxsaXMgPSBbXG4gIHtjZW50ZXI6IGNlbnRlciwgc2l6ZTogc2l6ZSwgdGhldGE6IDEuMywgZGlyZWN0aW9uOiAnbmVnYXRpdmUnLCBmaWxsU3R5bGU6ICcjZjIwYWYyJywgdmVsb2NpdHk6IC4wOCB9LFxuICB7Y2VudGVyOiBjZW50ZXIsIHNpemU6IHNpemUsIHRoZXRhOiAxLjMsIGRpcmVjdGlvbjogJ3Bvc2l0aXZlJywgZmlsbFN0eWxlOiAnI2YxYTFmOScsIHZlbG9jaXR5OiAuMDQsIHJhZGl1czogMTAgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogLTEsICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyNmZmFmYWEnLCB2ZWxvY2l0eTogLjA3LCByYWRpdXM6IDMgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMywgICBkaXJlY3Rpb246ICdwb3NpdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogNSwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogNCwgICBkaXJlY3Rpb246ICdwb3NpdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogNSwgICBkaXJlY3Rpb246ICdwb3NpdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMiwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmYWEnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogOSwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmYWEnLCB2ZWxvY2l0eTogLjA1LCByYWRpdXM6IDMgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMywgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwMGZmZmEnLCB2ZWxvY2l0eTogLjA1LCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMSwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmYWEnLCB2ZWxvY2l0eTogLjA1LCByYWRpdXM6IDMgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMywgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmYWEnLCB2ZWxvY2l0eTogLjA1LCByYWRpdXM6IDMgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogOSwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDQgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMiwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmYWEnLCB2ZWxvY2l0eTogLjA2LCByYWRpdXM6IDIgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogNCwgICBkaXJlY3Rpb246ICdwb3NpdGl2ZScsIGZpbGxTdHlsZTogJyNmZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogNSwgICBkaXJlY3Rpb246ICduZWdhdGl2ZScsIGZpbGxTdHlsZTogJyMwZjBmZmYnLCB2ZWxvY2l0eTogLjAzLCByYWRpdXM6IDcgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMCwgICBkaXJlY3Rpb246ICdwb3NpdGl2ZScsIGZpbGxTdHlsZTogJyNhZmZmZmEnLCB2ZWxvY2l0eTogLjAxLCByYWRpdXM6IDUgfSxcbiAge2NlbnRlcjogY2VudGVyLCBzaXplOiBzaXplLCB0aGV0YTogMS4xLCBkaXJlY3Rpb246ICdwb3NpdGl2ZScsIGZpbGxTdHlsZTogJyNmMjBmZjInLCB2ZWxvY2l0eTogLjAyLCByYWRpdXM6IDEwIH0sXG4gIHtjZW50ZXI6IGNlbnRlciwgc2l6ZTogc2l6ZSwgdGhldGE6IDIuNCwgZGlyZWN0aW9uOiAnbmVnYXRpdmUnLCBmaWxsU3R5bGU6ICcjZjIwZmYyJywgdmVsb2NpdHk6IC4wNCwgcmFkaXVzOiAxMCB9LFxuICB7Y2VudGVyOiBjZW50ZXIsIHNpemU6IHNpemUsIHRoZXRhOiAuNiwgIGRpcmVjdGlvbjogJ25lZ2F0aXZlJywgZmlsbFN0eWxlOiAnI2EyMGFmMicsIHZlbG9jaXR5OiAuMDIsIHJhZGl1czogNyB9LFxuICB7Y2VudGVyOiBjZW50ZXIsIHNpemU6IHNpemUsIHRoZXRhOiAuMywgIGRpcmVjdGlvbjogJ3Bvc2l0aXZlJywgZmlsbFN0eWxlOiAnI2YyYWZmMicsIHZlbG9jaXR5OiAuMDIsIHJhZGl1czogMiB9LFxuICB7Y2VudGVyOiBjZW50ZXIsIHNpemU6IHNpemUsIHRoZXRhOiAtLjUsIGRpcmVjdGlvbjogJ25lZ2F0aXZlJywgZmlsbFN0eWxlOiAnI2YyYWZmMicsIHZlbG9jaXR5OiAuMDIsIHJhZGl1czogMyB9LFxuICB7Y2VudGVyOiBjZW50ZXIsIHNpemU6IHNpemUsIHRoZXRhOiA1LCAgIGRpcmVjdGlvbjogJ3Bvc2l0aXZlJywgZmlsbFN0eWxlOiAnIzBmMGZmZicsIHZlbG9jaXR5OiAuMDMsIHJhZGl1czogNSB9LFxuICB7Y2VudGVyOiBjZW50ZXIsIHNpemU6IHNpemUsIHRoZXRhOiA1LjUsIGRpcmVjdGlvbjogJ25lZ2F0aXZlJywgZmlsbFN0eWxlOiAnIzBmMGYyMicsIHZlbG9jaXR5OiAuMDMsIHJhZGl1czogNiB9XG5dLm1hcChmdW5jdGlvbihvcHRzKSB7IHJldHVybiBuZXcgQmVybm91bGxpQ2lyY2xlKG9wdHMpfSk7XG5cbnZhciBjdHIgPSAwO1xuZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XG4gIGN0ciArPSAuMDFcblxuICBpZiAoY3RyID4gMikge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBpZiAoY3RyLnRvRml4ZWQoMikgPT09ICczLjAwJykge1xuICAgIGJlcm5vdWxsaXMuZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgICBpZiAoYi5kaXJlY3Rpb24gPT09ICdwb3NpdGl2ZScpIHtcbiAgICAgICAgYi5zZXREaXJlY3Rpb24oJ25lZ2F0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiLnNldERpcmVjdGlvbigncG9zaXRpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChjdHIgPiA0KSB7XG4gICAgY3RyID0gMDtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gIGNsZWFyQ2FudmFzKClcbiAgYmVybm91bGxpcy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7IHQudXBkYXRlKCkuZHJhdyhjdHgpOyB9KTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xufVxuXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG5cblxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGJlcm5vdWxsaXMuZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgdmFyIHdpZHRoID0gYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gYy53aWR0aCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIGIuY2VudGVyLnggPSB3aWR0aCAvIDI7XG4gICAgYi5jZW50ZXIueSA9IGhlaWdodCAvIDI7XG4gICAgaWYgKHdpZHRoIDwgNTAwKSBiLmNlbnRlci55ID0gaGVpZ2h0IC8gMi4yO1xuICAgIGNvbnNvbGUubG9nKGIuY2VudGVyKTtcbiAgfSk7XG59XG4iXX0=

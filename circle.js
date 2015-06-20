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

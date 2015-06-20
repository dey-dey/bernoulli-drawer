'use strict';
var ok = require('assert').ok;
var cos = Math.cos;
var sin = Math.sin;

function Bernoulli(opts) {
  ok(!!opts, 'opts required');
  ok(!!opts.size, '.size required');
  ok(!!opts.center, '.center required');
  ok(!!opts.center.x, '.center.x required');
  ok(!!opts.center.y, '.center.y required');

  this.size = opts.size;
  this.theta = opts.theta || 1.2;
  this.direction = getDirection(opts.direction || 'positive');
  this.velocity = opts.velocity || .08;
  this.center = opts.center;

  function getDirection(dir) {
    if (dir === 'positive') {
      return function positive(t, vel) { return t += vel; };
    }
    return function negative(t, vel) { return t -= vel; };
  }
}

function square(val) { return Math.pow(val, 2); }
function bernoulli(theta, size) {
  var scale = size / (square(sin(theta), 2) + 1);
  this.x = (scale * cos(theta)) + this.offset.x;
  this.y = (scale * sin(2 * theta) / 2) + this.offset.y;
  return [x, y];
}

var template = {
  bernoulli: bernoulli,
  update: function update() {
    this.theta = this.direction(this.theta, this.velocity);
    return this;
  }
};

Bernoulli.prototype = template;
module.exports.template = template;
module.exports = Bernoulli;

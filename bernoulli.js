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
  this.direction = opts.direction || 'positive';
  this.directionFn = getDirection(this.direction);
  this.velocity = opts.velocity || .08;
  this.center = opts.center;

}

function getDirection(dir) {
  if (dir === 'positive') {
    return function positive(t, vel) { return t += vel; };
  }
  return function negative(t, vel) { return t -= vel; };
}

function square(val) { return Math.pow(val, 2); }
function bernoulli(theta, size) {
  var scale = size / (square(sin(theta), 2) + 1);
  var x = (scale * cos(theta)) + this.center.x;
  var y = (scale * sin(2 * theta) / 2) + this.center.y;
  return [x, y];
}

var template = {
  bernoulli: bernoulli,

  setDirection: function setDirection(direction) {
    this.direction = direction;
    this.directionFn = getDirection(this.direction);
  },

  update: function update() {
    this.theta = this.directionFn(this.theta, this.velocity);
    return this;
  }
};

Bernoulli.prototype = template;
module.exports = Bernoulli;
module.exports.template = template;

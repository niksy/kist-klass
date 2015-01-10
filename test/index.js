/* jshint mocha:true */

var assert = require('assert');
var Klass = require('../');

describe('class', function () {

	it('creates a new object which is instance of class', function () {
		var Sub1 = Klass.extend();
		var Sub2 = Sub1.extend();
		var instance1 = new Sub1();
		var instance2 = new Sub2();
		assert.ok(instance1 instanceof Klass);
		assert.ok(instance2 instanceof Sub1);
	});

	it('has one static method, extend', function () {
		assert.ok(Klass.extend);
	});

	it('passes static method to extended class', function () {
		var Sub1 = Klass.extend();
		var Sub2 = Sub1.extend();
		assert.ok(Sub1.extend);
		assert.ok(Sub2.extend);
	});

});

describe('.extend', function () {

	it('assigns prototype methods', function () {
		var proto = { foo: function () {} };
		var Sub = Klass.extend(proto);
		assert.equal(Sub.prototype.foo, proto.foo);
	});

	it('assigns static methods', function () {
		var staticProps = { foo: function () {} };
		var Sub = Klass.extend({}, staticProps);
		assert.equal(Sub.foo, staticProps.foo);
	});

	it('assigns _super static property', function () {
		var Sub1 = Klass.extend();
		var Sub2 = Sub1.extend();
		assert.equal(Sub1._super, Klass.prototype);
		assert.equal(Sub2._super, Sub1.prototype);
	});

	it('allows setting a custom constructor', function () {
		var spy = 0;
		var Sub = Klass.extend({
			constructor: function () {
				spy++;
			}
		});
		var sub = new Sub();
		assert.equal(spy, 1);
	});

	it('calls the parent constructor by default', function () {
		var spy = 0;
		var ctor = function () {
			spy++;
		};
		ctor.extend = Klass.extend;
		var Sub = ctor.extend();
		var sub = new Sub();
		assert.equal(spy, 1);
	});

	it('sets constructor as the children', function () {
		var Child = Klass.extend();
		assert.equal(Child.prototype.constructor, Child);
	});

});

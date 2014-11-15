var assert = require('assert');
var Klass = require('../');

describe('class', function () {

	it('creates a new object which is instance of class', function () {
		var Sub = Klass.extend();
		var instance = new Sub();
		assert.ok(instance instanceof Klass);
	});

	it('has two static methods, extend and supply', function () {
		assert.ok(Klass.extend);
		assert.ok(Klass.supply);
	});

	it('passes static methods to extended class', function () {
		var Sub = Klass.extend();
		assert.ok(Sub.extend);
		assert.ok(Sub.supply);
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
		var Sub = Klass.extend();
		assert.equal(Sub._super, Klass.prototype);
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

describe('.supply', function () {

	it('merges parent props based on property name', function () {
		var Foo = Klass.extend({
			foo: {
				bar: 1
			}
		});
		var Bar = Foo.extend({
			foo: Foo.supply('foo', {
				baz: 2
			})
		});
		assert.deepEqual(Bar.prototype.foo, { bar: 1, baz: 2 });
	});

	it('returns second object if property doesn’t exist on property', function () {
		var Foo = Klass.extend();
		var Bar = Foo.extend({
			foo: Foo.supply('foo', {
				baz: 2
			})
		});
		assert.deepEqual(Bar.prototype.foo, { baz: 2 });
	});

	it('returns object with new values if first argument is object and is not property on prototype', function () {
		var Foo = Klass.extend();
		var Bar = Foo.extend({
			foo: Foo.supply({
				bar: 1
			}, {
				baz: 2
			})
		});
		assert.deepEqual(Bar.prototype.foo, { bar: 1, baz: 2 });
	});

});

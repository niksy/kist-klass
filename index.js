var objExtend = require('xtend/mutable');

/**
 * @param  {Mixed} prop
 *
 * @return {Object}
 */
function supply ( prop ) {
	if ( typeof(prop) === 'string' && this.prototype.hasOwnProperty(prop) ) {
		prop = this.prototype[prop];
	} else {
		prop = typeof(prop) === 'object' ? prop : {};
	}
	return objExtend.apply(this, [].concat([{}, prop], [].slice.call(arguments, 1)));
}

/**
 * @param  {Object} protoProps
 * @param  {Object} staticProps
 *
 * @return {Function}
 */
function extend ( protoProps, staticProps ) {

	var self = this;
	var Child;

	if ( protoProps && protoProps.hasOwnProperty('constructor') ) {
		Child = protoProps.constructor;
	} else {
		Child = function () {
			Child._super.constructor.apply(this, arguments);
		};
	}

	objExtend(Child, self, staticProps);

	function ChildTemp () {}
	ChildTemp.prototype = self.prototype;
	Child.prototype = new ChildTemp();
	Child.prototype.constructor = Child;
	Child._super = self.prototype;

	if ( protoProps ) {
		objExtend(Child.prototype, protoProps);
	}

	return Child;

}

function Klass () {}
objExtend(Klass, {
	extend: extend,
	supply: supply
});

module.exports = Klass;

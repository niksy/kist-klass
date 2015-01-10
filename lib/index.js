var objExtend = require('xtend/mutable');

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

var Klass = module.exports = function () {};
Klass.extend = extend;

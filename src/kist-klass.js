/* jshint latedef:false */

var objExtend = require('xtend/mutable');
var isPlainObject = require('is-plain-object');

var defaultStaticProps = {
	extend: extend,
	supply: supply
};

/**
 * @param  {Mixed} prop
 * @param  {Object} props
 *
 * @return {Object}
 */
function supply ( prop, props ) {
	if ( typeof(prop) === 'string' && this.prototype.hasOwnProperty(prop) ) {
		prop = this.prototype[prop];
	} else {
		prop = isPlainObject(prop) ? prop : {};
	}
	return objExtend({}, prop, props);
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

	function ChildTemp () {}
	ChildTemp.prototype = self.prototype;
	Child.prototype = new ChildTemp();
	Child.prototype.constructor = Child;
	Child._super = self.prototype;

	objExtend(Child, defaultStaticProps);

	if ( isPlainObject(protoProps) ) {
		objExtend(Child.prototype, protoProps);
	}
	if ( isPlainObject(staticProps) ) {
		objExtend(Child, self, staticProps);
	}

	return Child;

}

function Klass () {}
objExtend(Klass, defaultStaticProps);

module.exports = Klass;

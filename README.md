# kist-klass

Simple class system. Inspired by [Backbone](http://backbonejs.org/) extend and [simple inheritance by John Resig](http://ejohn.org/blog/simple-javascript-inheritance/).

## Installation

```sh
npm install kist-klass --save

bower install kist-klass --save
```

## API

### `.extend([options])`

Returns: `Klass`

Extend base (or already extended class).

If you provide `constructor` method, it will override default constructor.

### `._super`

Type: `Function`

Current class parent.

## Examples

```js
var Klass = require('kist-klass');

var Foo = Klass.extend({
	props: {
		foo: 1
	}
});

var Bar = Foo.extend({
	constructor: function () {
		// Constructor logic
		Bar._super.constructor.apply(this, arguments);
	}
	props: {
		bar: 2
	}
});

var foo = new Foo();
var bar = new Bar();
```

### AMD and global

```js
define(['kist-klass'], cb);

window.kist.klass;
```

## Browser support

Tested in IE8+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

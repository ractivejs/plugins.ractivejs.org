var gobble = require( 'gobble' );
var spelunk = require( 'spelunk' );

var shared = gobble( 'node_modules/ractive-www' );
var components = gobble([ shared.grab( 'components' ), 'src/components' ]);

var plugins = spelunk.sync( 'src/plugins' );



module.exports = gobble([
	// index page
	components
		.transform( 'ractive-render', {
			component: 'Index.html',
			files: {
				'index.html': {
					title: 'Plugins | Ractive.js',
					plugins: plugins
				}
			}
		}),

	// plugin pages
	components
		.transform( 'ractive-render', {
			component: 'PluginPage.html',
			files: (function () {
				var pages = {};

				Object.keys( plugins ).forEach( function ( categoryName ) {
					var category = plugins[ categoryName ];

					Object.keys( category ).forEach( function ( pluginName ) {
						var plugin = category[ pluginName ];

						plugin.name = pluginName;
						plugin.title = pluginName + ' | Plugins | Ractive.js';

						pages[ pluginName + '.html' ] = plugin;
					});
				});

				return pages;
			}())
		}),

	// styles
	gobble([ shared.grab( 'scss' ).moveTo( 'shared' ), 'src/scss' ])
		.transform( 'sass', { src: 'main.scss', dest: 'main.css' }),

	// files
	shared.grab( 'assets' ).moveTo( 'assets' ),

	// app
	gobble([
		'src/app',
		components.transform( 'ractive', { type: 'es6' })
	])
		.transform( 'babel', {
			whitelist: [
				'es6.arrowFunctions',
				'es6.blockScoping',
				'es6.classes',
				'es6.constants',
				'es6.destructuring',
				'es6.parameters.default',
				'es6.parameters.rest',
				'es6.properties.computed',
				'es6.spread',
				'es6.templateLiterals'
			]
		})
		.transform( 'esperanto-bundle', {
			entry: 'main',
			type: 'cjs'
		})
		.transform( 'derequire' )
		.transform( 'browserify', {
			entries: [ './main' ],
			dest: 'app.js',
			debug: true
		})
]);
module.exports = {
  entry: {
		app: "./js/app.js",
		test: "./js/spec/specRunner.js"
  },
  output: {
    path: __dirname,
    filename: 'js/[name]Bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
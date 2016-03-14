module.exports = {
  entry: {
		app: "./public/js/app.js",
		test: "./public/js/spec/specRunner.js"
  },
  output: {
    path: __dirname,
    filename: '.public/js/[name]Bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
const path = require('path');

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'welai-math',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    }
  };
  config.optimization = {};
  if (uglify) {
    config.optimization.minimize = true;
    config.mode = 'production';
  }
  return config;
}

let configs = ['welai-math', 'welai-math.min'].map((name) => generateConfig(name));

// Generating test
if (process.argv.indexOf('test') > 0) {
  configs.push({
    mode: 'development',
    entry: './test/index.ts',
    output: {
      path: path.resolve(__dirname, 'test'),
      filename: 'index.js',
      sourceMapFilename: 'index.map',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    }
  });
}

module.exports = configs;
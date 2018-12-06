module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['last 2 versions', 'safari >= 7']
      },
      'debug': false
    }]
  ],
  'plugins': [
    [
      '@babel/plugin-transform-runtime',
      {
        'helpers': false,
        'polyfill': false,
        'regenerator': true
      }
    ]
  ]
}

module.exports = {
  presets: [[
    '@babel/env', {
      corejs: 3,
      useBuiltIns: 'usage',
      debug: false,
      // modules: false,
      targets: [{node: 'current'}, 'last 1 version, >1%'],
    }],
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
};

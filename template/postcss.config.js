module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-cssnext'),
    require('rucksack-css')({
      autoprefixer: false,
      hexRGBA: false,
      easings: false,
      fontPath: false
    }),
    require('cssnano')({
      discardComments: { removeAll: true },
      zindex: false,
      discardUnused: false,
      reduceIdents: false,
      mergeIdents: false
    })
  ]
}

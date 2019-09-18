const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

  const files =[
    './dist/elements-build/polyfills.js',
    './dist/elements-build/runtime.js',
    './dist/elements-build/main.js'
  ]

  // Concat the files to one file
  await fs.ensureDir('./dist/elements')
  await concat(files, './dist/elements/chat-widget.js')
  // Copy to public folder
  await fs.ensureDir('./public/widgets')
  await fs.copy('./dist/elements/chat-widget.js', './public/widgets/chat-widget.js')
  await fs.copy('./src/assets', './public/assets')

  console.info('Elements created successfully!')

})()

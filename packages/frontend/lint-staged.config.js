// lint-staged will be called by husky.
// The files to lint will be added as last argument.
//
const micromatch = require('micromatch')
module.exports = {
  '*.{ts,tsx}': files => {
    // from `files` filter those _NOT_ matching `*test.js`
    const match = micromatch.not(files, 'src/custom.d.ts')
    return `yarn run lint ${match.join(" ")}`;
  }
}

var md = require('./')
var fs = require('fs')

require('tape')('examples', function (test) {
  require('glob')
    .sync('examples/*.json')
    .forEach(function (json) {
      var base = './examples/' + require('path').basename(json, '.json')
      var options = require('fs').existsSync(base + '.options')
        ? JSON.parse(fs.readFileSync(base + '.options'))
        : undefined
      test.equal(
        md(require(base + '.json'), undefined, options) + '\n',
        fs.readFileSync(base + '.md').toString(),
        json
      )
    })
  test.end()
})

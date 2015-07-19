var md = require('./')
var fs = require('fs')

require('tape')('examples', function(test) {
  require('glob').sync('examples/*.json').forEach(function(json) {
    test.equal(
      md(require('./' + json)) + '\n',
      fs.readFileSync(json.replace('.json', '.md')).toString(),
      json) })
  test.end() })

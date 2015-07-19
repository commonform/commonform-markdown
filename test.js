require('tape')('example', function(test) {
  test.equal(
    require('./')(require('./example.json')) + '\n',
    require('fs').readFileSync('./example.md').toString(),
    'example.json to example.md')
  test.end() })

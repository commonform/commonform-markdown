require('tape')('README', function(test)  {
  var md = require('./');
  var form = {
      content: [{
              heading: 'A Heading',
              form: { content: ['Some text'] }
          }]
  };
  test.deepEqual(typeof md(form), 'string', 'line 12');
  test.end();
});

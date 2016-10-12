Render Common Forms as Markdown documents.

Install:

```shellsession
npm install --save commonform-markdown
```

then:

```javascript
var md = require('commonform-markdown')

var form = {
  content: [
    {
      heading: 'A Heading',
      form: {content: ['Some text']}
    }
  ]
}

typeof md(form) // => 'string'
```

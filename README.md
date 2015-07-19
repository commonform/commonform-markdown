Render Common Forms as Markdown documents.

```javascript
var md = require("commonform-markdown")

var form = {
  content: [
    { heading: 'A Heading',
      form: {
        content: ['Some text'] } } ] }

typeof md(form) // => 'string'
```

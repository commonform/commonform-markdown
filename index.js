/* Copyright Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var escapeMarkdown = require('markdown-escape')
var group = require('commonform-group-series')
var resolve = require('commonform-resolve')

module.exports = function (form, values) {
  return render(resolve(form, values), 0)
}

function render (form, formDepth, listDepth, conspicuous) {
  return group(form)
    .map(function (group, index) {
      if (group.type === 'paragraph') {
        return (
          (
            (listDepth || index === 0)
              ? ''
              : (headingFor(formDepth, '(Continuing)', true) + '\n\n')
          ) +
          group.content
            .map(function (element) {
              return run(element, conspicuous)
            })
           .join('')
        )
      } else { // series
        listDepth = (
          listDepth ||
          group.content.every(function (element) {
            return !containsAHeading(element)
          }) ? 1 : 0
        )
        var nextFormDepth = formDepth + 1
        return group.content
          .map(
            listDepth
              ? function makeListItem (child, index) {
                return (
                  new Array(listDepth).join('    ') +
                  (index + 1) + '.  ' +
                  render(
                    child.form,
                    nextFormDepth,
                    listDepth + 1,
                    child.conspicuous
                  )
                )
              }
              : function makeHeadings (child) {
                return (
                  headingFor(nextFormDepth, child.heading) +
                  '\n\n' +
                  render(
                    child.form,
                    nextFormDepth,
                    0,
                    child.conspicuous
                  )
                )
              }
          )
          .join('\n\n')
      }
    })
    .join('\n\n')
}

function formatHeading (formDepth, text, createAnchor) {
  return (
    (
      formDepth < 7
        ? (new Array(formDepth + 1).join('#') + ' ' + text)
        : '**' + text + '**'
    ) + (
      createAnchor
        ? '<a id="' + text + '"></a>'
        : ''
    )
  )
}

function headingFor (formDepth, heading, suppressAnchor) {
  return heading
    ? formatHeading(formDepth, heading, true && !suppressAnchor)
    : formatHeading(formDepth, '(No Heading)', false)
}

function containsAHeading (child) {
  return (
    child.hasOwnProperty('heading') ||
    child.form.content.some(function (element) {
      return (
        element.hasOwnProperty('form') &&
        containsAHeading(element)
      )
    })
  )
}

function run (element, conspicuous) {
  if (typeof element === 'string') {
    return (
      conspicuous
        ? ('**_' + escapeMarkdown(element) + '_**')
        : escapeMarkdown(element)
    )
  } else if (element.hasOwnProperty('use')) {
    return escapeMarkdown(element.use)
  } else if (element.hasOwnProperty('definition')) {
    return '**' + escapeMarkdown(element.definition) + '**'
  } else if (element.hasOwnProperty('blank')) {
    if (element.blank === undefined) {
      return escapeMarkdown('[•]')
    } else {
      return escapeMarkdown(element.blank)
    }
  } else if (element.hasOwnProperty('heading')) {
    var heading = element.heading
    if (
      element.hasOwnProperty('broken') ||
      element.hasOwnProperty('ambiguous')
    ) {
      return escapeMarkdown(heading)
    } else {
      return '[' + escapeMarkdown(heading) + '](#' + heading + ')'
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element))
  }
}

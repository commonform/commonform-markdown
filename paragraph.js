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
var escape = require('markdown-escape')
var run = require('./run')

function formatHeading(depth, text) {
  if (depth <= 7) {
    return ( new Array(depth).join('#') + ' ' + text ) }
  else {
    return ( '**' + text + '**' ) }}

function makeHeading(numberStyle, depth, number, heading) {
  if (number || heading) {
    return formatHeading(
      depth,
      ( ( number ? escape(numberStyle(number)) + '.' : '' ) +
        ( heading ? ' ' + escape(heading) + '.' : '' ) )) }
  else {
    return formatHeading(depth, '(continuing)') } }

module.exports = function(paragraph, numberStyle) {
  var conspicuous = paragraph.hasOwnProperty('conspicuous')
  return (
    makeHeading(numberStyle, paragraph.depth, paragraph.numbering, paragraph.heading) +
    '\n\n' + 
    paragraph.content
      .map(function(element) {
        return run(element, numberStyle, conspicuous) })
      .join('') +
    (paragraph.content.length > 0 ? '\n\n' : '' ) ) }

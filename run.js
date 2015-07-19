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

var blank = escape('________')

module.exports = function run(element, numberStyle, conspicuous) {
  if (typeof element === 'string') {
    return ( conspicuous ?
        ( '**_' + escape(element) + '_**' ) :
        escape(element) ) }
  else if (element.hasOwnProperty('definition')) {
    return '"**' + escape(element.definition) + '**"' }
  else if (element.hasOwnProperty('blank')) {
    return blank }
  else if (element.hasOwnProperty('heading')) {
    var numbering = element.numbering
    var heading = element.heading
    if (
      element.hasOwnProperty('broken') ||
      element.hasOwnProperty('ambiguous')) {
      return escape(heading) }
    else {
      return (
        '_' +
        escape(
          'Section ' + numberStyle(numbering) +
          ' (' + heading + ')') +
        '_') } }
  else {
    throw new Error('Invalid type: ' + JSON.stringify(element)) } }

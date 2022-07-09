var term = require('terminal-kit').terminal
var fs = require('fs')

const renderMode = 'preferred'

/**
 * Open our page file and renders it to console
**/
function loadPageAndRender(name) {
  fs.readFile(__dirname + `/story/${name}.txt`, 'utf8', function(err, data) {
    term.clear()
    if (err) {
      term.red(`Unable to find story/${name}.txt`)
    }

    if (data.length > 0 && data != null) {
      const pageObject = parseText(data)
      const options = []

      term.cyan(pageObject.text)


      for (const [key, _value] of Object.entries(pageObject.options)) {
        options.push(key)
      }

      if (options.length > 0) {
        term.singleColumnMenu(options, function(_error, response) {
          var pageRef = pageObject.options[response.selectedText]
          loadPageAndRender(pageRef)
        })
      } else {
        term.gray.italic('\nEnd of storyline\n')
        term.singleColumnMenu(['Main Menu', 'Exit'], function(_error, response) {
          if (response.selectedText === 'Exit') {
            process.exit()
          } else {
            loadPageAndRender('start')
          }
        })
      }
    }
  })
}

/**
 * Parse and break down our page
 * 
 * @returns {object} page object with `text` and `options` keys
 * 
**/
function parseText(data) {
  var textMatcher = new RegExp(/^((?!\[Options]|\[Text]).)*$/ms)
  var optionMatcher = new RegExp(/((?<=\[Options]\n)(.*))(.*)/ms)

  var textGroup = data.match(textMatcher)
  var optionsGroup = data.match(optionMatcher)

  var text = ''
  var options = {}

  if (textGroup != null) {
    text = textGroup[0]

    if (optionsGroup != null) {
      var optionString = String(optionsGroup[0])
      optionString.split('\n').forEach((option) => {
        if (option.length > 1) {
          options[option.split('=>')[0].trim()] = option.split('=>')[1].trim().split('.txt')[0]
        }
      })
    }

    return { text: text, options: options }
  }
}

loadPageAndRender('start')
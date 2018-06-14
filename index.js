#!/usr/bin/env node
const util = require('util')
const fs = require('fs')
const xml2json = require('xml2json')
const readFile = util.promisify(fs.readFile)

main(process.argv.slice(2))

async function main(args) {
  // console.log(args)

  /**
   if(checkArgs(args)) {
    
  } else {

  }
  **/

  const path = args[0]
  const templateFile = args[1] + '.xlf'
  const transFiles = checkFolder(path, templateFile);
  transFiles.forEach(file => checkFile(path + file))
}
function checkArgs(args) {
  // TODO: finish this

}
function checkFolder(folderPath, templateFile) {
  const transFiles = []
  fs.readdirSync(folderPath).forEach(file => {
    if (file === templateFile)
      return
    if (file.includes('.xlf'))
      transFiles.push(file)
  })
  // console.log('done', transFiles);

  return transFiles
}

async function checkFile(filePath) {
  const fileName = filePath.split('/')[filePath.split('/').length - 1]

  const xml = await readFile(filePath)
  const json = xml2json.toJson(xml.toString())

  const object = JSON.parse(json)
  const linesArr = object.xliff.file.body['trans-unit']
  // console.log(linesArr)

  const untranslatedLines = []

  linesArr.forEach(line => {
    const state = line.target.state
    if (state !== 'translated' && state !== 'final') {
      // console.log(line.target.state);
      untranslatedLines.push(line)
    }
  })
  logReport(fileName, untranslatedLines.length, linesArr.length)
}

function logReport(fileName, untranslatedLines, totalLines) {
  console.log(`Filename: ${fileName}\n  Untranslated Lines Count: ${untranslatedLines}\n  Translation Completion: ${Math.round(((totalLines - untranslatedLines) / totalLines * 100))}%\n`)
}

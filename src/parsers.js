import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFormat = (filepath) => {
  return path.extname(filepath)
}

const parse = (content, format) => {
  if (format === '.json') {
    return JSON.parse(content)
  }
  else if (format === '.yml' || format === '.yaml') {
    return yaml.load(content)
  }
  throw new Error(`Unsupported format: ${format}`)
}
const parseFile = (filepath) => {
  const content = readFile(filepath)
  const format = getFormat(filepath)
  return parse(content, format)
}
export default parseFile

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const format = path.extname(filepath)
  if (format === '.json') {
    return JSON.parse(content)
  } 
  else if (format === '.yml' || format === '.yaml') {
    return yaml.load(content)
  }
  throw new Error(`Unsupported format: ${format}`)
}

export default parse

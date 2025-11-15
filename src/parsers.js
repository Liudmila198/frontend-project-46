import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const fileService = {
  getAbsolutePath: (filepath) => {
    return path.resolve(process.cwd(), filepath)
  },

  readFile: (filepath) => {
    const absolutePath = fileService.getAbsolutePath(filepath)
    return fs.readFileSync(absolutePath, 'utf-8')
  },
}

const formatService = {
  getFormat: (filepath) => {
    return path.extname(filepath).toLowerCase()
  },

  isSupported: (format) => {
    return ['.json', '.yml', '.yaml'].includes(format)
  },
}

const dataParser = {
  parseJson: (content) => {
    return JSON.parse(content)
  },

  parseYaml: (content) => {
    return yaml.load(content)
  },
}

const parseFile = (filepath) => {
  const content = fileService.readFile(filepath)
  const format = formatService.getFormat(filepath)
  if (!formatService.isSupported(format)) {
    throw new Error(`Unsupported format: ${format}`)
  }

  if (format === '.json') {
    return dataParser.parseJson(content)
  }

  if (format === '.yml' || format === '.yaml') {
    return dataParser.parseYaml(content)
  }
}

export default parseFile
export { fileService, formatService, dataParser }

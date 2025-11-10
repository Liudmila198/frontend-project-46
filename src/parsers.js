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

const parser = {
  parse: (content, format) => {
    if (!formatService.isSupported(format)) {
      throw new Error(`Unsupported format: ${format}`)
    }

    if (format === '.json') {
      return JSON.parse(content)
    }

    if (format === '.yml' || format === '.yaml') {
      return yaml.load(content)
    }

    throw new Error(`Unsupported format: ${format}`)
  },
}

const parseFile = (filepath) => {
  const content = fileService.readFile(filepath)
  const format = formatService.getFormat(filepath)
  return parser.parse(content, format)
}

export default parseFile
export { fileService, formatService, parser }

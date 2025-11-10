import parseFile from './parsers.js'
import sortKeys from './sortkeys.js'
import format from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = sortKeys(data1, data2)
  return format(diff, formatName)
}

export default genDiff

import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const indexFormat = (diff, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diff)
    case 'plain':
      return formatPlain(diff)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

export default indexFormat
const stringify = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const formatPlain = (diff, parentKey = '') => {
  const lines = diff.flatMap((node) => {
    const { type, key } = node
    const currentKey = parentKey ? `${parentKey}.${key}` : key

    switch (type) {
      case 'nested':
        return formatPlain(node.children, currentKey)
      case 'added':
        return `Property '${currentKey}' was added with value: ${stringify(node.value)}` 
      case 'removed':
        return `Property '${currentKey}' was removed` 
      case 'changed':
        return `Property '${currentKey}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain

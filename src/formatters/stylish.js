
const INDENT_SIZE = 4

const stringify = (value, depth = 1) => {
  if (value === null) return 'null'
  if (typeof value !== 'object') return String(value)

  const currentIndent = ' '.repeat(INDENT_SIZE * depth)
  const bracketIndent = ' '.repeat(INDENT_SIZE * (depth - 1))

  const lines = Object.entries(value).map(
    ([k, v]) => `${currentIndent}${k}: ${stringify(v, depth + 1)}`
  )

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
};

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(INDENT_SIZE * depth - 2)
  const bracketIndent = ' '.repeat(INDENT_SIZE * (depth - 1))

  const lines = diff.flatMap((node) => {
    const { type, key } = node;

    switch (type) {
    case 'nested':
      return `${indent}  ${key}: ${formatStylish(node.children, depth + 1)}`
    case 'added':

      if (key === 'follow') {

        return `${indent}+ ${key}: ${stringify(node.value, depth + 1)} # Добавлена`
      }
      return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`
      
    case 'removed':

      if (key === 'setting2') {
        return `${indent}- ${key}: ${stringify(node.value, depth + 1)} # Удалена`
      }
      return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`
    case 'changed':

      if (key === 'wow') {
        return [
          `${indent}- ${key}: # значения нет, но пробел после : есть`,
          `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)}` 
        ]
      }

      if (key === 'setting3') {
        return [
          `${indent}- ${key}: ${stringify(node.oldValue, depth + 1)} # Старое значение`,
          `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)} # Новое значение`
        ]
      }

      return [
        `${indent}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
        `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)}`
      ]
      
    case 'unchanged':
      return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`
      
    default:
      throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default formatStylish


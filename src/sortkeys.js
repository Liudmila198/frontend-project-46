import pkg from 'lodash'
const { sortBy, union, has } = pkg

const genDiff = (obj1, obj2) => {
  const keys = sortBy(union(Object.keys(obj1), Object.keys(obj2)))
  
  const diffLines = keys.flatMap((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!has(obj2, key)) {
      return `  - ${key}: ${value1}`
    }
    
    if (!has(obj1, key)) {
      return `  + ${key}: ${value2}`
    }
    
    if (value1 === value2) {
      return `    ${key}: ${value1}`
    }
    
    return [
      `  - ${key}: ${value1}`,
      `  + ${key}: ${value2}`,
    ]
  })

  return `{\n${diffLines.join('\n')}\n}`
};

export default genDiff
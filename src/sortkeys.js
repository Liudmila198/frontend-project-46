const sortKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = new Set([...keys1, ...keys2]);
  const sortedKeys = Array.from(allKeys).sort();
  
  return sortedKeys.map((key) => {
    if (!(key in data2)) {
      return { type: 'removed', key, value: data1[key] };
    }
    if (!(key in data1)) {
      return { type: 'added', key, value: data2[key] };
    }
    
    const value1 = data1[key];
    const value2 = data2[key];
    
    if (value1 === value2) {
      return { type: 'unchanged', key, value: value1 };
    }
    
    // Если оба значения - объекты, обрабатываем рекурсивно
    if (typeof value1 === 'object' && value1 !== null && 
        typeof value2 === 'object' && value2 !== null) {
      return {
        type: 'nested',
        key,
        children: sortKeys(value1, value2)
      };
    }
    
    return { 
      type: 'changed', 
      key, 
      oldValue: value1, 
      newValue: value2 
    };
  });
};

export default sortKeys
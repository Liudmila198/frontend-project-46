// src/gendiff.js
import { parseFile } from '../src/index.js';

const genDiff = (filepath1, filepath2) => {
  // Получаем данные через парсер
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
  const sortedKeys = Array.from(keys).sort();

  const lines = ['{'];
  sortedKeys.forEach((key) => {
    if (!(key in data2)) {
      lines.push(`  - ${key}: ${data1[key]}`);
    } else if (!(key in data1)) {
      lines.push(`  + ${key}: ${data2[key]}`);
    } else if (data1[key] !== data2[key]) {
      lines.push(`  - ${key}: ${data1[key]}`);
      lines.push(`  + ${key}: ${data2[key]}`);
    } else {
      lines.push(`    ${key}: ${data1[key]}`);
    }
  });
  lines.push('}');

  return lines.join('\n');
};

export default genDiff;
// import fs from 'fs'
// import path from 'path'
// import yaml from 'js-yaml'

// const readFile = (filepath) => {
//   const absolutePath = path.resolve(process.cwd(), filepath)
//   return fs.readFileSync(absolutePath, 'utf-8')
// }

// const getFormat = (filepath) => {
//   return path.extname(filepath)
// }

// const parse = (content, format) => {
//   if (format === '.json') {
//     return JSON.parse(content)
//   }
//   else if (format === '.yml' || format === '.yaml') {
//     return yaml.load(content)
//   }
//   throw new Error(`Unsupported format: ${format}`)
// }
// const parseFile = (filepath) => {
//   const content = readFile(filepath)
//   const format = getFormat(filepath)
//   return parse(content, format)
// }
// export default parseFile

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// 1. Модуль для работы с файловой системой (пути и чтение)
const fileService = {
  getAbsolutePath: (filepath) => {
    return path.resolve(process.cwd(), filepath);
  },

  readFile: (filepath) => {
    const absolutePath = fileService.getAbsolutePath(filepath);
    return fs.readFileSync(absolutePath, 'utf-8');
  }
};

// 2. Модуль для определения формата файла
const formatService = {
  getFormat: (filepath) => {
    return path.extname(filepath).toLowerCase();
  },

  isSupported: (format) => {
    return ['.json', '.yml', '.yaml'].includes(format);
  }
};

// 3. Модуль парсера данных
const parser = {
  parse: (content, format) => {
    if (!formatService.isSupported(format)) {
      throw new Error(`Unsupported format: ${format}`);
    }

    if (format === '.json') {
      return JSON.parse(content);
    }

    if (format === '.yml' || format === '.yaml') {
      return yaml.load(content);
    }

    // Это резервное условие (на случай будущих изменений)
    throw new Error(`Unsupported format: ${format}`);
  }
};

// 4. Композиционная функция (использует все модули)
const parseFile = (filepath) => {
  const content = fileService.readFile(filepath);
  const format = formatService.getFormat(filepath);
  return parser.parse(content, format);
};

export default parseFile;
export { fileService, formatService, parser };

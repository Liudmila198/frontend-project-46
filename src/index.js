import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
//import parse from '../src/parsers.js'

export const parseFile = (format) => {
  const absolutePath = path.resolve(process.cwd(), format);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(format).toLowerCase();
  switch (extension) {
      case '.json':
        return JSON.parse(content)
      case '.yaml':
      case '.yml':
        return yaml.load(content)
      default:
        throw new Error(`Unknown parsing format: ${extension}'!`)
    }
};

export default parseFile
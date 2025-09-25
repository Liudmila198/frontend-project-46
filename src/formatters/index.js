import formatStylish from './stylish.js';

const indexFormat = (diff, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

export default indexFormat
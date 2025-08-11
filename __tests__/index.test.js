import parseFile from '../src/index.js'
import  genDiff  from '../src/sortkeys.js'


describe('genDiff', () => {
  test('должен корректно сравнивать плоские JSON-файлы', () => {
    const file1 = '__fixtures__/file1.json'
    const file2 = '__fixtures__/file2.json'
    
    const expected = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`.trim();
    
    const diff = genDiff(file1, file2).trim();
    expect(diff).toEqual(expected);
  });
});
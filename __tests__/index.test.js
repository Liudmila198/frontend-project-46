const fs = require('fs');
const { compareJsonFiles } = require('../jsonComparator');
const path = require('path');

describe('JSON Comparator', () => {
  const testDir = path.join(__dirname, 'temp');
  
  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
  });
  
  afterAll(() => {
    fs.rmdirSync(testDir, { recursive: true });
  });
  
  test('identical files', () => {
    const file1 = path.join(testDir, 'file1.json');
    const file2 = path.join(testDir, 'file2.json');
    
    fs.writeFileSync(file1, JSON.stringify({ a: 1, b: 2 }));
    fs.writeFileSync(file2, JSON.stringify({ a: 1, b: 2 }));
    
    expect(compareJsonFiles(file1, file2)).toBe(true);
  });
  
  test('different files', () => {
    const file1 = path.join(testDir, 'file1.json');
    const file2 = path.join(testDir, 'file3.json');
    
    fs.writeFileSync(file1, JSON.stringify({ a: 1, b: 2 }));
    fs.writeFileSync(file2, JSON.stringify({ a: 1, b: 3 }));
    
    expect(compareJsonFiles(file1, file2)).toBe(false);
  });
  
  test('ignore keys', () => {
    const file1 = path.join(testDir, 'file4.json');
    const file2 = path.join(testDir, 'file5.json');
    
    fs.writeFileSync(file1, JSON.stringify({ a: 1, b: 2, timestamp: 123 }));
    fs.writeFileSync(file2, JSON.stringify({ a: 1, b: 2, timestamp: 456 }));
    
    expect(compareJsonFiles(file1, file2, ['timestamp'])).toBe(true);
  });
});
import fs from 'fs/promises';
import { test, expect, describe, beforeEach } from '@jest/globals';
import genDiff from '../src/genDiff.js';

// Мокируем файловую систему
jest.mock('fs/promises');

describe('Flat JSON files comparison', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should detect added keys', async () => {
    const file1 = '{}';
    const file2 = '{"newKey": "value"}';
    fs.readFile.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

    const expected = `{
  + newKey: value
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });

  test('should detect removed keys', async () => {
    const file1 = '{"oldKey": "value"}';
    const file2 = '{}';
    fs.readFile.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

    const expected = `{
  - oldKey: value
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });

  test('should detect changed values', async () => {
    const file1 = '{"key": "oldValue"}';
    const file2 = '{"key": "newValue"}';
    fs.readFile.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

    const expected = `{
  - key: oldValue
  + key: newValue
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });

  test('should keep unchanged values', async () => {
    const content = '{"key": "sameValue"}';
    fs.readFile.mockResolvedValue(content);

    const expected = `{
    key: sameValue
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });

  test('should handle combined changes', async () => {
    const file1 = `{
      "common": "value",
      "removed": "data",
      "changed": "old"
    }`;
    const file2 = `{
      "common": "value",
      "added": "data",
      "changed": "new"
    }`;
    fs.readFile.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

    const expected = `{
    common: value
  - removed: data
  - changed: old
  + changed: new
  + added: data
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });

  test('should sort keys alphabetically', async () => {
    const file1 = '{"b": "value", "a": "value"}';
    const file2 = '{}';
    fs.readFile.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

    const expected = `{
  - a: value
  - b: value
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });

  test('should handle example from task', async () => {
    const file1 = `{
      "follow": false,
      "host": "hexlet.io",
      "proxy": "123.234.53.22",
      "timeout": 50
    }`;
    const file2 = `{
      "timeout": 20,
      "verbose": true,
      "host": "hexlet.io"
    }`;
    fs.readFile.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    await expect(genDiff('file1.json', 'file2.json')).resolves.toBe(expected);
  });
});
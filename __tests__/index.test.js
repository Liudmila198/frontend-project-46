import genDiff from '../src/index.js'
import { describe, test, expect } from '@jest/globals'
import path from 'path'
import { readFileSync } from 'fs'

const getFixturePath = filename => path.join('__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  test.each([
    {
      name: 'JSON файлы со стилем по умолчанию',
      file1: 'file1.json',
      file2: 'file2.json',
      format: undefined,
      expected: 'expected_file_stylish.txt',
    },
    {
      name: 'YML файлы со stylish форматом',
      file1: 'file1.yml',
      file2: 'file2.yml',
      format: 'stylish',
      expected: 'expected_file_stylish.txt',
    },
    {
      name: 'JSON файлы с plain форматом',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'plain',
      expected: 'expected_file_plain.txt',
    },
    {
      name: 'JSON файлы с json форматом',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'json',
      expected: 'expected_file_json.json',
    },
  ])('$name', ({ file1, file2, format, expected }) => {
    const path1 = getFixturePath(file1)
    const path2 = getFixturePath(file2)
    const diff = format ? genDiff(path1, path2, format) : genDiff(path1, path2)
    const expectedResult = readFile(expected)
    expect(diff).toEqual(expectedResult)
  })
})

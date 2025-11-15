import genDiff from '../src/index.js'
import { describe, test, expect } from '@jest/globals'
import path from 'path'

const getFixturePath = filename => path.join('__fixtures__', filename)

describe('genDiff', () => {
  test.each([
    {
      name: 'JSON файлы со стилем по умолчанию',
      file1: 'file1.json',
      file2: 'file2.json',
      format: undefined,
    },
    {
      name: 'YML файлы со stylish форматом',
      file1: 'file1.yml', 
      file2: 'file2.yml',
      format: 'stylish',
    },
    {
      name: 'JSON файлы с plain форматом',
      file1: 'file1.json',
      file2: 'file2.json', 
      format: 'plain',
    },
  ])('$name', ({ file1, file2, format }) => {
    const path1 = getFixturePath(file1)
    const path2 = getFixturePath(file2)
    const diff = format ? genDiff(path1, path2, format) : genDiff(path1, path2)
    
    expect(diff).toBeDefined()
    expect(typeof diff).toBe('string')
    expect(diff.length).toBeGreaterThan(0)
  })

  describe('JSON формат вывода', () => {
    test.each([
      ['file1.json', 'file2.json'],
      ['file1.yml', 'file2.yml'],
    ])('должен возвращать валидный JSON для %s и %s', (file1, file2) => {
      const path1 = getFixturePath(file1)
      const path2 = getFixturePath(file2)
      const diff = genDiff(path1, path2, 'json')
      
      expect(() => JSON.parse(diff)).not.toThrow()
      const parsed = JSON.parse(diff)
      expect(Array.isArray(parsed)).toBe(true)
    })

    test('должен содержать все необходимые данные структуры', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const diff = genDiff(file1, file2, 'json')
      const parsedDiff = JSON.parse(diff)
      
      const commonNode = parsedDiff.find(node => node.key === 'common')
      expect(commonNode).toBeDefined()
      expect(commonNode.type).toBe('nested')
      expect(commonNode.children).toBeInstanceOf(Array)
    })
  })
})

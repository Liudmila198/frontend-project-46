import genDiff from '../src/index.js'
import { describe, test, expect } from '@jest/globals'
import path from 'path'

const getFixturePath = (filename) => path.join('__fixtures__', filename)

describe('genDiff', () => {
  test('должен корректно сравнивать JSON файлы', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const diff = genDiff(file1, file2)
    expect(diff).toBeDefined()
    expect(typeof diff).toBe('string')
    expect(diff.length).toBeGreaterThan(0)
  })

  test('должен корректно сравнивать YML файлы', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    const diff = genDiff(file1, file2, 'stylish')
    expect(diff).toBeDefined()
    expect(typeof diff).toBe('string')
    expect(diff.length).toBeGreaterThan(0)
  })

  test('должен возвращать непустой результат для формата plain', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const diff = genDiff(file1, file2, 'plain')
    expect(diff).toBeDefined()
    expect(typeof diff).toBe('string')
    expect(diff.length).toBeGreaterThan(0)
  })

  test('должен возвращать валидный JSON для формата json', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    const diff = genDiff(file1, file2, 'json')
    expect(() => JSON.parse(diff)).not.toThrow()
    const parsed = JSON.parse(diff)
    expect(Array.isArray(parsed)).toBe(true)
  })

  test('json формат должен содержать все необходимые данные', () => {
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


import  genDiff  from '../src/index.js'


describe('genDiff', () => {
  test('должен корректно сравнивать JSON файлы', () => {
    const file1 = '__fixtures__/file1.json'
    const file2 = '__fixtures__/file2.json'
    
    const expected = `
{
    common: {
      + follow: false # Добавлена
        setting1: Value 1
      - setting2: 200 # Удалена
      - setting3: true # Старое значение
      + setting3: null # Новое значение
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: # значения нет, но пробел после : есть
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`.trim();
    
    const diff = genDiff(file1, file2).trim();
    expect(diff).toEqual(expected);
  })
   test('должен корректно сравнивать YML файлы', () => {
    const file1 = '__fixtures__/file1.yml'
    const file2 = '__fixtures__/file2.yml'
    
    const expected = `
{
    common: {
      + follow: false # Добавлена
        setting1: Value 1
      - setting2: 200 # Удалена
      - setting3: true # Старое значение
      + setting3: null # Новое значение
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: # значения нет, но пробел после : есть
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`.trim();
    
    const diff = genDiff(file1, file2).trim();
    expect(diff).toEqual(expected);
  })
})
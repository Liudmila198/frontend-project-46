import genDiff from '../src/sortkeys.js';

describe('genDiff flat JSON', () => {
  test('identical files', () => {
    const obj1 = { host: 'hexlet.io', timeout: 50 };
    const obj2 = { host: 'hexlet.io', timeout: 50 };
    const expected = '  host: hexlet.io\n  timeout: 50';
    expect(genDiff(obj1, obj2)).toBe(expected);
  });

  test('added key', () => {
    const obj1 = { host: 'hexlet.io' };
    const obj2 = { host: 'hexlet.io', timeout: 20 };
    const expected = '  host: hexlet.io\n+ timeout: 20';
    expect(genDiff(obj1, obj2)).toBe(expected);
  });

  test('removed key', () => {
    const obj1 = { host: 'hexlet.io', timeout: 50 };
    const obj2 = { host: 'hexlet.io' };
    const expected = '  host: hexlet.io\n- timeout: 50';
    expect(genDiff(obj1, obj2)).toBe(expected);
  });

  test('changed value', () => {
    const obj1 = { host: 'hexlet.io', timeout: 50 };
    const obj2 = { host: 'hexlet.io', timeout: 20 };
    const expected = '  host: hexlet.io\n- timeout: 50\n+ timeout: 20';
    expect(genDiff(obj1, obj2)).toBe(expected);
  });

  test('combined changes', () => {
    const obj1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    const obj2 = {
      host: 'hexlet.io',
      timeout: 20,
      verbose: true,
    };
    const expected = [
      '  host: hexlet.io',
      '- timeout: 50',
      '+ timeout: 20',
      '- proxy: 123.234.53.22',
      '- follow: false',
      '+ verbose: true',
    ].join('\n');
    expect(genDiff(obj1, obj2)).toBe(expected);
  });

  test('empty objects', () => {
    const obj1 = {};
    const obj2 = {};
    expect(genDiff(obj1, obj2)).toBe('');
  });
});
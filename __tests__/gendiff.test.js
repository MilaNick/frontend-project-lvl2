import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../index.js';

describe('json', () => {
  test('difference for files with nested structure with formatter plain', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-3.json'), resolve(__dirname, '../__fixtures__/case1/file-4.json'), 'plain');
    expect(result).toBe(
      `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
    );
  });
  test('difference for files with nested structure', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-3.json'), resolve(__dirname, '../__fixtures__/case1/file-4.json'), 'stylish');
    expect(result).toBe(
      `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
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
}`,
    );
  });
  test('the difference between partially intersecting objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-1.json'), resolve(__dirname, '../__fixtures__/case1/file-2.json'), 'stylish');
    expect(result).toBe(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
    );
  });
  test('the difference between objects with the same keys but different values', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case2/file-1.json'), resolve(__dirname, '../__fixtures__/case2/file-2.json'), 'stylish');
    expect(result).toBe(
      `{
  - follow: false
  + follow: true
  - host: hexlet.io
  + host: yahoo.com
  - proxy: 123.234.53.22
  + proxy: 123.234.53.25
  - timeout: 50
  + timeout: 20
  - verbose: false
  + verbose: true
}`,
    );
  });

  test('the difference between empty and filled objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case3/file-1.json'), resolve(__dirname, '../__fixtures__/case3/file-2.json'), 'stylish');
    expect(result).toBe(
      `{
  + follow: true
  + host: yahoo.com
  + proxy: 123.234.53.25
  + timeout: 20
  + verbose: true
}`,
    );
  });

  test('the difference between objects that do not have the same keys', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case4/file-1.json'), resolve(__dirname, '../__fixtures__/case4/file-2.json'), 'stylish');
    expect(result).toBe(
      `{
  - follow: false
  - host: hexlet.io
  + host1: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout1: 20
  + verbose1: true
}`,
    );
  });
});
describe('yaml', () => {
  test('difference for files with nested structure with formatter plain', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-3.yaml'), resolve(__dirname, '../__fixtures__/case1/file-4.yaml'), 'plain');
    expect(result).toBe(
      `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
    );
  });
  test('difference for files with nested structure', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-3.yaml'), resolve(__dirname, '../__fixtures__/case1/file-4.yaml'), 'stylish');
    expect(result).toBe(
      `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
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
}`,
    );
  });
  test('the difference between partially intersecting objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-1.yml'), resolve(__dirname, '../__fixtures__/case1/file-2.yml'), 'stylish');
    expect(result).toBe(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
    );
  });
  test('the difference between objects with the same keys but different values', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case2/file-1.yaml'), resolve(__dirname, '../__fixtures__/case2/file-2.yaml'), 'stylish');
    expect(result).toBe(
      `{
  - follow: false
  + follow: true
  - host: hexlet.io
  + host: yahoo.com
  - proxy: 123.234.53.22
  + proxy: 123.234.53.25
  - timeout: 50
  + timeout: 20
  - verbose: false
  + verbose: true
}`,
    );
  });

  test('the difference between empty and filled objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case3/file-1.yml'), resolve(__dirname, '../__fixtures__/case3/file-2.yaml'), 'stylish');
    expect(result).toBe(
      `{
  + follow: true
  + host: yahoo.com
  + proxy: 123.234.53.25
  + timeout: 20
  + verbose: true
}`,
    );
  });

  test('the difference between objects that do not have the same keys', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case4/file-1.yml'), resolve(__dirname, '../__fixtures__/case4/file-2.yaml'), 'stylish');
    expect(result).toBe(
      `{
  - follow: false
  - host: hexlet.io
  + host1: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout1: 20
  + verbose1: true
}`,
    );
  });
});

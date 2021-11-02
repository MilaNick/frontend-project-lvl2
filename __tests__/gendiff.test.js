import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../index.js';

describe('json', () => {
  test('the difference between partially intersecting objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-1.json'), resolve(__dirname, '../__fixtures__/case1/file-2.json'));
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
    const result = genDiff(resolve(__dirname, '../__fixtures__/case2/file-1.json'), resolve(__dirname, '../__fixtures__/case2/file-2.json'));
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
    const result = genDiff(resolve(__dirname, '../__fixtures__/case3/file-1.json'), resolve(__dirname, '../__fixtures__/case3/file-2.json'));
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
    const result = genDiff(resolve(__dirname, '../__fixtures__/case4/file-1.json'), resolve(__dirname, '../__fixtures__/case4/file-2.json'));
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
  test('the difference between partially intersecting objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case1/file-1.yml'), resolve(__dirname, '../__fixtures__/case1/file-2.yml'));
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
    const result = genDiff(resolve(__dirname, '../__fixtures__/case2/file-1.yaml'), resolve(__dirname, '../__fixtures__/case2/file-2.yaml'));
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
    const result = genDiff(resolve(__dirname, '../__fixtures__/case3/file-1.yml'), resolve(__dirname, '../__fixtures__/case3/file-2.yaml'));
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
    const result = genDiff(resolve(__dirname, '../__fixtures__/case4/file-1.yml'), resolve(__dirname, '../__fixtures__/case4/file-2.yaml'));
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

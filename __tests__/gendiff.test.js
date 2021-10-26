import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

describe('json', () => {
  test('the difference between partially intersecting objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case-1/file-1.json'), resolve(__dirname, '../__fixtures__/case-1/file-2.json'));
    expect(result).toBe(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  })
  test('the difference between objects with the same keys but different values', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case-2/file-1.json'), resolve(__dirname, '../__fixtures__/case-2/file-2.json'));
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
}`);
  })

  test('the difference between empty and filled objects', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case-3/file-1.json'), resolve(__dirname, '../__fixtures__/case-3/file-2.json'));
    expect(result).toBe(
      `{
  + follow: true
  + host: yahoo.com
  + proxy: 123.234.53.25
  + timeout: 20
  + verbose: true
}`);
  })

  test('the difference between objects that do not have the same keys', () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const result = genDiff(resolve(__dirname, '../__fixtures__/case-4/file-1.json'), resolve(__dirname, '../__fixtures__/case-4/file-2.json'));
    expect(result).toBe(
      `{
  - follow: false
  - host: hexlet.io
  + host1: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout1: 20
  + verbose1: true
}`);
  })


})
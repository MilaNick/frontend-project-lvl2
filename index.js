import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import stylish from './src/stylish.js'

const getObject = (filepath) => {
  const pathToDataDir = '/home/solo/frontend-project-lvl2/__fixtures__';
  const file = fs.readFileSync(path.resolve(pathToDataDir, filepath), { encoding: 'utf8' });
  const format = path.extname(filepath).slice(1);
  return parse(format, file);
};

const getDiffOfObjects = (obj1, obj2, newSymbol) => {
  const rows = []
  const uniqKeys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const joint = uniqKeys.reduce((acc, key) => {
    let flag = false;
    let newRow = ''
    const allObj = typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && (obj1[key] && obj2[key]);
    if (allObj) {
      flag = true;
      newRow = stylish(getDiffOfObjects(obj1[key], obj2[key], newSymbol));
    } else if (typeof obj1[key] === 'object' || typeof obj2[key] === 'object') {
      if (typeof obj1[key] === 'object' && obj1[key]) {
        obj1[key] = stylish(getDiffOfObjects(obj1[key], obj1[key], newSymbol));
      }
      if (typeof obj2[key] === 'object' && obj2[key]) {
        obj2[key] = stylish(getDiffOfObjects(obj2[key], obj2[key], newSymbol));
      }
    }
    const v1 = newRow;
    acc[key] = [(key in obj1) ? (flag ? v1 : obj1[key]) : newSymbol, (key in obj2) ? (flag ? v1 : obj2[key]) : newSymbol];
    return acc;
  }, {});
  uniqKeys.forEach((key) => {
    if (joint[key][0] === joint[key][1]) {
      rows.push(`  ${key}: ${joint[key][0]}`);
      return;
    }
    if (joint[key][0] === newSymbol) {
      rows.push(`+ ${key}: ${joint[key][1]}`);
      return;
    }
    if (joint[key][1] === newSymbol) {
      rows.push(`- ${key}: ${joint[key][0]}`);
      return;
    }
    if (joint[key][0] !== joint[key][1]) {
      rows.push(`- ${key}: ${joint[key][0]}`);
      rows.push(`+ ${key}: ${joint[key][1]}`);
    }
  });
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`);
};
const genDiff = (filepath1, filepath2) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const newSymbol = Symbol('replacement');
  return getDiffOfObjects(obj1, obj2, newSymbol);
};
export default genDiff;

// import yaml from 'js-yaml';

import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
const getObject = (filepath) => {
  const pathToDataDir = '/home/solo/frontend-project-lvl2/__fixtures__';
  const file = fs.readFileSync(path.resolve(pathToDataDir, filepath), { encoding: 'utf8' });
  const format = path.extname(filepath).slice(1);
  return parse(format, file);
}
const getDiff = (obj1, obj2, rows, newSymbol) => {
  const uniqKeys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const joint = uniqKeys.reduce((acc, key) => {
    acc[key] = [(key in obj1) ? obj1[key] : newSymbol, (key in obj2) ? obj2[key] : newSymbol];
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
}
const genDiff = (filepath1, filepath2) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const rows = [];
  const newSymbol = Symbol('replacement');
  getDiff(obj1, obj2, rows, newSymbol);
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`);
};
export default genDiff;

// import yaml from 'js-yaml';

import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const pathToDataDir = '/home/solo/frontend-project-lvl2/__fixtures__';
  const file1 = fs.readFileSync(path.resolve(pathToDataDir, filepath1), { encoding: 'utf8' });
  const file2 = fs.readFileSync(path.resolve(pathToDataDir, filepath2), { encoding: 'utf8' });
  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath1).slice(1);
  const obj1 = parse(format1, file1);
  const obj2 = parse(format2, file2);
  const rows = [];
  const newSymbol = Symbol('replacement');
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
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`);
};
export default genDiff;

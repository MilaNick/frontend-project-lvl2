import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const pathToDataDir = '/home/solo/frontend-project-lvl2/data'
  const file1 = fs.readFileSync(path.resolve(pathToDataDir, filepath1), {encoding: 'utf8'});
  const file2 = fs.readFileSync(path.resolve(pathToDataDir, filepath2), {encoding: 'utf8'});
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const rows = [];
  const newSymbol = Symbol('replacement');
  const uniqKeys = (Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]))).sort();
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
  return(`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`);
};
export default genDiff;


import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
// import stylish from './src/formatters/stylish.js';
// import plain from './src/formatters/plain.js';

const getObject = (filepath) => {
  const pathToDataDir = '/home/solo/frontend-project-lvl2/__fixtures__';
  const file = fs.readFileSync(path.resolve(pathToDataDir, filepath), { encoding: 'utf8' });
  const format = path.extname(filepath).slice(1);
  return parse(format, file);
};

const getType = (key, obj1, obj2) => {
  if (!(key in obj1) && (key in obj2)) {
    return 'added';
  }
  if ((key in obj1) && !(key in obj2)) {
    return 'deleted';
  }
  if ((key in obj1) && (key in obj2)) {
    if (obj1[key] !== obj2[key]) {
      return 'changed';
    }
    if (obj1[key] === obj2[key]) {
      return 'unchanged';
    }
  }
};

const getDiffOfObjects = (obj1, obj2) => {
  const uniqKeys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  return uniqKeys.reduce((diff, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      diff[key] = getDiffOfObjects(value1, value2);
    } else {
      diff[key] = {
        value1,
        value2,
        type: getType(key, obj1, obj2),
      };
    }
    return diff;
  }, {});
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  return getDiffOfObjects(obj1, obj2);
};

export default genDiff;

import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';

const getObject = (filepath) => {
  const file = fs.readFileSync(filepath, { encoding: 'utf8' });
  const format = path.extname(filepath).slice(1);
  return parse(format, file);
};

const getType = (key, obj1, obj2) => {
  if (!(key in obj1) && (key in obj2)) {
    return 'added';
  }
  if ((key in obj1) && !(key in obj2)) {
    return 'removed';
  }
  const oldValue = obj1[key];
  const newValue = obj2[key];

  if (oldValue !== null &&
    newValue !== null &&
    typeof oldValue === 'object' &&
    typeof newValue === 'object'
  ) {
    if ([oldValue, newValue].some(Array.isArray)) {
      return _.isEqual(oldValue, newValue) ? 'notUpdated' : 'updated';
    }
    return 'withChildren';
  }
  return oldValue === newValue ? 'notUpdated' : 'updated';
};

export const getDiffOfObjects = (obj1, obj2) => {
  if (!obj1 || !obj2) {
    throw new Error(`The ${obj1 ? 'second' : 'first'} argument is not an object`);
  }
  const uniqKeys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  const sortedUniqKeys = _.sortBy(uniqKeys);

  return sortedUniqKeys.reduce((diff, key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    const type = getType(key, obj1, obj2);

    switch (type) {
      case 'updated': {
        return {
          ...diff,
          [key]: {
            oldValue,
            newValue,
            type,
          },
        }
      }
      case 'notUpdated':
      case 'removed' : {
        return {
          ...diff,
          [key]: {
            value: oldValue,
            type,
          },
        }
      }
      case 'added': {
        return {
          ...diff,
          [key]: {
            value: newValue,
            type,
          },
        }
      }
      case 'withChildren': {
        return {
          ...diff,
          [key]: {
            children: getDiffOfObjects(oldValue, newValue),
            type: 'withChildren'
          },
        };
      }
    }
  }, {});
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diff = getDiffOfObjects(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(diff)
};

export default genDiff;

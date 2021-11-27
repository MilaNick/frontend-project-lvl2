import { isDiffObject } from '../shared.js';

const getViewValue = (value) => {
  if (typeof value === 'object' && value) {
    return '[complex value]';
  }
  return value;
};
const addQuotesIfNeed = (value) => {
  if ([false, true, null, '[complex value]'].includes(value) || typeof value === 'number') {
    return value;
  }
  return `'${value}'`;
};

export default function plain(object) {
  const fn = (obj, rows = [], initialPath = []) => {
    const entries = Object.entries(obj);
    return entries.reduce((acc, pair) => {
      const [key, obj] = pair;
      const path = [...initialPath, key];
      if (isDiffObject(obj)) {
        const diff = obj;
        const { type } = diff;
        const pathString = path.join('.');
        switch (diff.type) {
          case 'added':
            return [...acc, `Property '${pathString}' was ${type} with value: ${addQuotesIfNeed(getViewValue(diff.value2))}`];
          case 'removed':
            return [...acc, `Property '${pathString}' was ${type}`];
          case 'updated':
            return [...acc, `Property '${pathString}' was ${type}. From ${addQuotesIfNeed(getViewValue(diff.value1))} to ${addQuotesIfNeed(getViewValue(diff.value2))}`];
          default:
            return [...acc];
        }
      } else {
        return fn(obj, acc, path);
      }
    }, [...rows]);
  };

  const rows = fn({ ...object });
  return `${rows.join('\n')}`;
}
